import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
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
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductDetailsQuery(productId);

  // Qty input
  const [qty, setQty] = useState(1);
  const handleChange = (e) => setQty(e.target.value);

  // Add To Cart Button
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  if (isError) return <div>{error.data.message}</div>;
  if (isLoading)
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pb: 24,
        }}
      >
        <CircularProgress color="primary" size={48} thickness={4} />
      </Box>
    );

  return (
    <>
      <Button
        variant="text"
        size="large"
        color="inherit"
        startIcon={<ArrowBack />}
        component={RouterLink}
        to="/"
        sx={{ mb: 4 }}
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
        <Grid item md={3} sx={{ width: "100%" }}>
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
                      color:
                        product.countInStock > 0
                          ? "success.main"
                          : "text.disabled",
                    }}
                  >
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Typography>
                </ListItem>
                {product.countInStock > 0 && (
                  <ListItem alignItems="center">
                    <FormControl
                      fullWidth
                      sx={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <InputLabel
                        id="qty-label"
                        shrink={false}
                        sx={{
                          position: "relative",
                          top: "auto",
                          left: "auto",
                          transform: "none",
                          flexGrow: 1,
                          color: "text.primary",
                        }}
                      >
                        Qty:
                      </InputLabel>
                      <Select
                        labelId="qty-label"
                        id="qty"
                        value={qty}
                        onChange={handleChange}
                        size="small"
                        sx={{ minWidth: 80 }}
                      >
                        {[...Array(product.countInStock).keys()].map((el) => (
                          <MenuItem key={el + 1} value={el + 1}>
                            {el + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </ListItem>
                )}
              </List>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={product.countInStock > 0 ? false : true}
                onClick={addToCartHandler}
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
