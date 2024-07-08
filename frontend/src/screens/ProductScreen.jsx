import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Button,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Rating,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import products from "../products";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const product = products.find((item) => item._id === productId);
  const isInStock = product.countInStock > 0;

  return (
    <>
      <Button
        variant="text"
        size="large"
        color="inherit"
        startIcon={<ArrowBack />}
        component={RouterLink}
        to="/"
      >
        Back
      </Button>
      <Grid container spacing={2}>
        <Grid item md={5}>
          <Box
            component="img"
            alt={`${product.name} image`}
            src={product.image}
            sx={{ display: "block", width: "100%" }}
          />
        </Grid>
        <Grid item md={4}>
          <List>
            <ListItem>
              <ListItemText>
                <Typography variant="h5">{product.name}</Typography>
              </ListItemText>
            </ListItem>
            <ListItem alignItems="center" sx={{ gap: 1 }}>
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
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                    sx={{ textTransform: "uppercase" }}
                  >
                    Price
                  </Typography>
                }
                secondary={
                  <Typography variant="h6">${product.price}</Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                    sx={{ textTransform: "uppercase" }}
                  >
                    Description
                  </Typography>
                }
                secondary={
                  <Typography variant="body1">{product.description}</Typography>
                }
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3}>
          <Card variant="outlined">
            <CardContent>
              <List>
                <ListItem alignItems="center" divider>
                  <Typography sx={{ flexGrow: 1 }}>Price:</Typography>
                  <Typography component="strong" sx={{ fontWeight: "bold" }}>
                    {product.price}
                  </Typography>
                </ListItem>
                <ListItem alignItems="center" divider>
                  <Typography sx={{ flexGrow: 1 }}>Status:</Typography>
                  <Typography
                    sx={{
                      color: isInStock ? "success.main" : "text.disabled",
                    }}
                  >
                    {isInStock ? "In Stock" : "Out of Stock"}
                  </Typography>
                </ListItem>
              </List>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                disabled={isInStock ? false : true}
              >
                Add To Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default ProductScreen;
