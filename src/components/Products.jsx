import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";

const Item = styled(ProductCard)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
}));

export default function Products() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <ProductCard />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <ProductCard />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <ProductCard />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <ProductCard />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <ProductCard />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <ProductCard />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <ProductCard />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Item>
            <ProductCard />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
