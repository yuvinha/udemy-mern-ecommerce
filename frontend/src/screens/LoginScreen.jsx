import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useLoginMutation } from "../slices/usersApiSlice";
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

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
      email: "",
      password: "",
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredential(res));
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
        Sign In
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
          type="email"
          label="Email"
          placeholder="Enter email"
          error={errors.email ? true : false}
          helperText={errors.email?.message}
          {...register("email", {
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
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
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
            Sign in
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
          <Typography variant="body1">New customer?</Typography>
          <Link
            component={RouterLink}
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            sx={{
              color: "primary",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Register
          </Link>
        </Stack>
      </Box>
      {/* <DevTool control={control} /> */}
    </>
  );
};
export default LoginScreen;
