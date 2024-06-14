import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";

const OrderStatusCard = ({ item }) => {
  return (
    <div>
      <Row className="status-card">
        <Col xs={2}>
          <img
            src={item?.items[0].productId?.images[0]}
            alt=""
            height={96}
          />
        </Col>
        <Col xs={8} className="order-info">
          <div>
            <strong>주문번호: {item.orderNum}</strong>
          </div>

          <div className="text-12">주문일자: {item.createdAt.slice(0, 10)}</div>

          <div>
            {item.items[0].productId?.name}
            {item.items?.length > 1 ? (
              <span>외 {item.items?.length - 1}개</span>
            ) : (
              ""
            )}
          </div>
          <div>₩ {currencyFormat(item.totalPrice)}</div>
        </Col>
        <Col md={2} className="vertical-middle">
          <div className="text-align-center text-12">주문상태</div>
          <Badge bg={badgeBg[item.status]}>{item.status}</Badge>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
