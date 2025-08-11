"use client";
import React from "react";

type MakeDropdownProps = {
  makes: { Make_ID: number; Make_Name: string }[];
  selectedMake: string;
  onChange: (value: string) => void;
};

export default function MakeDropdown({ makes, selectedMake, onChange }: MakeDropdownProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">Select Vehicle Make</label>
      <select
        className="w-full p-2.5 rounded-lg border border-gray-300 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={selectedMake}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Choose Make --</option>
        {makes.map((make) => (
          <option key={make.Make_ID} value={make.Make_Name}>
            {make.Make_Name}
          </option>
        ))}
      </select>
    </div>
  );
}
