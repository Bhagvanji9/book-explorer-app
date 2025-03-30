import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AbcTwoToneIcon from "@mui/icons-material/AbcTwoTone";
import DrawRoundedIcon from "@mui/icons-material/DrawRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import StyleRoundedIcon from "@mui/icons-material/StyleRounded";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  InputAdornment,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";

const searchSchema = yup
  .object()
  .shape({
    title: yup
      .string()
      .trim()
      .max(100, "Title must be at most 100 characters long"),
    author: yup
      .string()
      .trim()
      .max(100, "Author must be at most 100 characters long"),
    genre: yup
      .string()
      .trim()
      .max(100, "Genre must be at most 100 characters long"),
    notes: yup
      .string()
      .trim()
      .max(500, "Notes must be at most 500 characters long"),
    tags: yup.string().trim(),
  })
  .test("at-least-one", null, (values, { createError }) => {
    if (!values.title && !values.author && !values.genre) {
      return createError({
        path: "formError",
        message: "At least one field (Title, Author, or Genre) is required",
      });
    }
    return true;
  });

function SearchForm({ onSearch }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchSchema),
  });

  const onSubmit = (data) => {
    const query = [
      data.title ? `intitle:${data.title}` : "",
      data.author ? `inauthor:${data.author}` : "",
      data.genre ? `subject:${data.genre}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    onSearch(query, { notes: data.notes, tags: data.tags });
  };

  return (
    <Card
      sx={{
        margin: "auto",
        borderRadius: 5,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        background: "background.paper",
      }}
    >
      <CardHeader title="Search for Books" />
      <form
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <CardContent>
          <Grid container spacing={2}>
            {errors?.formError && (
              <Grid
                size={{
                  xs: 12,
                }}
              >
                <Typography color="error">
                  {errors.formError.message}
                </Typography>
              </Grid>
            )}
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                {...register("title")}
                id="title"
                label="Title"
                variant="filled"
                className="rounded-lg"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AbcTwoToneIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                {...register("author")}
                id="author"
                label="Author"
                variant="filled"
                className="rounded-lg"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <DrawRoundedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                {...register("genre")}
                id="genre"
                label="Genre"
                variant="filled"
                className="rounded-lg"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CategoryRoundedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                {...register("tags")}
                id="tags"
                label="Tags (comma-separated, Optional)"
                variant="filled"
                className="rounded-lg"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <StyleRoundedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
              }}
            >
              <TextField
                fullWidth
                {...register("notes")}
                label="Notes (Optional)"
                variant="filled"
                multiline
                rows={3}
                className="rounded-lg"
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions
          sx={{
            padding: "16px",
          }}
          className="flex justify-end p-4"
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-3 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold py-2 rounded-full"
            endIcon={<i className="tabler-send" />}
          >
            Search
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

export default SearchForm;
