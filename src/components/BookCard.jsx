import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, CardContent, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";

export default function BookCard({ book }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.some((fav) => fav.id === book.id);
  return (
    <Card
      sx={{
        borderRadius: 4,
      }}
      className=" relative w-full h-[420px]  shadow-lg overflow-hidden"
    >
      <Box
        mt={2}
        className="absolute top-0 right-2 z-50 bg-white/80 rounded-full"
      >
        <IconButton
          data-testid="fav-toggel"
          onClick={() =>
            dispatch(isFavorite ? removeFavorite(book.id) : addFavorite(book))
          }
          color={isFavorite ? "error" : "default"}
        >
          <FavoriteIcon />
        </IconButton>
      </Box>
      <CardActionArea
        className=" h-full z-40"
        onClick={() => {
          navigate(`/book/${book.id}`);
        }}
      >
        <CardMedia
          sx={{
            objectFit: "fill",
          }}
          component="img"
          image={
            book?.volumeInfo?.imageLinks?.thumbnail ||
            "/images/book-thumbnail.jpg"
          }
          alt={book?.volumeInfo?.title || "Book-image"}
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
        <CardContent className="relative  h-full">
          <div className=" absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/95 to-transparent"></div>

          <div className=" absolute bottom-0 left-0 w-full p-4 z-10 text-white">
            <Typography
              variant="subtitle2"
              className="uppercase tracking-wide text-gray-300"
            >
              {book?.volumeInfo?.authors?.join(", ")}
            </Typography>
            <Typography variant="h6" className="font-bold text-lg capitalize">
              {book?.volumeInfo?.title || "Book Title"}
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-400 mt-1 line-clamp-2"
            >
              {book?.volumeInfo?.description}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
