import React from "react";

type LoaderProps = {
  label?: string;
};

const messages = [
  "⚙️ Engines revving up...",
  "🔧 Tuning models just for you...",
  "🚗 Rolling out the best machines...",
  "📊 Assembling vehicle data...",
  "🔍 Fetching powerful machines for you... hang tight!",
  "🚘 Just a moment, gathering models...",
];

export default function Loader({ label }: LoaderProps) {
  const fallbackLabel =
    messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="flex items-center gap-3 text-blue-600 animate-pulse mt-4">
      <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm sm:text-base font-medium">
        {label || fallbackLabel}
      </p>
    </div>
  );
}
