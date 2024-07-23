import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { setSnackbar } from "../slices/componentsSlice";

const CustomizedSnackbar = () => {
  const dispatch = useDispatch();
  const { snackbar } = useSelector((state) => state.components);
  const { open, type, message } = snackbar;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setSnackbar({ open: false, type: "", message: "" }));
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      onClose={handleClose}
      autoHideDuration={3000}
    >
      <Alert onClose={handleClose} severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
export default CustomizedSnackbar;
