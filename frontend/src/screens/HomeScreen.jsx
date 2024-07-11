import { Grid, Typography } from "@mui/material";
import Product from "../components/Product";
import products from "../products";

const HomeScreen = () => {
  return (
    <>
      <Typography component="h1" variant="h3" sx={{ my: 4 }}>
        Latest Products
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3, lg: 4 }}>
        {products.map((product) => (
          <Grid item key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default HomeScreen;
