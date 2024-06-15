import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ProductCard from "../component/ProductCard";
import productStore from "../store/productStore";
import userStore from "../store/userStore";

const TopPage = () => {
  const { productList, getProductList, toggleLikeProduct } = productStore();
  const { user, likedProducts, fetchUserData } = userStore();
  
  useEffect(() => {
    getProductList();
  }, [likedProducts, user]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const topProductsList = productList.filter(
    (item) => item.category[0] === "top"
  );
  return (
    <Container>
      <Row>
        {topProductsList.length > 0 ? (
          topProductsList.map((item) => (
            <Col md={4} sm={12} key={item._id}>
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
              상품을 준비 중에 있습니다. 😅
            </div>
          </div>
        )}
      </Row>
    </Container>
  )
}

export default TopPage