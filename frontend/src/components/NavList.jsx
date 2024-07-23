import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { removeCredential } from "../slices/authSlice";
import { setSnackbar } from "../slices/componentsSlice";

const NavList = ({ direction }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  // User Menu
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(
        setSnackbar({
          open: true,
          type: "success",
          message: "Logged out successfully",
        })
      );
      dispatch(removeCredential());
      handleCloseUserMenu();
      navigate("/");
    } catch (error) {
      setSnackbar({ open: true, type: "error", message: error.data.message });
    }
  };

  const profileHandler = () => {};

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: direction || "row",
      }}
    >
      <ListItem key="cart" disablePadding sx={{ width: "auto" }}>
        <ListItemButton component={RouterLink} to={"cart"}>
          <Badge
            badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)}
            color="info"
          >
            <ListItemText primary="Cart" />
          </Badge>
        </ListItemButton>
      </ListItem>
      {userInfo ? (
        <Box>
          <ListItem key="user menu" disablePadding sx={{ width: "auto" }}>
            <ListItemButton onClick={handleOpenUserMenu}>
              <ListItemText primary={userInfo.name} />
            </ListItemButton>
          </ListItem>
          <Menu
            sx={{ mt: 4 }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key="profile" onClick={profileHandler}>
              Profile
            </MenuItem>
            <MenuItem key="logout" onClick={logoutHandler}>
              Log out
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <ListItem key="login" disablePadding sx={{ width: "auto" }}>
          <ListItemButton component={RouterLink} to={"login"}>
            <ListItemText primary="Sign In" />
          </ListItemButton>
        </ListItem>
      )}
    </List>
  );
};

export default NavList;
