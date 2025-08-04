"use client";
import React from "react";
import { AlertCircle } from "lucide-react";

type ErrorAlertProps = {
  message: string;
};

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800 shadow-sm">
      <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
      <span>{message}</span>
    </div>
  );
}
