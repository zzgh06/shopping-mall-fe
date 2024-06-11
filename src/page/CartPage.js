import React from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import cartStore from "../store/cartStore";
import CartProductCard from "../component/CartProductCard";
import OrderReceipt from "../component/OrderReceipt";
import "../style/cart.style.css";

const CartPage = () => {
  const {
    getCartList,
    cartList,
    deleteCartItem,
    updateQty,
    selectedItems,
    selectItem,
  } = cartStore();

  useEffect(() => {
    getCartList();
  }, []);

  // 선택된 상품의 정보와 총가격 orderReceipt에 전달
  const selectedCartItems = cartList.filter(item => selectedItems.includes(item._id));
  const totalPrice = selectedCartItems.reduce((total, item) => total + item.productId.price * item.qty, 0);
  
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
              <OrderReceipt selectedCartItems={selectedCartItems} totalPrice={totalPrice} />
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
              <OrderReceipt selectedCartItems={selectedCartItems} totalPrice={totalPrice} />
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default CartPage;
