import { Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useState } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Confirmation from "./Confirmation";
import { useStateValue } from "../../StateProvider";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [{ paymentMessage }] = useStateValue();
  const steps = ["Shipping Address", "Payment Details"];
  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const backStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const Form = () => {
    return activeStep === 0 ? (
      <AddressForm nextStep={nextStep} />
    ) : (
      <PaymentForm nextStep={nextStep} backStep={backStep} />
    );
  };

  return (
    <>
      <main
        sx={{
          width: "auto",
          marginLeft: 2,
          marginRight: 2,
          "@media (min-width:600px)": {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
          },
        }}
      >
        <Paper
          elevation={6}
          sx={{
            marginTop: 6,
            marginBottom: 3,
            marginLeft: 2,
            marginRight: 2,
            padding: 2,
            "@media (min-width:600px)": {
              marginTop: 10,
              marginBottom: 6,
              marginLeft: 12,
              marginRight: 12,
              padding: 3,
            },
          }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper
            activeStep={activeStep}
            sx={{
              stepper: {
                padding: `${3 * 8}px ${0 * 8}px ${5 * 8}px`,
              },
            }}
          >
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step} </StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation message={paymentMessage} />
          ) : (
            <Form step={activeStep} />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
