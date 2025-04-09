import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookDetails from "../pages/BookDetails";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("BookDetails Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useParams.mockReturnValue({ id: "123" });
  });

  test("renders loading skeletons when loading", () => {
    useQuery.mockReturnValue({ data: null, isLoading: true });
    useSelector.mockReturnValue([]);

    render(<BookDetails />);
    const skeletons = screen.getAllByTestId("book-details-skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test("shows 'No Details Available' when no book is found", () => {
    useQuery.mockReturnValue({ data: null, isLoading: false });
    useSelector.mockReturnValue([]);

    render(<BookDetails />);
    expect(screen.getByText(/No Details Available/i)).toBeInTheDocument();
  });

  test("renders book details when book is loaded", () => {
    const mockBook = {
      id: "123",
      volumeInfo: {
        title: "Book 1",
        authors: ["Author A"],
        publisher: "Publisher A",
        publishedDate: "2024",
        description: "A great book",
        imageLinks: {
          thumbnail: "https://example.com/image.jpg",
        },
        categories: ["Fiction"],
        averageRating: 4,
        ratingsCount: 100,
      },
    };

    useQuery.mockReturnValue({ data: mockBook, isLoading: false });
    useSelector.mockReturnValue([]);
    render(<BookDetails />);

    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText(/Author A/i)).toBeInTheDocument();
    expect(screen.getByText(/Publisher A/)).toBeInTheDocument();
    expect(screen.getByText(/2024/)).toBeInTheDocument();
    expect(screen.getByText(/Genres:/)).toBeInTheDocument();
    expect(screen.getByText(/Rating:/)).toBeInTheDocument();
  });

  test("dispatches addFavorite when not in favorites and icon is clicked", () => {
    const mockBook = {
      id: "123",
      volumeInfo: {
        title: "Book 1",
        authors: ["Author A"],
        imageLinks: {},
      },
    };

    useQuery.mockReturnValue({ data: mockBook, isLoading: false });
    useSelector.mockReturnValue([]);

    render(<BookDetails />);

    fireEvent.click(screen.getByLabelText(/Add to favorites/i));
    expect(mockDispatch).toHaveBeenCalledWith(addFavorite(mockBook));
  });

  test("dispatches removeFavorite when already in favorites and icon is clicked", () => {
    const mockBook = {
      id: "123",
      volumeInfo: {
        title: "Book 1",
        authors: ["Author A"],
        imageLinks: {},
      },
    };

    useQuery.mockReturnValue({ data: mockBook, isLoading: false });
    useSelector.mockReturnValue([{ id: "123" }]);

    render(<BookDetails />);

    fireEvent.click(screen.getByLabelText(/Remove from favorites/i));
    expect(mockDispatch).toHaveBeenCalledWith(removeFavorite("123"));
  });
});
