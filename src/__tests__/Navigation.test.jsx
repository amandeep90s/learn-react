import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "../components/Navigation";

describe("Navigation Component", () => {
  test("renders navigation component", () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("User Profile")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  test("all navigation links have correct href attributes", () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    const homeLink = screen.getByText("Home");
    const aboutLink = screen.getByText("About");
    const userLink = screen.getByText("User Profile");
    const dashboardLink = screen.getByText("Dashboard");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(aboutLink).toHaveAttribute("href", "/about");
    expect(userLink).toHaveAttribute("href", "/user/123");
    expect(dashboardLink).toHaveAttribute("href", "/dashboard");
  });

  test("renders NavLink components", () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4);
  });
});
