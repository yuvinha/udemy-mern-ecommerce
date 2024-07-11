import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
} from "@mui/material";

const Product = ({ product }) => {
  return (
    <Card variant="outlined">
      <CardActionArea component={RouterLink} to={`/product/${product._id}`}>
        <CardMedia
          sx={{ height: 200 }}
          image={product.image}
          title={product.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Rating
              name="read-only"
              precision={0.5}
              value={product.rating}
              readOnly
            />
            <Typography
              variant="body2"
              color="text.secondary"
            >{`${product.numReviews} reviews`}</Typography>
          </Box>
          <Typography variant="body1" color="text.primary">
            € {product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default Product;
