import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CheckoutCard from "./CheckoutCard";
import Button from "@mui/joy/Button";
import productos from "../product-data";
import "../stylesheets/ProductCard.css";

const TitleGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
}));

const ProductsGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
}));

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
    // Función para calcular el precio total de los productos
    return productos.reduce((total, product) => total + product.price, 0);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Primer Grid con el título "Shopping Cart" */}
          <Typography
            variant="h4"
            style={{
              fontFamily: "Arial, sans-serif",
              color: "black",
              fontSize: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "50px",
              paddingLeft: "50px",
              paddingRight: "auto",
            }}
          >
            Shopping Cart
          </Typography>
        </Grid>
        {/* Segundo Grid con los productos */}

        {productos.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Item>
              <CheckoutCard product={product} />
            </Item>
          </Grid>
        ))}

        {/* Tercer Grid con el Total */}
        <TotalGrid item xs={12}>
          <Button variant="solid" color="success" size="lg">
            Total: {calculateTotalPrice()} MXN
          </Button>
        </TotalGrid>
      </Grid>
    </Box>
  );
}
