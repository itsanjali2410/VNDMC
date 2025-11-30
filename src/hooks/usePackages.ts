import { useEffect, useState } from "react";
import type { TravelPackage } from "../types/packages";

let cachedPackages: TravelPackage[] | null = null;
let cachedError: string | null = null;
let inflightRequest: Promise<TravelPackage[]> | null = null;

const fetchPackageFile = async (packageId: string): Promise<TravelPackage> => {
  // Try encoded version first (for spaces and special characters)
  const encodedId = encodeURIComponent(packageId);
  const url = `/data/${encodedId}/package.json`;
  
  let response: Response;
  try {
    response = await fetch(url, { cache: "no-cache" });
  } catch (fetchError) {
    throw new Error(`Network error loading package ${packageId}: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`);
  }
  
  // Check if we got HTML (404 page) instead of JSON
  const contentType = response.headers.get("content-type") || '';
  const isHTML = contentType.includes("text/html");
  
  if (!response.ok || isHTML) {
    let errorText = '';
    try {
      errorText = await response.text();
    } catch {
      errorText = 'Could not read error response';
    }
    
    if (errorText.trim().startsWith('<!') || isHTML) {
      throw new Error(`Package not found: ${packageId}. The server returned an HTML page (likely 404). URL tried: ${url}. Please check that the folder name matches exactly.`);
    }
    
    throw new Error(`Unable to load package: ${packageId} (Status: ${response.status}). Error: ${errorText.substring(0, 100)}`);
  }
  
  if (!contentType.includes("application/json") && !contentType.includes("text/json")) {
    const text = await response.text();
    throw new Error(`Expected JSON but got ${contentType}. Response preview: ${text.substring(0, 200)}`);
  }
  
  try {
    return await response.json();
  } catch (jsonError) {
    const text = await response.text();
    throw new Error(`Invalid JSON in package ${packageId}. Parse error: ${jsonError instanceof Error ? jsonError.message : String(jsonError)}. Content preview: ${text.substring(0, 200)}`);
  }
};

const fetchPackages = async (): Promise<TravelPackage[]> => {
  const response = await fetch("/data/packages.json", { cache: "no-cache" });
  if (!response.ok) {
    throw new Error("Unable to load packages");
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text();
    throw new Error(`Expected JSON but got ${contentType}. Response: ${text.substring(0, 200)}`);
  }

  const payload = await response.json();

  if (Array.isArray(payload)) {
    if (payload.length === 0) return [];

    const firstItem = payload[0];

    if (typeof firstItem === "string") {
      // Fetch packages one by one with error handling
      const packageData: TravelPackage[] = [];
      const errors: string[] = [];
      
      for (const id of payload) {
        try {
          const pkg = await fetchPackageFile(id);
          packageData.push(pkg);
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : String(error);
          console.error(`Failed to load package ${id}:`, errorMsg);
          errors.push(`${id}: ${errorMsg}`);
          // Continue loading other packages even if one fails
        }
      }
      
      if (packageData.length === 0 && errors.length > 0) {
        throw new Error(`Failed to load any packages. Errors: ${errors.join('; ')}`);
      }
      
      if (errors.length > 0) {
        console.warn(`Some packages failed to load:`, errors);
      }
      
      return packageData;
    }

    if (typeof firstItem === "object" && firstItem !== null) {
      return payload as TravelPackage[];
    }
  }

  throw new Error("Invalid packages data structure");
};

export const usePackages = () => {
  const [packages, setPackages] = useState<TravelPackage[]>(cachedPackages ?? []);
  const [loading, setLoading] = useState(!cachedPackages && !cachedError);
  const [error, setError] = useState<string | null>(cachedError);

  useEffect(() => {
    if (cachedPackages) {
      setPackages(cachedPackages);
      setLoading(false);
      return;
    }
    if (cachedError) {
      setError(cachedError);
      setLoading(false);
      return;
    }
    if (!inflightRequest) {
      inflightRequest = fetchPackages();
    }

    inflightRequest
      .then(data => {
        cachedPackages = data;
        setPackages(data);
        setError(null);
      })
      .catch(err => {
        const message = err instanceof Error ? err.message : "Failed to load packages";
        cachedError = message;
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { packages, loading, error };
};

