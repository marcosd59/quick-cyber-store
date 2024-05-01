import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import AddressInput from "./AddressInput";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

const AddressForm = ({ nextStep }) => {
  const methods = useForm();
  const [, dispatch] = useStateValue();
  // const [{ shippingData }, dispatch] = useStateValue();
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ marginTop: "1rem" }}>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            dispatch({
              type: actionTypes.SET_SHIPPING_DATA,
              shippingData: data,
            });
            nextStep();
          })}
        >
          <Grid container spacing={3}>
            <AddressInput required name="firstName" label="First name" />
            <AddressInput required name="lastName" label="Last name" />
            <AddressInput required name="address1" label="Address line 1" />
            <AddressInput name="email" label="Email address" />
            <AddressInput required name="city" label="City" />
            <AddressInput required name="zip" label="ZIP / Postal code" />
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <Button
              component={Link}
              to="/checkout-page"
              sx={{
                color: "#212F77",
                ":hover": { backgroundColor: "#EBC446", color: "#FFF" },
              }}
            >
              Back to the checkout page
            </Button>
            <Button
              sx={{
                backgroundColor: "#212F77",
                ":hover": { backgroundColor: "#800080" },
              }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
