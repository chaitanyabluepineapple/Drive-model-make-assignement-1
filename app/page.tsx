"use client";
import { useEffect, useRef, useState } from "react";
import { useVehicleData } from "./hooks/useVehicleData";
import MakeDropdown from "./components/MakeDropdown";
import FetchButton from "./components/FetchButton";
import ModelCards from "./components/ModelCards";
import Loader from "./components/Loader";
import ErrorAlert from "./components/ErrorAlert";

export default function HomePage() {
  const {
    makes,
    models,
    loadingMakes,
    loadingModels,
    error,
    fetchModels,
  } = useVehicleData();

  const [selectedMake, setSelectedMake] = useState("");

  const selectedMakeRef = useRef(selectedMake);

  const handleMakeChange = (make: string) => {
    selectedMakeRef.current = make;
    setSelectedMake(make);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10 space-y-6">
        <h1 className="text-3xl font-bold text-blue-700">Vehicle Make & Model Viewer</h1>

        {error && <ErrorAlert message={error} />}

        {loadingMakes ? (
          <Loader label="Loading your dream vehicles…" />
        ) : (
          <>
            <MakeDropdown
              makes={makes}
              selectedMake={selectedMake}
              onChange={handleMakeChange}
            />
            <FetchButton
              onClick={() =>
                fetchModels(selectedMakeRef.current)
              }
              disabled={!selectedMake}
              loading={loadingModels}
            />
          </>
        )}

        {loadingModels && <Loader label="🔍 Fetching powerful machines for you... hang tight!" />}
        {!loadingModels && models.length > 0 && <ModelCards models={models} />}
      </div>
    </main>
  );
}
