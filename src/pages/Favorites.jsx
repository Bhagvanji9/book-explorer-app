import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../store/favoritesSlice";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

function Favorites() {
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <Typography variant="h4" component="h2" color="primary" gutterBottom>
        Your Favorite Books
      </Typography>

      {favorites.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          You haven't added any books to your favorites yet. Start adding your
          favorite books now!
        </Typography>
      ) : (
        <Grid container spacing={3} className="mt-6">
          {favorites.map((book) => (
            <Grid
              size={{
                sm: 12,
                md: 6,
              }}
              key={book.id}
            >
              <Card className="flex flex-col sm:flex-row items-center justify-between rounded-lg shadow-xl overflow-hidden bg-white w-full">
                <CardMedia
                  component="img"
                  image={
                    book.volumeInfo.imageLinks?.thumbnail ||
                    "/images/book-thumbnail.jpg"
                  }
                  alt={book.volumeInfo.title}
                  sx={{
                    width: "100%",
                    height: 200,
                    maxWidth: 150,
                    borderRadius: 2,
                    objectFit: "fit",
                    margin: 2,
                    boxShadow: "0px 4px 20px rgba(34, 35, 58, 0.2)",
                  }}
                  className=" object-contain"
                />
                <CardContent>
                  <Typography
                    variant="caption"
                    color="primary"
                    fontWeight="bold"
                  >
                    {book.volumeInfo.publishedDate?.substring(0, 4) ||
                      "Unknown Year"}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary"
                    className="line-clamp-2"
                  >
                    {book.volumeInfo.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                  </Typography>
                  <Button
                    onClick={() => dispatch(removeFavorite(book.id))}
                    sx={{
                      backgroundImage:
                        "linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)",
                      boxShadow: "0px 4px 32px rgba(252, 56, 56, 0.4)",
                      borderRadius: 100,
                      paddingX: 3,
                      color: "#ffffff",
                      marginTop: 2,
                    }}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Favorites;
