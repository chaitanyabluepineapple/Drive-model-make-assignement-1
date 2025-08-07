"use client";

import { useState, useRef } from "react";
import MakeDropdown from "./MakeDropdown";
import FetchButton from "./FetchButton";
import ModelCards from "./ModelCards";
import Loader from "./Loader";
import ErrorAlert from "./ErrorAlert";
import { useVehicleData } from "../hooks/useVehicleData"; // Custom hook for fetching models

type Props = {
  initialMakes: { Make_ID: number; Make_Name: string }[];
};

export default function SSRMakesClient({ initialMakes }: Props) {
  const [selectedMake, setSelectedMake] = useState("");
  const selectedMakeRef = useRef("");
  const {
    models,
    loadingModels,
    error,
    fetchModels
  } = useVehicleData(initialMakes);

  const handleMakeChange = (make: string) => {
    selectedMakeRef.current = make;
    setSelectedMake(make);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 p-2 sm:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10 space-y-6">
        <h1 className="text-3xl font-bold text-blue-700">SSR: Vehicle Make & Model Viewer</h1>

        {error && <ErrorAlert message={error} />}

        <MakeDropdown
          makes={initialMakes}
          selectedMake={selectedMake}
          onChange={handleMakeChange}
        />

        <FetchButton
          onClick={() => fetchModels(selectedMakeRef.current)}
          disabled={!selectedMake}
          loading={loadingModels}
        />

        {loadingModels && (
          <Loader label="🔍 Fetching powerful machines for you... hang tight!" />
        )}

        {!loadingModels && models.length > 0 && <ModelCards models={models} />}
      </div>
    </main>
  );
}
