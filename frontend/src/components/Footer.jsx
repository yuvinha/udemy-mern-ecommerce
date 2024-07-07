import { Box, Stack, Typography } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Typography variant="body1">Proshop &copy; {currentYear}</Typography>
      </Stack>
    </Box>
  );
};
export default Footer;
