import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserProfile from "../pages/UserProfile";

// Mock react-router-dom hooks
const mockNavigate = jest.fn();
const defaultParams = { userId: "123" };
const mockUseParams = jest.fn(() => defaultParams);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => mockUseParams(),
}));

describe("UserProfile Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders user profile page", () => {
    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );

    expect(screen.getByText("User Profile")).toBeInTheDocument();
    expect(screen.getByText(/useParams/)).toBeInTheDocument();
  });

  test("displays user ID from URL params", () => {
    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );

    expect(screen.getByText(/User ID from URL:/)).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
  });

  test("displays user details for valid user ID", () => {
    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
  });

  test("displays not found message for invalid user ID", () => {
    mockUseParams.mockReturnValue({ userId: "999" });

    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );

    expect(screen.getByText("User not found!")).toBeInTheDocument();
  });

  test("navigates to different user when button is clicked", () => {
    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );

    const user456Button = screen.getByText("User 456");
    fireEvent.click(user456Button);

    expect(mockNavigate).toHaveBeenCalledWith("/user/456");
  });

  test("renders all user navigation buttons", () => {
    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );

    expect(screen.getByText("User 123")).toBeInTheDocument();
    expect(screen.getByText("User 456")).toBeInTheDocument();
    expect(screen.getByText("User 789")).toBeInTheDocument();
  });

  test("displays correct user details for user 456", () => {
    mockUseParams.mockReturnValue({ userId: "456" });

    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );

    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Designer")).toBeInTheDocument();
  });
});
