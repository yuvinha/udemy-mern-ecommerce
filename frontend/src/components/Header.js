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
  Drawer,
  IconButton,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

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
          <Typography
            variant="h6"
            component="a"
            href=""
            sx={{
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Proshop
          </Typography>
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
