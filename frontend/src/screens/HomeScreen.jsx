import { Grid, Typography, Skeleton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../components/Product";

const HomeScreen = () => {
  const theme = useTheme();
  const { data: products, isLoading, isError, error } = useGetProductsQuery();

  if (isError) return <div>{error.data.message}</div>;
  // if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <Typography component="h1" variant="h3" sx={{ my: 4 }}>
        Latest Products
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3, lg: 4 }}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Grid item key={index} sm={12} md={6} lg={4} width="100%">
                <Stack>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: 0,
                      overflow: "hidden",
                      paddingTop: "56.25%",
                      position: "relative",
                    }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: theme.typography.h4, width: "75%" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: theme.typography.body1 }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: theme.typography.body1, width: "25%" }}
                  />
                </Stack>
              </Grid>
            ))
          : products.map((product) => (
              <Grid item key={product._id} sm={12} md={6} lg={4} width="100%">
                <Product product={product} />
              </Grid>
            ))}
      </Grid>
    </>
  );
};
export default HomeScreen;

/**
Material UI Skeleton scaling within a variable height grid row
https://stackoverflow.com/questions/59461615/a-good-way-to-handle-material-ui-skeleton-scaling-within-a-variable-height-grid
 */
