import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import {
  HomeFilled,
  Menu,
  Close,
  LightMode,
  DarkMode,
  Favorite,
  Info,
  Phone,
  Explore,
} from "@mui/icons-material";

function Header({ toggleTheme, mode }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "transparent",
        }}
      >
        <Toolbar className=" flex justify-between items-center gap-8">
          <IconButton
            sx={{
              display: { xs: "block", md: "none" },
            }}
            className="text-white"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </IconButton>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            color="textPrimary"
            className="font-bold flex items-center "
          >
            📚 Book Explorer
          </Typography>

          <Box
            component="div"
            sx={{
              display: { xs: "none", md: "flex" },
            }}
            className="gap-6"
          >
            {[
              {
                label: "Home",
                icon: <HomeFilled fontSize="small" />,
                link: "/",
              },
              {
                label: "Favorites",
                icon: <Favorite fontSize="small" />,
                link: "/favorites",
              },
              {
                label: "Explore",
                icon: <Explore fontSize="small" />,
                link: "#",
              },
              { label: "About", icon: <Info fontSize="small" />, link: "#" },
              { label: "Contact", icon: <Phone fontSize="small" />, link: "#" },
            ].map(({ label, icon, link }) => (
              <Typography
                key={label}
                component={link.startsWith("/") ? Link : "a"}
                to={link.startsWith("/") ? link : undefined}
                href={link.startsWith("#") ? link : undefined}
                sx={{
                  color:
                    location.pathname === link
                      ? "primary.main"
                      : "text.primary",
                  fontWeight: location.pathname === link ? "bold" : "normal",
                  borderBottom: "1px solid primary.main",
                  "&:hover": {
                    color: "primary.main",
                    borderBottom: "1px solid primary.main",
                  },
                }}
                className={`${
                  location.pathname === link && "border-b-2"
                } flex items-center text-center  text-primary hover:border-b-2  transition  `}
              >
                {icon}
                <span className="ml-1">{label}</span>
              </Typography>
            ))}
          </Box>

          <IconButton onClick={toggleTheme} className="text-white">
            {mode === "dark" ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-64 h-full ">
          <div className="flex justify-between items-center p-4">
            <Typography variant="h6" className="font-bold">
              📚 Book Explorer
            </Typography>
            <IconButton onClick={() => setIsOpen(false)} className="">
              <Close />
            </IconButton>
          </div>

          <List>
            {[
              {
                label: "Home",
                icon: <HomeFilled fontSize="small" />,
                link: "/",
              },
              {
                label: "Favorites",
                icon: <Favorite fontSize="small" />,
                link: "/favorites",
              },
              {
                label: "Explore",
                icon: <Explore fontSize="small" />,
                link: "#",
              },
              { label: "About", icon: <Info fontSize="small" />, link: "#" },
              { label: "Contact", icon: <Phone fontSize="small" />, link: "#" },
            ].map(({ label, icon, link }) => (
              <ListItem
                key={label}
                disablePadding
                sx={{
                  color: "text.primary",
                }}
              >
                <ListItemButton
                  component={link.startsWith("/") ? Link : "a"}
                  to={link.startsWith("/") ? link : undefined}
                  href={link.startsWith("#") ? link : undefined}
                  onClick={() => setIsOpen(false)}
                  color="textPrimary"
                >
                  {icon}
                  <ListItemText primary={label} className="ml-2" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}

export default Header;
