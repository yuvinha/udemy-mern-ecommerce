import { Grid, Typography } from "@mui/material";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../components/Product";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error.data.message}</div>
      ) : (
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
      )}
    </>
  );
};
export default HomeScreen;
