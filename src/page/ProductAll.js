import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import productStore from "../store/productStore";

const ProductAll = () => {
  const [query, setQuery] = useSearchParams();
  const name = query.get('name')
  // 처음 로딩하면 상품리스트 불러오기
  const { productList, getProductList } = productStore();
  useEffect(()=>{
    getProductList({name});
  }, [query])
  

  return (
    <Container>
      <Row>
        {productList.map((item) => (
            <Col lg={3} key={item._id}>
              <ProductCard item={item} />
            </Col>
          ))
        }
      </Row>
    </Container>
  );
};

export default ProductAll;
