import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";

const ProductAll = () => {
  // 처음 로딩하면 상품리스트 불러오기

  return (
    <Container>
      <Row>
        <Col md={3} sm={12}>
          <ProductCard />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductAll;
