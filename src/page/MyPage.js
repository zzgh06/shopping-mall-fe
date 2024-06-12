import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";
import orderStore from "../store/orderStore";

const MyPage = () => {
  const { getOrderList, orderList } = orderStore();
  //오더리스트 들고오기
  useEffect(() => {
    getOrderList();
  }, []);
  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  if (orderList?.length === 0) {
    return (
      <Container className="status-card-container">
        <div>주문하신 상품이 없습니다</div>
      </Container>
    );
  }
  return (
    <Container className="status-card-container">
      {orderList?.map((item)=>(
        <OrderStatusCard item={item} key={item._id}/>
      ))}
    </Container>
  );
};

export default MyPage;
