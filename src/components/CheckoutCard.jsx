import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import "../stylesheets/ProductCard.css";
import StarIcon from "@mui/icons-material/Star";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

export default function CheckoutCard({
  product: { id, name, price, rating, stock, description, image },
}) {
  const starIcons = Array(Math.floor(rating)).fill(<StarIcon />);
  const [{ basket }, dispatch] = useStateValue();
  const removeItem = () =>
    dispatch({ type: actionTypes.REMOVE_FROM_BASKET, id });

  return (
    <Card
      sx={{ width: 320, maxWidth: "100%", boxShadow: "lg", minHeight: "400px" }}
    >
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img src={image} loading="lazy" alt="Imagen del producto" />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Link
          href="#product-card"
          fontWeight="md"
          color="neutral"
          textColor="text.primary"
          overlay
          endDecorator={<ArrowOutwardIcon />}
        >
          {name}
        </Link>
        <Typography level="title-lg" sx={{ mt: 1, fontWeight: "xl" }}>
          ${price} MXN
        </Typography>
        <div className="stars-container">
          {starIcons.map((star, i) => (
            <div key={i} className="star">
              {star}
            </div>
          ))}
        </div>
      </CardContent>
      <CardOverflow>
        <Button variant="solid" color="danger" size="lg" onClick={removeItem}>
          Delete
        </Button>
      </CardOverflow>
    </Card>
  );
}
