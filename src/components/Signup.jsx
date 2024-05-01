import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignUp() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (event) => {
    const emailInput = event.target.value;
    setEmail(emailInput);
    setIsEmailValid(validateEmail(emailInput));
    checkFormValidity();
  };

  const handlePasswordChange = (event) => {
    const passwordInput = event.target.value;
    setPassword(passwordInput);
    checkFormValidity();
  };

  const checkFormValidity = () => {
    setIsFormValid(isEmailValid && password.length > 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          console.log(userCredential);
          if (userCredential) {
            navigate("/");
          }
        }
      );
    } catch (error) {
      console.error("Error al crear usuario:", error);
      setMessage("Error al crear usuario: " + error.message);
      setSeverity("error");
      setOpen(true);
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  error={!isEmailValid && email.length > 0}
                  helperText={
                    !isEmailValid && email.length > 0
                      ? "Invalid email address"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isFormValid}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#212F77",
                color: "white",
                "&:hover": {
                  backgroundColor: "darken(#212F77, 0.5)",
                },
                "&:disabled": {
                  backgroundColor: "grey",
                },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouteLink to="/signin">
                  Already have an account? Sign in
                </RouteLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
