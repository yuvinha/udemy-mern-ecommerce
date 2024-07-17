import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
} from "@mui/material";

const NavList = ({ direction }) => {
  const { cartItems } = useSelector((state) => state.cart);

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
            color="secondary"
          >
            <ListItemText primary="Cart" />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem key="login" disablePadding sx={{ width: "auto" }}>
        <ListItemButton component={RouterLink} to={"login"}>
          <ListItemText primary="Sign In" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default NavList;
