import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import Header from "./components/Header";
import Providers from "./components/Providers";
import { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";

function App() {
  const theme = useTheme();
  const [mode, setMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <Providers mode={mode}>
      <Router>
        <Box
          component="div"
          sx={{
            backgroundColor: "background.paper",
          }}
          className="min-h-screen"
        >
          <Header toggleTheme={toggleTheme} mode={mode} />
          <main className="container mx-auto p-4">
            <MainRoutes />
          </main>
        </Box>
      </Router>
    </Providers>
  );
}

export default App;
