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

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img
            src={logo}
            alt="logo"
            style={{ width: "70px", height: "70px" }}
          />
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
            <IconButton aria-label="show cart items" color="inherit">
              <Badge badgeContent={2} color="secondary">
                <ShoppingCart fontSize="large" />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
