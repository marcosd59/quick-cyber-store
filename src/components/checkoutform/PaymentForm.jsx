import React from "react";
import Review from "./Review";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button, CircularProgress, Divider, Typography } from "@mui/material";
import {
  actionTypes,
  getBasketTotal,
  getProductItems,
  getPorductsNames,
  getShippingData,
} from "../../reducer";
import { useStateValue } from "../../StateProvider";
import accounting from "accounting";
import axios from "axios";
// import { set } from "firebase/database";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "#212F77",
      color: "#212F77",
      fontSize: "16px",
      "::placeholder": {
        color: "#212F77",
      },
    },
    invalid: {
      color: "#9e2146",
      ":focus": {
        color: "#fa755a",
      },
    },
  },
};

const CheckoutForm = ({ backStep, nextStep }) => {
  const [{ basket, shippingData }, dispatch] = useStateValue();
  const [loading, setLoading] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);
    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout",
          {
            id,
            amount: getBasketTotal(basket) * 100,
            items: getProductItems(basket),
            names: getPorductsNames(basket),
            shippingData: getShippingData(shippingData),
          }
        );
        dispatch({
          type: actionTypes.SET_PAYMENT_MESSAGE,
          paymentMessage: data.message,
        });
        if (data.message === "Payment successful") {
          dispatch({
            type: actionTypes.EMPTY_BASKET,
            basket: [],
          });
        }
        elements.getElement(CardElement).clear();
        nextStep();
      } catch (error) {
        console.log(error);
        nextStep();
      }
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Button variant="outlined" onClick={backStep}>
            Back
          </Button>
          <Button
            disabled={false}
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#212F77",
              ":hover": { backgroundColor: "#800080", color: "#FFF" },
            }}
          >
            {loading ? (
              <CircularProgress
                sx={{
                  color: "#EBC446",
                }}
              />
            ) : (
              "Pay " + accounting.formatMoney(getBasketTotal(basket)) + "$ MXN"
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

const PaymentForm = ({ backStep, nextStep }) => {
  return (
    <>
      <Review />
      <Divider />
      <Typography variant="h6" gutterBottom sx={{ marginTop: "1rem" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <CheckoutForm backStep={backStep} nextStep={nextStep} />
      </Elements>
    </>
  );
};

export default PaymentForm;
