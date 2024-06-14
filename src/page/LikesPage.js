import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import productStore from "../store/productStore";
import userStore from "../store/userStore";

const LikesPage = () => {
  const { productList, getProductList, toggleLikeProduct } = productStore();
  const { user, likedProducts, fetchUserData } = userStore();
  useEffect(() => {
    getProductList();
  }, [likedProducts, user]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const likedProductList = productList.filter(product =>
    user?.likedProducts?.includes(product._id)
  );
  return (
    <Container>
      <Row>
        {likedProductList && likedProductList.length > 0 ? (
          likedProductList?.map((item) => (
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
              좋아요한 상품이 없습니다. 😅
            </div>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default LikesPage;
