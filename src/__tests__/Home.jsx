import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../pages/Home";
import { useQuery } from "@tanstack/react-query";

jest.mock("../components/SearchForm", () => ({ onSearch }) => (
  <button onClick={() => onSearch("gatsby")}>Mock Search</button>
));

jest.mock("../components/BookCard", () => ({ book }) => (
  <div data-testid="book-card">{book.volumeInfo?.title}</div>
));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

describe("Home Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the initial prompt when no search has been performed", () => {
    useQuery.mockReturnValue({ data: null, isLoading: false });

    render(<Home />);

    expect(screen.getByText(/Start Your Search/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Enter a book title, author name, or genre/i)
    ).toBeInTheDocument();
  });

  test("shows loading skeletons when books are loading", () => {
    useQuery.mockReturnValue({ data: null, isLoading: true });

    render(<Home />);

    const skeletons = screen.getAllByTestId("book-skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test("displays BookCards when books are returned", () => {
    const booksMock = [
      {
        id: "1",
        volumeInfo: {
          title: "Book 1",
        },
      },
      {
        id: "2",
        volumeInfo: {
          title: "Book 2",
        },
      },
    ];

    useQuery.mockReturnValue({ data: booksMock, isLoading: false });

    render(<Home />);

    expect(screen.getAllByTestId("book-card")).toHaveLength(2);
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Book 2")).toBeInTheDocument();
  });

  test("shows 'No Books Found' when search returns empty", () => {
    useQuery.mockReturnValue({ data: [], isLoading: false });

    render(<Home />);
    fireEvent.click(screen.getByText("Mock Search"));

    expect(screen.getByText(/No Books Found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/We couldn’t find any books matching your search/i)
    ).toBeInTheDocument();
  });

  test("calls searchBooks when the search button is clicked", () => {
    const mockBooks = [
      {
        id: "3",
        volumeInfo: {
          title: "Book 3",
        },
      },
    ];

    useQuery.mockReturnValue({ data: mockBooks, isLoading: false });

    render(<Home />);
    fireEvent.click(screen.getByText("Mock Search"));

    expect(screen.getByText("Book 3")).toBeInTheDocument();
  });
});
