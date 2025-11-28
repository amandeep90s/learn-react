import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DashboardStats from "../pages/DashboardStats";

// Mock react-router-dom hooks
const defaultOutletContext = {
  user: "Admin User",
  permissions: ["read", "write", "delete"],
  theme: "dark",
};
const mockUseOutletContext = jest.fn(() => defaultOutletContext);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: () => mockUseOutletContext(),
}));

describe("DashboardStats Component", () => {
  test("renders dashboard stats page", () => {
    render(
      <BrowserRouter>
        <DashboardStats />
      </BrowserRouter>
    );

    expect(screen.getByText("Dashboard Stats")).toBeInTheDocument();
  });

  test("displays context from parent component", () => {
    render(
      <BrowserRouter>
        <DashboardStats />
      </BrowserRouter>
    );

    expect(screen.getByText("Admin User")).toBeInTheDocument();
    expect(screen.getByText("read, write, delete")).toBeInTheDocument();
    expect(screen.getByText("dark")).toBeInTheDocument();
  });

  test("displays mock statistics", () => {
    render(
      <BrowserRouter>
        <DashboardStats />
      </BrowserRouter>
    );

    expect(screen.getByText(/Total Users:/)).toBeInTheDocument();
    expect(screen.getByText(/1,234/)).toBeInTheDocument();
    expect(screen.getByText(/Active Sessions:/)).toBeInTheDocument();
    expect(screen.getByText(/567/)).toBeInTheDocument();
    expect(screen.getByText(/Revenue:/)).toBeInTheDocument();
    expect(screen.getByText(/\$12,345/)).toBeInTheDocument();
  });

  test("renders context information section", () => {
    render(
      <BrowserRouter>
        <DashboardStats />
      </BrowserRouter>
    );

    expect(screen.getByText("Context from Parent:")).toBeInTheDocument();
  });

  test("works with different context values", () => {
    const customContext = {
      user: "Test User",
      permissions: ["read"],
      theme: "light",
    };

    mockUseOutletContext.mockReturnValue(customContext);

    render(
      <BrowserRouter>
        <DashboardStats />
      </BrowserRouter>
    );

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("read")).toBeInTheDocument();
    expect(screen.getByText("light")).toBeInTheDocument();
  });
});
