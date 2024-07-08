import React from "react";
import { Outlet } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
