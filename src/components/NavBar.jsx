import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import logo from "../img/solo_logo.png";
import { ClassNames } from "@emotion/react";
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import "../stylesheets/NavBar.css";

export default function NavBar() {
  const [{ basket }, dispatch] = useStateValue();
  return (
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
          <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
            QuickCyber Store
          </Typography>
          <Typography
            variant="h7"
            color="textPrimary"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {/* Hello Guest */}
          </Typography>
          <div className={ClassNames.button}>
            <Button color="inherit" variant="outlined">
              <strong>Sign In</strong>
            </Button>
            <Link to="/checkout-page">
              <IconButton aria-label="show cart items" color="inherit">
                <Badge badgeContent={basket?.length} color="secondary">
                  <ShoppingCart fontSize="large" />
                </Badge>
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ height: "50px" }}></div>
      <div style={{ marginTop: "50px" }}>{/* Contenido de los objetos */}</div>
    </Box>
  );
}
