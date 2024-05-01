import { List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { getBasketTotal } from "../../reducer";
import accounting from "accounting";
import { useStateValue } from "../../StateProvider";

const Review = () => {
  const [{ basket }] = useStateValue();
  return (
    <>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ paddingTop: "2rem", fontWeight: 450 }}
      >
        Order summary
      </Typography>
      <List disablePadding>
        {basket?.map((product) => (
          <ListItem key={product.name}>
            <ListItemText primary={product.name} secondary={`Cantidad: ${1}`} />

            <Typography variant="body2">
              {accounting.formatMoney(product.price, "$")}
            </Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {accounting.formatMoney(getBasketTotal(basket), "$")}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
