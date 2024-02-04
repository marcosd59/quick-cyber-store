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

export default function ProductCard({
  product: { name, price, rating, stock, description, image },
}) {
  const starIcons = Array(Math.floor(rating)).fill(<StarIcon />);

  return (
    <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
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
          {price} MXN
        </Typography>
        <div className="stars-container">
          {starIcons.map((star, i) => (
            <div key={i} className="star">
              {star}
            </div>
          ))}
        </div>
        <Typography level="body-sm">
          (Only <b>{stock}</b> left in stock!)
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button variant="solid" color="primary" size="lg">
          Add to cart
        </Button>
      </CardOverflow>
    </Card>
  );
}
