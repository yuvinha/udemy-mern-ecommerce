import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  Typography,
  Link,
  Drawer,
  IconButton,
} from "@mui/material";
import { Storefront, Menu } from "@mui/icons-material";
import NavList from "./NavList";

const drawerWidth = 240;

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const DrawerList = (
    <Box onClick={handleDrawerToggle}>
      <NavList direction="column" />
    </Box>
  );

  return (
    <>
      <AppBar
        component="nav"
        position="static"
        sx={{ boxShadow: "none", background: "none" }}
      >
        <Toolbar>
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 1 }}
          >
            <Storefront />
            <Typography variant="h6" noWrap to="/" color="primary">
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
            <NavList />
            {/* {navItems.map(({ display, url }) => (
              <Button
                component={RouterLink}
                key={url}
                color="inherit"
                size="large"
                to={url}
              >
                {display}
              </Button>
            ))} */}
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
