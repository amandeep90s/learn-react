import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";

// Mock react-router-dom hooks
const mockNavigate = jest.fn();
const defaultLocation = {
  pathname: "/non-existent-page",
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

describe("NotFound Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLocation.mockReturnValue(defaultLocation); // Reset to default for each test
  });

  test("renders 404 page", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  test("displays the current pathname", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText(/non-existent-page/)).toBeInTheDocument();
  });

  test("navigates to home when Go to Home button is clicked", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const homeButton = screen.getByText("Go to Home");
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("navigates back when Go Back button is clicked", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const backButton = screen.getByText("Go Back");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("renders both navigation buttons", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText("Go to Home")).toBeInTheDocument();
    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });

  test("displays different pathname correctly", () => {
    const customLocation = {
      pathname: "/some/other/path",
      search: "",
      hash: "",
      state: null,
    };

    mockUseLocation.mockReturnValue(customLocation);

    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText(/some\/other\/path/)).toBeInTheDocument();
  });
});
