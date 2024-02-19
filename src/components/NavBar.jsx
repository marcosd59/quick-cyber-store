import * as React from 'react';
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
import { auth } from "../firebase"
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import "../stylesheets/NavBar.css";

export default function NavBar() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useNavigate();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useTheme(); // Acceso al tema actual
  const [darkMode, setDarkMode] = React.useState(prefersDarkMode); // Estado local para el modo oscuro

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Cambiar el estado del modo oscuro
  };

  const calculatedTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  const handleAuth = () =>{
    if (user){
      auth.signOut();
      dispatch({
        type: actionTypes.EMPTY_BASKET,
        basket: [],
      });
      dispatch({
        type: actionTypes.SET_USER,
        user: null,
      });
      history("/")
    }
  }

  return (
    <ThemeProvider theme={calculatedTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
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
            <Typography variant="h7" component="div" sx={{ flexGrow: 1, color: darkMode ? 'yellow' : 'white' }}>
              QuickCyber Store
            </Typography>

            <Typography
              variant="h6"
              color="white"
              component="div"
              sx={{ flexGrow: 1, color: darkMode ? 'yellow' : 'white' }}
            >
               Hello {user ? user.email : "Guest"} 
            </Typography>
            
            <div className={ClassNames.button}>
              <Link to="/signin">
                <Button color="info" variant="contained" onClick={handleAuth} sx={{ color: darkMode ? 'white' : 'white' }}>
                  <strong>{user ? "Sign Out" : "Sign In" }</strong>
                </Button>
              </Link>

              <Link to="/checkout-page">
                <IconButton aria-label="show cart items" color="secondary">
                  <Badge badgeContent={basket?.length} color="secondary">
                    <ShoppingCart fontSize="large" />
                  </Badge>
                </IconButton>
              </Link>

              <Button onClick={toggleDarkMode} sx={{ color: darkMode ? 'yellow' : 'white' }}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <div style={{ height: "50px" }}></div>
        <div style={{ marginTop: "50px" }}>{/* Contenido de los objetos */}</div>
      </Box>
    </ThemeProvider>
  );
}
