import { useState } from "react";
import { searchBooks } from "../api/googleBooksApi";
import SearchForm from "../components/SearchForm";
import BookCard from "../components/BookCard";
import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";

function Home() {
  const [query, setQuery] = useState(null);

  const { data: books, isLoading } = useQuery({
    queryKey: ["books", query],
    queryFn: () => searchBooks(query),
    enabled: !!query,
  });

  const handleSearch = (query) => {
    setQuery(query);
  };

  return (
    <div className="p-4">
      <Container>
        <Grid
          container
          spacing={4}
          flex
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid size={{ xs: 12, md: 8 }}>
            <SearchForm onSearch={handleSearch} />
          </Grid>
          {!query && (
            <Box className="flex flex-col items-center justify-center gap-4 p-6 text-center">
              <SearchIcon className="text-blue-500" sx={{ fontSize: 80 }} />

              <Typography variant="h5" className="font-semibold text-gray-700">
                Start Your Search
              </Typography>
              <Typography variant="body1" className="text-gray-500">
                Enter a book title, author name, or genre to explore our
                collection.
              </Typography>
            </Box>
          )}
          {isLoading && (
            <Grid size={{ xs: 12 }}>
              <Grid container spacing={2}>
                {Array.from({ length: 9 }, (_, i) => i + 1).map(
                  (item, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                      <Skeleton
                        variant="rect"
                        height={400}
                        width="100%"
                        className="rounded-2xl"
                      />
                    </Grid>
                  )
                )}
              </Grid>
            </Grid>
          )}
          {!isLoading && books && Array.isArray(books) && books.length > 0 && (
            <Grid size={{ xs: 12 }}>
              <Grid container spacing={3}>
                {books.map((book) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={book.id}>
                    <BookCard book={book} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
          {!isLoading &&
            query &&
            (!books ||
              (books && Array.isArray(books) && books.length === 0)) && (
              <Box className="flex flex-col items-center justify-center gap-4 p-6 text-center">
                <SearchOffIcon
                  className="text-gray-400"
                  sx={{ fontSize: 80 }}
                />
                <Typography
                  variant="h5"
                  className="font-semibold text-gray-700"
                >
                  No Books Found
                </Typography>
                <Typography variant="body1" className="text-gray-500">
                  We couldn’t find any books matching your search. Try different
                  keywords.
                </Typography>
              </Box>
            )}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
