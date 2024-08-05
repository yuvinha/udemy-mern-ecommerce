import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { savePaymentMethod } from "../slices/cartSlice";
import OrderStepper from "../components/OrderStepper";

const PaymentScreen = () => {
  const [value, setValue] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!Object.keys(shippingAddress).length) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const form = useForm({
    defaultValues: {
      paymentMethod: value,
    },
  });

  const {
    register: formRegister,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    dispatch(savePaymentMethod(data));
    navigate("/placeorder");
  };

  const handleChange = (event) => setValue(event.target.value);

  return (
    <>
      <OrderStepper activeStep={1} />
      <Typography component="h1" variant="h3" sx={{ my: 4 }} align="center">
        Payment Method
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
          maxWidth: "fit-content",
          marginX: "auto",
        }}
      >
        <FormControl>
          <FormLabel id="payment-method" sx={{ mb: 1 }}>
            Select payment method
          </FormLabel>
          <RadioGroup
            aria-labelledby="payment-method"
            name="payment-method"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="paypal"
              control={<Radio />}
              label="Paypal"
              {...formRegister("paymentMethod")}
            />
            <FormControlLabel
              value="credit-card"
              control={<Radio />}
              label="Credit Card"
              {...formRegister("paymentMethod")}
            />
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          sx={{ py: 1.5 }}
          fullWidth
        >
          Continue
        </Button>
      </Box>
      {/* <DevTool control={control} /> */}
    </>
  );
};
export default PaymentScreen;
