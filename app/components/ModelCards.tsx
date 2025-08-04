"use client";
import React from "react";

type ModelCardsProps = {
  models: { Model_ID: number; Model_Name: string }[];
};

export default function ModelCards({ models }: ModelCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {models.map((model) => (
        <div
          key={model.Model_ID}
          className="rounded-xl bg-gradient-to-br from-blue-50 to-white p-5 shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-800">{model.Model_Name}</h3>
        </div>
      ))}
    </div>
  );
}
