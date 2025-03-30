import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

function BookDetailsDialog({ open, onClose, book }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setIsScrolled(contentRef.current.scrollTop > 5);
      }
    };

    if (contentRef.current) {
      contentRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [open]);

  if (!book) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box
        className={`sticky top-0 z-10  ${
          isScrolled ? "shadow-lg" : ""
        } transition-shadow duration-300`}
      >
        <DialogTitle className="flex justify-between items-center">
          <Typography
            component="span"
            className="font-extrabold"
            color="primary"
            sx={{
              fontWeight: "bold",
              fontSize: "1.25rem",
            }}
          >
            {book.volumeInfo?.title || "Book Details"}
          </Typography>
          <IconButton
            onClick={onClose}
            color="textSecondary"
            className="text-gray-500 hover:text-gray-800"
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
      </Box>

      <DialogContent
        ref={contentRef}
        dividers
        className="max-h-[400px] overflow-y-auto"
      >
        <Typography
          component="div"
          color="textSecondary"
          className=" text-justify"
          dangerouslySetInnerHTML={{
            __html: book?.volumeInfo?.description || "No description available",
          }}
        />

        <div className="grid grid-cols-2 gap-2 mt-5">
          <div>
            <Typography variant="body1">Language</Typography>
            <Typography color="primary" variant="body2">
              {book.volumeInfo.language || "Unknown"}
            </Typography>
          </div>
          <div>
            <Typography variant="body1">Authors</Typography>
            <Typography color="primary" variant="body2">
              {book.volumeInfo.authors?.join(", ") || "Unknown"}
            </Typography>
          </div>
          <div>
            <Typography variant="body1">Publisher</Typography>
            <Typography color="primary" variant="body2">
              {book.volumeInfo.publisher || "N/A"}
            </Typography>
          </div>
          <div>
            <Typography variant="body1">Published On</Typography>
            <Typography color="primary" variant="body2">
              {book.volumeInfo.publishedDate || "N/A"}
            </Typography>
          </div>
          <div>
            <Typography variant="body1">Pages</Typography>
            <Typography color="primary" variant="body2">
              {book.volumeInfo.pageCount || "N/A"}
            </Typography>
          </div>
          <div>
            <Typography variant="body1">Content Version</Typography>
            <Typography color="primary" variant="body2">
              {book.volumeInfo.contentVersion || "N/A"}
            </Typography>
          </div>
          <div>
            <Typography variant="body1">Reading Modes</Typography>
            <Typography color="primary" variant="body2">
              {book?.volumeInfo?.readingModes?.text ||
              book?.volumeInfo?.readingModes?.image
                ? `${book?.volumeInfo?.readingModes?.text ? "Text " : ""}${
                    book?.volumeInfo?.readingModes?.image ? "Image" : ""
                  }`
                : "N/A"}
            </Typography>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            window.open(book.volumeInfo.previewLink, "_blank");
          }}
          variant="outlined"
          color="primary"
          className="mr-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
          endIcon={<ArrowForwardRoundedIcon />}
        >
          More Details
        </Button>
        <Button
          onClick={onClose}
          variant="contained"
          className="mr-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookDetailsDialog;
