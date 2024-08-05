import { Typography } from "@mui/material";
import OrderStepper from "../components/OrderStepper";

const PlaceOrderScreen = () => {
  return (
    <>
      <OrderStepper activeStep={2} />
      <Typography component="h1" variant="h3" sx={{ my: 4 }} align="center">
        Place Order
      </Typography>
    </>
  );
};
export default PlaceOrderScreen;
