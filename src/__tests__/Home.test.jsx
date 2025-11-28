import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

// Mock react-router-dom hooks
const mockNavigate = jest.fn();
const defaultLocation = {
  pathname: "/",
  search: "",
  hash: "",
  state: null,
};
const mockUseLocation = jest.fn(() => defaultLocation);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => mockUseLocation(),
}));

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders home page with title", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText("Home Page")).toBeInTheDocument();
    expect(screen.getByText(/useNavigate/)).toBeInTheDocument();
    expect(screen.getByText(/useLocation/)).toBeInTheDocument();
  });

  test("displays current location information", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText("Current Location Info:")).toBeInTheDocument();
    expect(screen.getAllByText(/Pathname:/).length).toBeGreaterThan(0);
  });

  test("navigates to user profile when button is clicked", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const userButton = screen.getByText(/Go to User Profile/);
    fireEvent.click(userButton);

    expect(mockNavigate).toHaveBeenCalledWith("/user/123");
  });

  test("navigates to about page with query params", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const aboutButton = screen.getByText(/Go to About with Query Params/);
    fireEvent.click(aboutButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/about?tab=team&section=leadership"
    );
  });

  test("navigates to dashboard with state", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const dashboardButton = screen.getByText(/Go to Dashboard with State/);
    fireEvent.click(dashboardButton);

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard", {
      state: { from: "home" },
    });
  });

  test("displays location state when present", () => {
    const mockLocationWithState = {
      pathname: "/",
      search: "?test=value",
      hash: "#section",
      state: { from: "test" },
    };

    mockUseLocation.mockReturnValue(mockLocationWithState);

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText(/Search:/)).toBeInTheDocument();
    expect(screen.getByText("?test=value")).toBeInTheDocument();
    expect(screen.getByText("#section")).toBeInTheDocument();
  });
});
