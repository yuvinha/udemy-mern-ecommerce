import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const Product = ({ product }) => {
  console.log(product);
  return (
    <Card>
      <CardMedia
        sx={{ height: 200 }}
        image={product.image}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          € {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default Product;
