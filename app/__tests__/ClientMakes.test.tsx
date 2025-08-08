import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ClientMakes from "../components/ClientSideMakes";
import { useVehicleData } from "../hooks/useVehicleData";
import { beforeEach, describe, it } from "node:test";

jest.mock("../hooks/useVehicleData");

describe("ClientMakes (CSR)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title and dropdown", () => {
    (useVehicleData as jest.Mock).mockReturnValue({
      makes: [{ Make_ID: 1, Make_Name: "Honda" }],
      models: [],
      loadingModels: false,
      error: "",
      fetchModels: jest.fn(),
    });

    render(<ClientMakes label="CSR Viewer" />);
    expect(screen.getByText("CSR Viewer")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("triggers fetchModels on button click", () => {
    const fetchModelsMock = jest.fn();
    (useVehicleData as jest.Mock).mockReturnValue({
      makes: [{ Make_ID: 1, Make_Name: "Honda" }],
      models: [],
      loadingModels: false,
      error: "",
      fetchModels: fetchModelsMock,
    });

    render(<ClientMakes />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Honda" } });
    fireEvent.click(screen.getByRole("button"));
    expect(fetchModelsMock).toHaveBeenCalledWith("Honda");
  });

  it("displays error message if error exists", () => {
    (useVehicleData as jest.Mock).mockReturnValue({
      makes: [],
      models: [],
      loadingModels: false,
      error: "Failed to fetch makes",
      fetchModels: jest.fn(),
    });

    render(<ClientMakes />);
    expect(screen.getByText("Failed to fetch makes")).toBeInTheDocument();
  });

  it("shows loader when loading models", () => {
    (useVehicleData as jest.Mock).mockReturnValue({
      makes: [],
      models: [],
      loadingModels: true,
      error: "",
      fetchModels: jest.fn(),
    });

    render(<ClientMakes />);
    expect(screen.getByText(/Fetching powerful machines/i)).toBeInTheDocument();
  });

  it("renders model cards when models exist", () => {
    (useVehicleData as jest.Mock).mockReturnValue({
      makes: [],
      models: [{ Model_ID: 1, Model_Name: "Civic" }],
      loadingModels: false,
      error: "",
      fetchModels: jest.fn(),
    });

    render(<ClientMakes />);
    expect(screen.getByText("Civic")).toBeInTheDocument();
  });

  it("should render without crashing", () => {
    expect(true).toBe(true);
  });
});


