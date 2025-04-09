import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/Header";
import { MemoryRouter } from "react-router-dom";

describe("Header Component", () => {
  const toggleThemeMock = jest.fn();

  const renderComponent = (mode = "light") =>
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header toggleTheme={toggleThemeMock} mode={mode} />
      </MemoryRouter>
    );

  it("renders brand and navigation items", () => {
    renderComponent();

    // Brand
    expect(screen.getByText(/Book Explorer/i)).toBeInTheDocument();

    // Navigation buttons
    const navItems = screen.getAllByTestId("nav-item");
    expect(navItems).toHaveLength(5);
  });

  it("toggles theme on icon button click", () => {
    renderComponent("light");

    const themeButton = screen.getByTestId("theme-btn");

    fireEvent.click(themeButton);
    expect(toggleThemeMock).toHaveBeenCalled();
  });

  it("opens drawer on mobile menu click", () => {
    renderComponent();

    // Click the menu icon (hamburger)
    const openMenuButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(openMenuButton);

    const navItems = screen.getAllByTestId("drawer-menu");
    expect(navItems).toHaveLength(5);
  });
});
