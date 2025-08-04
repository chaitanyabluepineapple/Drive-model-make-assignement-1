// useVehicleData.ts
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "./makeFetcher";

export const useVehicleData = () => {
    // Using SWR here to handles fetching and caching for vehicle makes
    const { data, error: makesError, isLoading: loadingMakes } = useSWR(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json",
        fetcher,
        { revalidateOnFocus: false }
    );

    const makes = data?.Results || [];

    const [models, setModels] = useState([]);
    const [loadingModels, setLoadingModels] = useState(false);
    const [modelsError, setModelsError] = useState("");

    const fetchModels = async (makeName: string) => {
        setLoadingModels(true);
        setModelsError("");
        try {
            const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${makeName}?format=json`);
            const data = await res.json();
            setModels(data.Results);
        } catch {
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
