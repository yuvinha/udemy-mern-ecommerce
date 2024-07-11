import React from "react";
import { Outlet } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <main>
          <Container>
            <Outlet />
          </Container>
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
