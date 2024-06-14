import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import productStore from "../store/productStore";
import userStore from "../store/userStore";

const ProductAll = () => {

  const [query, setQuery] = useSearchParams();
  const name = query.get("name");
  // 처음 로딩하면 상품리스트 불러오기
  const { productList, getProductList, toggleLikeProduct } = productStore();
  const { user, likedProducts, fetchUserData } = userStore();
  useEffect(() => {
    getProductList({ name });
  }, [query, name, likedProducts, user]);

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Container>
        <Row>
          {productList && productList.length > 0 ? (
            productList?.map((item) => (
              <Col lg={3} key={item._id}>
                <ProductCard
                  item={item}
                  isLiked={likedProducts.includes(item._id)}
                  toggleLikeProduct={toggleLikeProduct}
                  getProductList={getProductList}
                />
              </Col>
            ))
          ) : (
            <div className="loading-container">
              <div style={{ fontSize: "25px" }}>
                죄송합니다, 검색어와 일치하는 상품이 없습니다. 😅
              </div>
            </div>
          )}
        </Row>
      </Container>
  );
};

export default ProductAll;
