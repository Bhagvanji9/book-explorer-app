import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import BookCard from "../components/BookCard";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

import { useSelector } from "react-redux";

const book = {
  id: "test-book-1",
  volumeInfo: {
    title: "Book 1",
    authors: ["Author 1"],
    description: "Test description.",
    imageLinks: {
      thumbnail: "https://example.com/thumb.jpg",
    },
  },
};

const renderBookCard = (favorites = []) => {
  useSelector.mockImplementation((selectorFn) =>
    selectorFn({ favorites: { favorites } })
  );

  return render(
    <Provider
      store={{
        getState: () => {},
        subscribe: () => {},
        dispatch: jest.fn(),
      }}
    >
      <BrowserRouter>
        <BookCard book={book} />
      </BrowserRouter>
    </Provider>
  );
};

describe("BookCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders book title, author, and description", () => {
    renderBookCard();

    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Author 1")).toBeInTheDocument();
    expect(screen.getByText(/Test description/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      book.volumeInfo.imageLinks.thumbnail
    );
  });

  it("navigates to book details on card click", () => {
    renderBookCard();

    fireEvent.click(screen.getByRole("img"));
    expect(mockNavigate).toHaveBeenCalledWith("/book/test-book-1");
  });

  it("dispatches addFavorite if not in favorites", () => {
    renderBookCard();
    fireEvent.click(screen.getByTestId("fav-toggel"));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("dispatches removeFavorite if already in favorites", () => {
    renderBookCard([book]);
    fireEvent.click(screen.getByTestId("fav-toggel"));
    expect(mockDispatch).toHaveBeenCalled();
  });
});
