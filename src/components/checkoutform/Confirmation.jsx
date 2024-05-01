import { Button, Divider, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Confirmation = ({ message }) => {
  console.log(message);
  return (
    <>
      <Typography variant="h6" sx={{ marginTop: "1rem" }}>
        {message}
      </Typography>
      <Divider />
      <Typography variant="subtitle2" gutterBottom sx={{ marginTop: "1rem" }}>
        {message === "Payment successful"
          ? "Thank you for your purchase!"
          : "An error occurred. Please try again."}
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="outlined"
        sx={{
          backgroundColor: "#212F77",
          color: "#fff",
          ":hover": { bgcolor: "#800080", borderColor: "#800080" },
          marginTop: "1rem",
        }}
        type="button"
      >
        Back to Home Page
      </Button>
    </>
  );
};

export default Confirmation;
