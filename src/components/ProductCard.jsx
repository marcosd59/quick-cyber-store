import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import "../stylesheets/ProductCard.css";
import StarIcon from "@mui/icons-material/Star";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
import uuid from "react-uuid";

export default function ProductCard({
  product: { id, name, price, rating, stock, description, image },
}) {
  const starIcons = Array(Math.floor(rating)).fill(<StarIcon />);

  const [{ basket }, dispatch] = useStateValue();
  const [availableStock, setAvailableStock] = React.useState(stock);

  const addToBasket = () => {
    if (availableStock > 0) {
      dispatch({
        type: actionTypes.ADD_TO_BASKET,
        item: {
          id: uuid(),
          name,
          image,
          price,
          rating,
          stock: availableStock - 1,
          description,
        },
      });
      setAvailableStock((prevStock) => prevStock - 1); // Actualizamos el stock en el estado local
      console.log(availableStock);
    }
  };

  return (
    <Card
      sx={{
        width: 320,
        maxWidth: "100%",
        boxShadow: "lg",
        minHeight: "450px",
        border: "2px solid white",
        // backgroundColor: "blueGray.50",
      }}
    >
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img src={image} loading="lazy" alt="Imagen del producto" />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="body-xs">QuickCyber</Typography>
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
        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: "xl" }}
          endDecorator={
            <Chip component="span" size="sm" variant="soft" color="success">
              Lowest price
            </Chip>
          }
        >
          ${price} MXN
        </Typography>
        <div className="stars-container">
          {starIcons.map((star, i) => (
            <div key={i} className="star">
              {star}
            </div>
          ))}
        </div>
        <Typography level="body-sm">
          (Only <b>{availableStock}</b> left in stock!)
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button
          variant="solid"
          size="lg"
          onClick={addToBasket}
          sx={{
            backgroundColor: "#212F77",
            color: "white",
            "&:hover": {
              backgroundColor: "darken(#212F77, 0.5)",
            },
          }}
        >
          Add to cart
        </Button>
      </CardOverflow>
    </Card>
  );
}
