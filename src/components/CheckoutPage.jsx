import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CheckoutCard from "./CheckoutCard";
import Button from "@mui/joy/Button";
import "../stylesheets/ProductCard.css";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
import Checkout from "./checkoutform/Checkout";

const TitleGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
}));

// const ProductsGrid = styled(Grid)(({ theme }) => ({
//   padding: theme.spacing(2),
//   textAlign: "center",
// }));

const TotalGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
}));

const Item = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "left",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default function CheckoutPage() {
  const calculateTotalPrice = () => {
    const totalPrice = basket?.reduce(
      (total, product) => total + product.price,
      0
    );
    return totalPrice.toFixed(2); // Redondear a 2 decimales
  };

  const [{ basket }] = useStateValue();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <TitleGrid item xs={12}>
          {/* Primer Grid con el título "Shopping Cart" */}
          <Typography
            variant="h4"
            style={{
              fontFamily: "sans-serif",
              color: (theme) => theme.palette.text.primary,
              fontSize: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "25px",
            }}
          >
            Shopping Cart
          </Typography>
        </TitleGrid>
        {/* Segundo Grid con los productos */}

        {basket?.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Item>
              <CheckoutCard product={product} />
            </Item>
          </Grid>
        ))}

        {/* Tercer Grid con el Total */}
        <TotalGrid item xs={12}>
          <Link to="/Checkout">
            {" "}
            {Checkout}
            <Button
              variant="solid"
              color="success"
              size="lg"
              style={{
                fontSize: "24px",
              }}
            >
              Total: ${calculateTotalPrice()} MXN
            </Button>
          </Link>
        </TotalGrid>
      </Grid>
    </Box>
  );
}
