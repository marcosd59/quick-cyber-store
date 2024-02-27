import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";
import productos from "../product-data";
// import uuid from "react-uuid";

const Item = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "left",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default function Products() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {productos.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Item>
              <ProductCard product={product} />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
