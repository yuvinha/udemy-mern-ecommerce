import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Alert,
  AlertTitle,
  Link,
  Button,
  IconButton,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CardHeader,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Change Qty
  const addToCartHandler = async (product, qty) =>
    dispatch(addToCart({ ...product, qty }));

  // Delete an item
  const removeHandler = async (productId) =>
    dispatch(removeFromCart(productId));

  // Proceed to Checkout
  const checkoutHandler = () => navigate("/login?redirect=/shipping");

  return (
    <>
      <Typography component="h1" variant="h3" sx={{ my: 4 }}>
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Alert severity="info">
          <AlertTitle>Cart is empty</AlertTitle>
          You don't have any products in your shopping cart yet. Please{" "}
          <Link component={RouterLink} to="/" sx={{ fontWeight: "bold" }}>
            Go home{" "}
          </Link>
          and add products to your cart.
        </Alert>
      ) : (
        <Grid container spacing={4}>
          <Grid item md={8}>
            <List>
              {cartItems.map((item) => (
                <ListItem key={item._id} sx={{ gap: 3, py: 3 }} divider>
                  <Grid item md={2}>
                    <Box
                      component="img"
                      sx={{
                        width: "100%",
                        borderRadius: 2,
                      }}
                      alt={item.name}
                      src={item.image}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <ListItemText>
                      <Link
                        component={RouterLink}
                        to={`/product/${item._id}`}
                        sx={{
                          color: "text.primary",
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {item.name}
                      </Link>
                    </ListItemText>
                  </Grid>
                  <Grid item md={2}>
                    <Typography variant="body1">${item.price}</Typography>
                  </Grid>
                  <Grid item md={2}>
                    <FormControl>
                      <InputLabel id="qty-label">Qty</InputLabel>
                      <Select
                        labelId="qty-label"
                        id="qty"
                        label="Qty"
                        value={item.qty}
                        onChange={(event) =>
                          addToCartHandler(item, Number(event.target.value))
                        }
                        size="small"
                        sx={{ minWidth: 80 }}
                      >
                        {[...Array(item.countInStock).keys()].map((el) => (
                          <MenuItem key={el + 1} value={el + 1}>
                            {el + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <IconButton
                    size="small"
                    aria-label="delete an item"
                    onClick={() => removeHandler(item._id)}
                  >
                    <DeleteOutline />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item md={4}>
            <Card variant="outlined">
              <CardHeader
                title="Subtotal"
                subheader={`${cartItems.reduce(
                  (acc, item) => acc + item.qty,
                  0
                )} items`}
                titleTypographyProps={{ fontSize: theme.typography.h6 }}
                subheaderTypographyProps={{ fontSize: theme.typography.body2 }}
              ></CardHeader>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  ${" "}
                  {cartItems.reduce(
                    (acc, item) => acc + item.qty * item.price,
                    0
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  $ {cart.taxPrice} tax will be added
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default Cart;
