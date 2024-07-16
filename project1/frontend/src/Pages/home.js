import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function test() {
      await axios
        .get("http://localhost:3001/all", {
          withCredentials: true,
        })
        .then((response) => {
          setProducts(response.data);
        })
        .catch((err) => {
          setError(err);
        });
    }
    test();
  }, []);

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Link
              to={`/${product.id}/${product.category}`}
              style={{ textDecoration: "none" }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6">{product.productName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Rating: {product.rating}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Discount: {product.discount}%
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Availability: {product.availability}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
