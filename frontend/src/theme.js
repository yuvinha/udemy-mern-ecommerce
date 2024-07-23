import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#05AFF2",
    },
    secondary: {
      main: "#F2BC1B",
    },
  },
  typography: {
    fontSize: 16,
    h1: {
      fontSize: "3.8rem",
    },
    h2: {
      fontSize: "3rem",
    },
    h3: {
      fontSize: "2.4rem",
    },
    h4: {
      fontSize: "2rem",
    },
    h5: {
      fontSize: "1.6rem",
    },
    h6: {
      fontSize: "1.2rem",
    },
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    subtitle1: {
      fontSize: "1rem",
    },
    subtitle2: {
      fontSize: "0.875rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
    button: {
      fontSize: "0.875rem",
    },
    caption: {
      fontSize: "0.75rem",
    },
    overline: {
      fontSize: "0.625rem",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          textTransform: "capitalize",
        },
        containedPrimary: {
          color: "#fff",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: "12px 24px",
        },
      },
    },
  },
});

export default theme;
