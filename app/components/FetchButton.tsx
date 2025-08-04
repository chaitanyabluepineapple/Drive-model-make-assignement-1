"use client";
import React from "react";

type FetchButtonProps = {
    onClick: () => void;
    disabled: boolean;
    loading?: boolean;
};

export default function FetchButton({ onClick, disabled, loading }: FetchButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className="inline-flex items-center justify-center px-5 py-2.5 font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-all duration-200"
        >
            {loading ? (
                <>
                    <span className="loader inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Loading...</span>
                </>
            ) : (
                "Fetch Models"
            )}
        </button>
    );
}
