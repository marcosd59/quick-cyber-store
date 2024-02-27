import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import logo from "../img/solo_logo.png";
import { ClassNames } from "@emotion/react";
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import { auth } from "../firebase";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "../stylesheets/NavBar.css";
import { styled } from "@mui/material/styles";

export default function NavBar() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useNavigate();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
  const theme = useTheme(); // Acceso al tema actual
  const [darkMode, setDarkMode] = React.useState(prefersDarkMode); // Estado local para el modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Cambiar el estado del modo oscuro
  };

  const calculatedTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  const handleAuth = () => {
    if (user) {
      auth.signOut();
      dispatch({
        type: actionTypes.EMPTY_BASKET,
        basket: [],
      });
      dispatch({
        type: actionTypes.SET_USER,
        user: null,
      });
      history("/");
    }
  };

  const CustomIconButton = styled(IconButton)({
    color: "#EBC446",
  });

  const CustomBadge = styled(Badge)({
    "& .MuiBadge-badge": {
      backgroundColor: "purple",
      color: "#fff",
    },
  });

  return (
    <ThemeProvider theme={calculatedTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ backgroundColor: "#212F77" }}>
          <Toolbar>
            <Link to="/">
              <IconButton>
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "70px", height: "70px" }}
                />
              </IconButton>
            </Link>
            <Typography
              variant="h6"
              component="div"
              className="quickCyberStore"
              sx={{ flexGrow: 1, color: "white" }}
            >
              QuickCyber Store
            </Typography>
            <Typography
              variant="h6"
              color="white"
              component="div"
              className="greetingText"
              sx={{ flexGrow: 1, color: darkMode ? "white" : "white" }}
            >
              Hello {user ? user.email : "Guest"}
            </Typography>
            <div className={ClassNames.button}>
              <Link to="/signin">
                <Button
                  color="info"
                  variant="contained"
                  onClick={handleAuth}
                  sx={{
                    color: darkMode ? "white" : "white",
                    backgroundColor: darkMode ? "#EBC446" : "#EBC446",
                  }}
                >
                  <strong>{user ? "Sign Out" : "Sign In"}</strong>
                </Button>
              </Link>

              <Link to="/checkout-page">
                <CustomIconButton aria-label="show cart items" color="error">
                  <CustomBadge badgeContent={basket?.length} color="secondary">
                    <ShoppingCart fontSize="large" />
                  </CustomBadge>
                </CustomIconButton>
              </Link>

              <Button
                onClick={toggleDarkMode}
                sx={{ color: darkMode ? "white" : "white" }}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <div style={{ height: "50px" }}></div>
        <div style={{ marginTop: "50px" }}>
          {/* Contenido de los objetos */}
        </div>
      </Box>
    </ThemeProvider>
  );
}
