import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DashboardSettings from "../pages/DashboardSettings";

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

describe("DashboardSettings Component", () => {
  test("renders dashboard settings page", () => {
    render(
      <BrowserRouter>
        <DashboardSettings />
      </BrowserRouter>
    );

    expect(screen.getByText("Dashboard Settings")).toBeInTheDocument();
  });

  test("displays context from parent component", () => {
    render(
      <BrowserRouter>
        <DashboardSettings />
      </BrowserRouter>
    );

    expect(screen.getByText(/Logged in as:/)).toBeInTheDocument();
    expect(screen.getByText("Admin User")).toBeInTheDocument();
    expect(screen.getByText(/Your permissions:/)).toBeInTheDocument();
    expect(screen.getByText("read, write, delete")).toBeInTheDocument();
    expect(screen.getByText(/Theme preference:/)).toBeInTheDocument();
    expect(screen.getByText("dark")).toBeInTheDocument();
  });

  test("renders settings options checkboxes", () => {
    render(
      <BrowserRouter>
        <DashboardSettings />
      </BrowserRouter>
    );

    expect(screen.getByText("Email notifications")).toBeInTheDocument();
    expect(screen.getByText("SMS alerts")).toBeInTheDocument();
    expect(screen.getByText("Dark mode")).toBeInTheDocument();
  });

  test("email notifications checkbox is checked by default", () => {
    render(
      <BrowserRouter>
        <DashboardSettings />
      </BrowserRouter>
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeChecked(); // Email notifications
  });

  test("dark mode checkbox is checked by default", () => {
    render(
      <BrowserRouter>
        <DashboardSettings />
      </BrowserRouter>
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[2]).toBeChecked(); // Dark mode
  });

  test("SMS alerts checkbox is not checked by default", () => {
    render(
      <BrowserRouter>
        <DashboardSettings />
      </BrowserRouter>
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[1]).not.toBeChecked(); // SMS alerts
  });

  test("works with different context values", () => {
    const customContext = {
      user: "Regular User",
      permissions: ["read"],
      theme: "light",
    };

    mockUseOutletContext.mockReturnValue(customContext);

    render(
      <BrowserRouter>
        <DashboardSettings />
      </BrowserRouter>
    );

    expect(screen.getByText("Regular User")).toBeInTheDocument();
    expect(screen.getByText("read")).toBeInTheDocument();
    expect(screen.getByText("light")).toBeInTheDocument();
  });
});
