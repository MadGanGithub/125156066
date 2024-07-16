import { Card, CardContent, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id, cat } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `http://localhost:3001/categories/${cat}/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError(err);
      }
    }
    fetchProduct();
  }, [id, cat]);

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h5">{product.productName}</Typography>
          <Typography variant="body1" color="textSecondary">
            Price: ${product.price}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Rating: {product.rating}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Discount: {product.discount}%
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Availability: {product.availability}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
