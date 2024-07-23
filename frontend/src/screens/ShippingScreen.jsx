import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { saveShippingAddress } from "../slices/cartSlice";
import { Box, TextField, Typography, Button } from "@mui/material";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      streetAddress: shippingAddress?.streetAddress || "",
      city: shippingAddress?.city || "",
      postalCode: shippingAddress?.postalCode || "",
      country: shippingAddress?.country || "",
    },
  });
  const { register: formRegister, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data) => {
    dispatch(saveShippingAddress(data));
    navigate("/payment");
  };

  return (
    <>
      <Typography component="h1" variant="h3" sx={{ my: 4 }} align="center">
        Shipping
      </Typography>
      <Box
        component="form"
        noValidate
        // autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
          maxWidth: 600,
          marginX: "auto",
        }}
      >
        <TextField
          type="text"
          label="Street Address"
          placeholder="Enter street address"
          error={errors.streetAddress ? true : false}
          helperText={errors.streetAddress?.message}
          {...formRegister("streetAddress", {
            required: "Street address is required",
          })}
        />
        <TextField
          type="text"
          label="City"
          placeholder="Enter city"
          error={errors.city ? true : false}
          helperText={errors.city?.message}
          {...formRegister("city", {
            required: "City is required",
          })}
        />
        <TextField
          type="text"
          label="Postal code"
          placeholder="Enter postal code"
          error={errors.postalCode ? true : false}
          helperText={errors.postalCode?.message}
          {...formRegister("postalCode", {
            required: "Postal code is required",
          })}
        />
        <TextField
          type="text"
          label="Country"
          placeholder="Enter coutry"
          error={errors.country ? true : false}
          helperText={errors.country?.message}
          {...formRegister("country", {
            required: "Country is required",
          })}
        />
        <Box sx={{ position: "relative" }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            sx={{ py: 1.5 }}
            fullWidth
          >
            Proceed to Payment
          </Button>
        </Box>
      </Box>
      {/* <DevTool control={control} /> */}
    </>
  );
};
export default ShippingScreen;
