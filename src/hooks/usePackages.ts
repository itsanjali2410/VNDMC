import { useEffect, useState } from "react";
import type { TravelPackage } from "../types/packages";

let cachedPackages: TravelPackage[] | null = null;
let cachedError: string | null = null;
let inflightRequest: Promise<TravelPackage[]> | null = null;

const fetchPackageFile = async (packageId: string): Promise<TravelPackage> => {
  const response = await fetch(`/data/${packageId}/package.json`, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Unable to load package: ${packageId}`);
  }
  return response.json();
};

const fetchPackages = async (): Promise<TravelPackage[]> => {
  const response = await fetch("/data/packages.json", { cache: "no-cache" });
  if (!response.ok) {
    throw new Error("Unable to load packages");
  }

  const payload = await response.json();

  if (Array.isArray(payload)) {
    if (payload.length === 0) return [];

    const firstItem = payload[0];

    if (typeof firstItem === "string") {
      const packageData = await Promise.all(payload.map(id => fetchPackageFile(id)));
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

