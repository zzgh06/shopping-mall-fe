import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import productStore from "../store/productStore";

const ProductAll = () => {
  const [query, setQuery] = useSearchParams();
  const name = query.get('name');
  // 처음 로딩하면 상품리스트 불러오기
  const { loading, productList, getProductList } = productStore();
  useEffect(() => {
    getProductList({ name });
  }, [query, name]);

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <RotatingLines
            visible={true}
            height="150"
            width="150"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <Container>
          <Row>
            {productList && productList.length > 0 ? (
              productList.map((item) => (
                <Col lg={3} key={item._id}>
                  <ProductCard item={item} />
                </Col>
              ))
            ) : (
              <div className="loading-container">
                <div style={{fontSize : '25px'}}>죄송합니다, 검색어와 일치하는 상품이 없습니다. 😅</div>
              </div>
            )}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default ProductAll;
