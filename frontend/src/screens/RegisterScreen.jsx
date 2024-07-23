import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredential } from "../slices/authSlice";
import { setSnackbar } from "../slices/componentsSlice";
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Link,
  CircularProgress,
} from "@mui/material";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // URL redirection
  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);
  const redirect = searchParam.get("redirect") || "/";

  // Check if a user is logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const {
    register: formRegister,
    control,
    watch,
    handleSubmit,
    formState,
  } = form;
  const { errors } = formState;
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const res = await register(data).unwrap();
      dispatch(setCredential(res));
      dispatch(
        setSnackbar({
          open: true,
          type: "success",
          message: "Account created successfully!",
        })
      );
      navigate(redirect);
    } catch (error) {
      dispatch(
        setSnackbar({ open: true, type: "error", message: error.data.message })
      );
    }
  };

  return (
    <>
      <Typography component="h1" variant="h3" sx={{ my: 8 }} align="center">
        Sign Up
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
          maxWidth: 400,
          marginX: "auto",
        }}
      >
        <TextField
          type="text"
          label="Name"
          placeholder="Enter name"
          error={errors.name ? true : false}
          helperText={errors.name?.message}
          {...formRegister("name", {
            required: "Name is required",
          })}
        />
        <TextField
          type="email"
          label="Email"
          placeholder="Enter email"
          error={errors.email ? true : false}
          helperText={errors.email?.message}
          {...formRegister("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
        />
        <TextField
          type="password"
          label="Password"
          placeholder="Enter password"
          error={errors.password ? true : false}
          helperText={errors.password?.message}
          {...formRegister("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
          })}
        />
        <TextField
          type="password"
          label="Confirm Password"
          placeholder="Enter password again"
          error={errors.confirmPassword ? true : false}
          helperText={errors.confirmPassword?.message}
          {...formRegister("confirmPassword", {
            required: "Password is required",
            validate: (value) =>
              value === password || "The passwords do not match",
          })}
        />
        <Box sx={{ position: "relative" }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            sx={{ py: 1.5 }}
            disabled={isLoading}
            fullWidth
          >
            Sign up
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: "primary",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-6px",
                marginLeft: "-6px",
              }}
            />
          )}
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1">Already have an account?</Typography>
          <Link
            component={RouterLink}
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            sx={{
              color: "primary",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Sign in
          </Link>
        </Stack>
      </Box>
      {/* <DevTool control={control} /> */}
    </>
  );
};
export default RegisterScreen;
