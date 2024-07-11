import { forwardRef } from "react";
import {
  styled,
  createTheme,
  ThemeProvider,
  useThemeProps,
} from "@mui/material/styles";

const theme = createTheme({
  components: {
    // the component name defined in the `name` parameter
    // of the `styled` API
    MuiStat: {
      defaultProps: {
        // variant: "contained",
      },
      styleOverrides: {
        // the slot name defined in the `slot` and `overridesResolver` parameters
        // of the `styled` API
        // root: {
        //   backgroundColor: "#121212",
        // },
        // value: {
        //   color: "#fff",
        // },
        // unit: {
        //   color: "#888",
        // },
      },
    },
  },
});

const StatRoot = styled("div", {
  name: "MuiStat", // The component name
  slot: "root", // The slot name
})(({ theme, ownerState }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  padding: theme.spacing(3, 4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  letterSpacing: "-0.025em",
  fontWeight: 600,
  ...(ownerState.variant === "outlined" && {
    border: `2px solid ${theme.palette.divider}`,
    boxShadow: "none",
    backgroundColor: "#fff",
    color: "#121212",
  }),
}));

const StatValue = styled("div", {
  name: "MuiStat",
  slot: "value",
})(({ theme }) => ({
  ...theme.typography.h3,
}));

const StatUnit = styled("div", {
  name: "MuiStat",
  slot: "unit",
})(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

const Stat = forwardRef((inProps, ref) => {
  const props = useThemeProps({ props: inProps, name: "MuiStat" });
  const { value, unit, variant, ...other } = props;
  const ownerState = { ...props, variant };
  console.log(ownerState);

  return (
    <ThemeProvider theme={theme}>
      <StatRoot ref={ref} ownerState={ownerState} {...other}>
        <StatValue ownerState={ownerState}>{value}</StatValue>
        <StatUnit ownerState={ownerState}>{unit}</StatUnit>
      </StatRoot>
    </ThemeProvider>
  );
});

export default Stat;
