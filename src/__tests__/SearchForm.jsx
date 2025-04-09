import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "../components/SearchForm";

describe("SearchForm", () => {
  it("renders form inputs", () => {
    render(<SearchForm onSearch={jest.fn()} />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tags/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Notes/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
  });

  it("shows validation error when no required fields are filled", async () => {
    render(<SearchForm onSearch={jest.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /Search/i }));

    expect(await screen.findByText(/At least one field/i)).toBeInTheDocument();
  });

  it("calls onSearch with correct query", async () => {
    const onSearchMock = jest.fn();

    render(<SearchForm onSearch={onSearchMock} />);

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "React" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Search/i }));

    expect(await screen.findByLabelText(/Title/i)).toBeInTheDocument();

    expect(onSearchMock).toHaveBeenCalledWith("intitle:React", {
      notes: "",
      tags: "",
    });
  });
});
