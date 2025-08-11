// useVehicleData.ts
import { useState } from "react";
import useSWR from "swr";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Make = {
    Make_ID: number;
    Make_Name: string;
};

export const useVehicleData = (initialMakes?: Make[]) => {
    const shouldFetch = typeof window !== "undefined" && (!initialMakes || initialMakes.length === 0);

    // Using SWR here to handles fetching and caching for vehicle makes
    const { data, error: makesError, isLoading: loadingMakes } = useSWR(
        shouldFetch ? "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json" : null,
        fetcher,
        { fallbackData: initialMakes ? { Results: initialMakes } : undefined, revalidateOnFocus: false }
    );

    const makes = data?.Results || [];

    const [models, setModels] = useState([]);
    const [loadingModels, setLoadingModels] = useState(false);
    const [modelsError, setModelsError] = useState("");

    const fetchModels = async (makeName: string) => {
        setLoadingModels(true);
        setModelsError("");
        setModels([]);

        try {
            const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${makeName}?format=json`);

            if (res.status === 404) {
                setModelsError("The resource you are looking for has been removed, had its name changed, or is temporarily unavailable.");
                return;
            }

            const data = await res.json();
            setModels(data?.Results);
        } catch {
            setModels([]);
            setModelsError("Failed to fetch vehicle models.");
        } finally {
            setLoadingModels(false);
        }
    };

    return {
        makes,
        models,
        loadingMakes,
        loadingModels,
        error: makesError?.message || modelsError,
        fetchModels,
    };

};
