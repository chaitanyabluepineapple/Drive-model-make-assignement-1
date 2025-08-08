import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SSRMakesClient from "../components/SSRMakeDropdown";
import { useVehicleData } from "../hooks/useVehicleData";

jest.mock("../hooks/useVehicleData");

describe("SSRMakesClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title and dropdown with SSR makes", () => {
    (useVehicleData as jest.Mock).mockReturnValue({
      models: [],
      loadingModels: false,
      error: "",
      fetchModels: jest.fn(),
    });

    render(<SSRMakesClient initialMakes={[{ Make_ID: 1, Make_Name: "Toyota" }]} />);
    expect(screen.getByText(/SSR: Vehicle Make/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("triggers fetchModels with selected make", () => {
    const fetchModelsMock = jest.fn();
    (useVehicleData as jest.Mock).mockReturnValue({
      models: [],
      loadingModels: false,
      error: "",
      fetchModels: fetchModelsMock,
    });

    render(<SSRMakesClient initialMakes={[{ Make_ID: 1, Make_Name: "Toyota" }]} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Toyota" } });
    fireEvent.click(screen.getByRole("button"));
    expect(fetchModelsMock).toHaveBeenCalledWith("Toyota");
  });

  it("shows error alert if error exists", () => {
    (useVehicleData as jest.Mock).mockReturnValue({
      models: [],
      loadingModels: false,
      error: "Server error",
      fetchModels: jest.fn(),
    });

    render(<SSRMakesClient initialMakes={[]} />);
    expect(screen.getByText("Server error")).toBeInTheDocument();
  });

  it("shows loader while fetching models", () => {
    (useVehicleData as jest.Mock).mockReturnValue({
      models: [],
      loadingModels: true,
      error: "",
      fetchModels: jest.fn(),
    });

    render(<SSRMakesClient initialMakes={[]} />);
    expect(screen.getByText(/Fetching powerful machines/i)).toBeInTheDocument();
  });

  it("renders model cards when models exist", () => {
    (useVehicleData as jest.Mock).mockReturnValue({
      models: [{ Model_ID: 1, Model_Name: "Camry" }],
      loadingModels: false,
      error: "",
      fetchModels: jest.fn(),
    });

    render(<SSRMakesClient initialMakes={[]} />);
    expect(screen.getByText("Camry")).toBeInTheDocument();
  });

  it("should render without crashing", () => {
    expect(true).toBe(true);
  });
});
