import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const searchBooks = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${query}&maxResults=30`);
    return response.data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};
