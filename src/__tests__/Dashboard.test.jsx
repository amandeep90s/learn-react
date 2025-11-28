import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

// Mock react-router-dom hooks
const defaultLocation = {
  pathname: "/dashboard",
  search: "",
  hash: "",
  state: { from: "home" },
};
const mockUseLocation = jest.fn(() => defaultLocation);

const defaultMatch = {
  pathname: "/dashboard",
  pattern: { path: "/dashboard" },
  params: {},
};
const mockUseMatch = jest.fn(() => defaultMatch);

const mockOutlet = jest.fn(() => null);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => mockUseLocation(),
  useMatch: () => mockUseMatch(),
  Outlet: (props) => {
    mockOutlet(props);
    return <div data-testid="outlet">Outlet Content</div>;
  },
  useOutletContext: jest.fn(),
}));

describe("Dashboard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders dashboard page", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("useMatch Information:")).toBeInTheDocument();
    expect(screen.getByText("Location State:")).toBeInTheDocument();
    expect(
      screen.getByText("Outlet Context (shared with nested routes):")
    ).toBeInTheDocument();
  });

  test("displays match information", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/Exact Match for \/dashboard:/)
    ).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText(/Matched Path:/)).toBeInTheDocument();
  });

  test("displays location state", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/Came from:/)).toBeInTheDocument();
    expect(screen.getByText("home")).toBeInTheDocument();
  });

  test("displays outlet context information", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText("Admin User")).toBeInTheDocument();
    expect(screen.getByText("read, write, delete")).toBeInTheDocument();
    expect(screen.getByText("dark")).toBeInTheDocument();
  });

  test("renders navigation links to nested routes", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    const statsLink = screen.getByText("Stats");
    const settingsLink = screen.getByText("Settings");

    expect(statsLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
    expect(statsLink).toHaveAttribute("href", "/dashboard/stats");
    expect(settingsLink).toHaveAttribute("href", "/dashboard/settings");
  });

  test("renders Outlet component", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });

  test("passes context to Outlet", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(mockOutlet).toHaveBeenCalledWith(
      expect.objectContaining({
        context: {
          user: "Admin User",
          permissions: ["read", "write", "delete"],
          theme: "dark",
        },
      })
    );
  });

  test("displays direct navigation message when no state", () => {
    const mockLocationNoState = {
      pathname: "/dashboard",
      search: "",
      hash: "",
      state: null,
    };

    mockUseLocation.mockReturnValue(mockLocationNoState);

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText("Direct navigation")).toBeInTheDocument();
  });

  test("shows no match when useMatch returns null", () => {
    mockUseMatch.mockReturnValue(null);

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText("No")).toBeInTheDocument();
  });
});
