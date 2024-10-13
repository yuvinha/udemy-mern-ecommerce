import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Grid } from "@mui/material";
import OrderStepper from "../components/OrderStepper";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.streetAddress) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress.streetAddress, cart.paymentMethod, navigate]);

  return (
    <>
      <OrderStepper activeStep={2} />
      <Typography component="h1" variant="h3" sx={{ my: 4 }} align="center">
        Place Order
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={8}>
          Column
        </Grid>
        <Grid item md={4}>
          Column
        </Grid>
      </Grid>
    </>
  );
};
export default PlaceOrderScreen;
