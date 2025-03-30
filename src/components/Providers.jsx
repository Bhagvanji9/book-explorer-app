import { createTheme, ThemeProvider } from "@mui/material";

const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#0BDA51",
        contrastText: "#fff",
      },
      secondary: {
        main: "#FF9800",
      },
      background: {
        default: mode === "dark" ? "#0A0A0A" : "#E0E0E0",
        paper: mode === "dark" ? "#1E1E1E" : "#FFFFFF",
      },
      text: {
        primary: mode === "dark" ? "#FFFFFF" : "#111111",
        secondary: mode === "dark" ? "#CCCCCC" : "#444444",
        disabled: mode === "dark" ? "#888888" : "#999999",
      },

      error: {
        main: "#D32F2F",
      },
      warning: {
        main: "#F57C00",
      },
      info: {
        main: "#2196F3",
      },
      success: {
        main: "#4CAF50",
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600,
      },
      body1: {
        fontSize: "1rem",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            textTransform: "none",
          },
        },
      },
    },
  });
};

function Providers({ children, mode }) {
  return <ThemeProvider theme={getTheme(mode)}>{children}</ThemeProvider>;
}

export default Providers;
