import React from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import cartStore from "../store/cartStore";
import CartProductCard from "../component/CartProductCard";
import OrderReceipt from "../component/OrderReceipt";
import "../style/cart.style.css";

const CartPage = () => {
  const { loading, getCartList, cartList, totalPrice, deleteCartItem, updateQty} = cartStore();
  console.log('ccc', cartList)
  useEffect(() => {
    //카트리스트 불러오기
    getCartList();
  }, []);

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
                  key={item._id}
                />
              ))}
            </Col>
            <Col xs={12} md={5}>
              <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
            </Col>
          </>
        ) : (
          <Col xs={12} md={7}>
            <div className="text-align-center empty-bag">
              <h2>카트가 비어있습니다.</h2>
              <div>상품을 담아주세요!</div>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CartPage;
