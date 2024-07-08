import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Button,
  Toolbar,
  Box,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Link,
  Drawer,
  IconButton,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import logo from "../assets/logo.png";

const drawerWidth = 240;
const navItems = [
  { display: "Cart", url: "cart" },
  {
    display: "Sign in",
    url: "login",
  },
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const DrawerList = (
    <Box onClick={handleDrawerToggle}>
      <List>
        {navItems.map(({ display, url }) => (
          <ListItem key={url} disablePadding>
            <ListItemButton component={RouterLink} to={url}>
              <ListItemText primary={display} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar component="nav" position="static">
        <Toolbar>
          <Link
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 1 }}
          >
            <Box component="img" sx={{ height: 40 }} alt="Logo" src={logo} />
            <Typography
              variant="h6"
              noWrap
              to="/"
              sx={{ color: "primary.contrastText" }}
            >
              Proshop
            </Typography>
          </Link>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            {navItems.map(({ display, url }) => (
              <Button component={RouterLink} key={url} color="inherit" to={url}>
                {display}
              </Button>
            ))}
          </Stack>
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
};
export default Header;
