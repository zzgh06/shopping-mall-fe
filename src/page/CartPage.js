import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import cartStore from "../store/cartStore";
import CartProductCard from "../component/CartProductCard";
import OrderReceipt from "../component/OrderReceipt";
import "../style/cart.style.css";
import userStore from "../store/userStore";

const CartPage = () => {
  const { user, tokenLogin } = userStore(); 
  const {
    getCartList,
    cartList,
    deleteCartItem,
    updateQty,
    selectedItems,
    selectItem,
  } = cartStore();

  useEffect(() => {
    tokenLogin();
    getCartList();
  }, []);

  // 할인율 계산 함수
  const calculateDiscountRate = (userLevel, totalPurchases) => {
    let discountRate = 0.03; 
    if (userLevel === "gold") {
      discountRate = 0.1;
    } else if (userLevel === "silver") {
      discountRate = 0.07;
    } else if (userLevel === "bronze") {
      discountRate = 0.05;
    }
    // 총 구매 금액에 따른 할인율 추가 계산
    if (totalPurchases > 1000000) {
      discountRate += 0.02;
    } else if (totalPurchases > 500000) {
      discountRate += 0.01;
    }
    return discountRate;
  };
  const selectedCartItems = cartList.filter((item) =>
    selectedItems.includes(item._id)
  );
  const totalPrice = selectedCartItems.reduce(
    (total, item) => total + item.productId.price * item.qty,
    0
  );

  // 할인된 가격 계산
  const discountRate = user ? calculateDiscountRate(user.level, user.totalPurchases) : 0;
  const discountedPrice = totalPrice * (1 - discountRate);

  return (
    <Container>
      <Row>
        {cartList && cartList.length > 0 ? (
          <>
            <Col xs={12} md={7}>
              {cartList.map((item) => (
                <CartProductCard
                  item={item}
                  deleteCartItem={deleteCartItem}
                  getCartList={getCartList}
                  updateQty={updateQty}
                  selectedItems={selectedItems}
                  selectItem={selectItem}
                  key={item._id}
                />
              ))}
            </Col>
            <Col xs={12} md={5}>
              <OrderReceipt
                selectedCartItems={selectedCartItems}
                totalPrice={totalPrice}
                discountedPrice={discountedPrice}
              />
            </Col>
          </>
        ) : (
          <>
            <Col xs={12} md={7}>
              <div className="text-align-center empty-bag">
                <h2>카트가 비어있습니다.</h2>
                <div>상품을 담아주세요!</div>
              </div>
            </Col>
            <Col xs={12} md={5}>
              <OrderReceipt
                selectedCartItems={selectedCartItems}
                totalPrice={totalPrice}
                discountedPrice={discountedPrice}
              />
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default CartPage;
