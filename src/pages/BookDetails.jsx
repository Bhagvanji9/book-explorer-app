import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import { Box, Container, Grid, Skeleton } from "@mui/material";
import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Rating,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BookDetailsDialog from "../components/BookDetailsDialog";
import { useQuery } from "@tanstack/react-query";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
const fetchBookDetails = async (id) => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${id}`
  );
  return response.data;
};
function BookDetails() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookDetails(id),
    enabled: !!id,
  });

  const isFavorite = favorites.some((fav) => fav?.id === book?.id);
  if (!book && !isLoading)
    return (
      <Box className="flex flex-col items-center justify-center gap-4 p-6 text-center">
        <InfoOutlinedIcon className="text-gray-400" sx={{ fontSize: 80 }} />

        <Typography variant="h5" className="font-semibold text-gray-700">
          No Details Available
        </Typography>
        <Typography variant="body1" className="text-gray-500">
          Sorry, we couldn't find details for this book.
        </Typography>
      </Box>
    );

  if (isLoading)
    return (
      <>
        <Container
          data-testid="book-details-skeleton"
          className="flex p-4 gap-5"
        >
          <Skeleton
            variant="rectangular"
            width="30%"
            height={300}
            sx={{ borderRadius: "10px" }}
          />

          <div className="flex flex-col ga-3 flex-1 ">
            <Box className="flex flex-col gap-1">
              <Skeleton width="60%" height={30} />
              <Skeleton width="50%" height={20} />
              <Skeleton width="40%" height={25} />
              <Skeleton width="80%" height={20} />
            </Box>

            <Skeleton width="30%" height={25} />

            <Skeleton width="40%" height={25} />

            <div className="flex gap-2">
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton width={150} height={40} />
            </div>
          </div>
        </Container>
        <Container className="flex p-4 gap-5">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ borderRadius: "10px" }}
          />
        </Container>
      </>
    );

  return (
    <>
      <Container className=" flex flex-col p-4 gap-5">
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              sm: 4,
            }}
          >
            <Card
              sx={{
                borderRadius: "15px",
              }}
            >
              <CardMedia
                component="img"
                height="400"
                image={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "/images/book-thumbnail.jpg"
                }
                alt={book.volumeInfo.title}
                sx={{
                  borderRadius: "10px",
                }}
                className="object-cover w-2/3 h-2/3"
              />
            </Card>
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 8,
            }}
            sx={{
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Box className="flex flex-col gap-1">
              <Typography
                color="textPrimary"
                variant="h5"
                className="font-semibold font-sans"
              >
                {book.volumeInfo.title}
              </Typography>

              {book.volumeInfo.subtitle && (
                <Typography
                  variant="body1"
                  color="textPrimary"
                  className="italic"
                >
                  {book.volumeInfo.subtitle}
                </Typography>
              )}

              <Typography
                variant="h6"
                color="textPrimary"
                className=" font-bold flex gap-2 text-center justify-start items-center"
              >
                <EditOutlinedIcon />
                {book.volumeInfo.authors?.join(" • ") || "Unknown Author"}
              </Typography>

              <div className="flex space-x-2 gap-2 m-0 ">
                {book.volumeInfo.publisher && (
                  <Typography variant="body1" color="textSecondary">
                    <Typography component="span" className="">
                      Publisher
                    </Typography>
                    : {book.volumeInfo.publisher}
                  </Typography>
                )}
                {book.volumeInfo.publisher && book.volumeInfo.publishedDate && (
                  <Typography variant="body1" color="textSecondary">
                    |
                  </Typography>
                )}
                {book.volumeInfo.publishedDate && (
                  <Typography variant="body1" color="textSecondary">
                    Published: {book.volumeInfo.publishedDate}
                  </Typography>
                )}
              </div>
            </Box>

            <Box className="flex flex-col gap-2">
              {book.volumeInfo.categories?.length > 0 && (
                <div className="space-y-1">
                  <Typography
                    variant="body1"
                    color="primary"
                    className="font-medium text-blue-600"
                  >
                    Genres:
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    {book.volumeInfo.categories.map((category, index) => (
                      <Typography
                        component="span"
                        color="primary"
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-green-100 "
                      >
                        {category}
                      </Typography>
                    ))}
                  </div>
                </div>
              )}

              {book.volumeInfo.averageRating && (
                <div className="flex items-center space-x-2">
                  <Typography variant="body1" color="textSecondary">
                    Rating:
                  </Typography>
                  <Rating value={book.volumeInfo.averageRating} readOnly />
                  <Typography variant="body2" color="textSecondary">
                    ({book.volumeInfo.ratingsCount} ratings)
                  </Typography>
                </div>
              )}
            </Box>

            <div className="flex gap-2">
              <Tooltip
                title={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
                arrow
              >
                <IconButton
                  onClick={() =>
                    dispatch(
                      isFavorite ? removeFavorite(book.id) : addFavorite(book)
                    )
                  }
                  className="self-start mt-4 bg-white/80 hover:bg-gray-200 transition-all rounded-full"
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <FavoriteIcon
                    className={isFavorite ? "text-red-500" : "text-gray-500"}
                  />
                </IconButton>
              </Tooltip>

              <Button
                variant="outlined"
                size="large"
                className="mt-4 text-blue-500 hover:bg-blue-50"
                onClick={() => {
                  setOpen(true);
                }}
                endIcon={<ArrowForwardRoundedIcon />}
              >
                View More Details
              </Button>
            </div>
          </Grid>
        </Grid>
        <div>
          <Box>
            <Typography
              variant="h5"
              sx={{
                color: "text.secondary",
              }}
              className="font-semibold  mb-2 italic font-serif"
            >
              Book Description :
            </Typography>
            {book.volumeInfo.description && (
              <Typography
                component="div"
                sx={{
                  color: "text.primary",
                }}
                dangerouslySetInnerHTML={{
                  __html: book?.volumeInfo?.description,
                }}
              />
            )}
          </Box>
        </div>
      </Container>{" "}
      <BookDetailsDialog
        open={open}
        onClose={() => setOpen(false)}
        book={book}
      />
    </>
  );
}

export default BookDetails;
