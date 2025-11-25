import { useEffect, useState } from "react";
import type { TravelPackage } from "../types/packages";

let cachedPackages: TravelPackage[] | null = null;
let cachedError: string | null = null;
let inflightRequest: Promise<TravelPackage[]> | null = null;

const fetchPackages = async (): Promise<TravelPackage[]> => {
  const response = await fetch("/data/packages.json", { cache: "no-cache" });
  if (!response.ok) {
    throw new Error("Unable to load packages");
  }
  return response.json();
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

