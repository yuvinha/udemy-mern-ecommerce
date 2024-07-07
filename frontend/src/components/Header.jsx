import { useState } from "react";
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
const navItems = ["Cart", "Sign in"];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const DrawerList = (
    <Box onClick={handleDrawerToggle}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemText primary={item} />
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
            href="/"
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 1 }}
          >
            <Box component="img" sx={{ height: 40 }} alt="Logo" src={logo} />
            <Typography
              variant="h6"
              component="a"
              href=""
              sx={{ color: "primary.contrastText", textDecoration: "none" }}
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
            {navItems.map((item) => (
              <Button color="inherit">{item}</Button>
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
