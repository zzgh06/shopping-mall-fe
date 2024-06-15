import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ProductCard from "../component/ProductCard";
import productStore from "../store/productStore";

const PantsPage = () => {
  const { getProductList, productList } = productStore();
  useEffect(() => {
    getProductList();
  }, []);

  const pantsProductsList = productList.filter(
    (item) => item.category[0] === "pants"
  );
  return (
    <Container>
      <Row>
        {pantsProductsList?.map((item, i) => (
          <Col md={4} sm={12} key={i}>
            <ProductCard item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PantsPage;
