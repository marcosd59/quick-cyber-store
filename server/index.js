const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
require("dotenv").config();

const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

const app = express();

app.use(cors({ origin: "https://quick-cyber-store.netlify.app/" }));
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  console.log(req.body);
  const { id, amount, items, names, shippingData } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "MXN",
      description: `Purchase of ${names} with ${items} items. Shipping to ${shippingData}`,
      payment_method: id,
      confirm: true,
      payment_method_types: ["card"],
      return_url: "https://quick-cyber-store.netlify.app/payment-success",
    });
    console.log(payment);
    return res.status(200).json({ message: "Payment successful" });
  } catch (error) {
    return res.json({ message: error.raw.message });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
