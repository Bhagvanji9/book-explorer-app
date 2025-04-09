import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Favorites from "../pages/Favorites";
import { removeFavorite } from "../store/favoritesSlice";

jest.mock("../hooks/useRedux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

import { useSelector, useDispatch } from "../hooks/useRedux";

describe("Favorites Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows empty message when there are no favorites", () => {
    useSelector.mockReturnValue([]);
    useDispatch.mockReturnValue(() => {});

    render(<Favorites />);

    expect(
      screen.getByText(/You haven't added any books to your favorites yet/i)
    ).toBeInTheDocument();
  });

  test("renders favorite book info correctly", () => {
    const mockFavorites = [
      {
        id: "book-1",
        volumeInfo: {
          title: "Book 1",
          authors: ["Author 1", "Author 2"],
          publishedDate: "2001-11-13",
          imageLinks: {
            thumbnail: "https://example.com/image.jpg",
          },
        },
      },
    ];

    useSelector.mockReturnValue(mockFavorites);
    useDispatch.mockReturnValue(() => {});

    render(<Favorites />);

    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText(/Author 1/)).toBeInTheDocument();
    expect(screen.getByText(/Author 2/)).toBeInTheDocument();
    expect(screen.getByText(/2001/)).toBeInTheDocument();
    expect(screen.getByText(/Remove/)).toBeInTheDocument();
  });

  test("dispatches removeFavorite when 'Remove' button is clicked", () => {
    const mockDispatch = jest.fn();

    const mockFavorites = [
      {
        id: "book-1",
        volumeInfo: {
          title: "Test Book",
          authors: ["Test Author"],
          publishedDate: "2020",
        },
      },
    ];

    useSelector.mockReturnValue(mockFavorites);
    useDispatch.mockReturnValue(mockDispatch);

    render(<Favorites />);

    fireEvent.click(screen.getByText(/Remove/));

    expect(mockDispatch).toHaveBeenCalledWith(removeFavorite("book-1"));
  });
});
