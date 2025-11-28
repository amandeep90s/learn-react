import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import About from "../pages/About";

// Mock react-router-dom hooks
const mockNavigate = jest.fn();
const mockSetSearchParams = jest.fn();
const defaultSearchParams = new URLSearchParams("tab=team&section=leadership");
const mockUseSearchParams = jest.fn(() => [
  defaultSearchParams,
  mockSetSearchParams,
]);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useSearchParams: () => mockUseSearchParams(),
}));

describe("About Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders about page", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    expect(screen.getByText("About Page")).toBeInTheDocument();
    expect(screen.getByText(/useSearchParams/)).toBeInTheDocument();
  });

  test("displays current search parameters", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    expect(screen.getByText("Current Search Parameters:")).toBeInTheDocument();
    expect(screen.getAllByText(/Tab:/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Section:/).length).toBeGreaterThan(0);
    expect(screen.getByText("team")).toBeInTheDocument();
    expect(screen.getByText("leadership")).toBeInTheDocument();
  });

  test("changes tab when tab button is clicked", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    const overviewButton = screen.getByText("Overview");
    fireEvent.click(overviewButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      tab: "overview",
      section: "leadership",
    });
  });

  test("changes section when section button is clicked", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    const mainButton = screen.getByText("Main");
    fireEvent.click(mainButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      tab: "team",
      section: "main",
    });
  });

  test("clears all params when clear button is clicked", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    const clearButton = screen.getByText("Clear All Params");
    fireEvent.click(clearButton);

    expect(mockNavigate).toHaveBeenCalledWith("/about");
  });

  test("renders all tab buttons", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("renders all section buttons", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    expect(screen.getByText("Main")).toBeInTheDocument();
    expect(screen.getByText("Leadership")).toBeInTheDocument();
    expect(screen.getByText("History")).toBeInTheDocument();
  });

  test("uses default values when no search params present", () => {
    const emptySearchParams = new URLSearchParams("");
    mockUseSearchParams.mockReturnValue([
      emptySearchParams,
      mockSetSearchParams,
    ]);

    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    // Should show default values
    expect(screen.getByText("overview")).toBeInTheDocument();
    expect(screen.getByText("main")).toBeInTheDocument();
  });
});
