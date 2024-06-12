import React, { useEffect, useState } from "react";
import { Form, Modal, Button, Col, Table } from "react-bootstrap";

import "../style/adminOrder.style.css";
import { ORDER_STATUS } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";
import orderStore from "../store/orderStore";

const OrderDetailDialog = ({ open, handleClose, searchQuery }) => {
  const { selectedOrder, updateOrder, getOrderList } = orderStore();
  const [orderStatus, setOrderStatus] = useState(selectedOrder.status);

  // status 변경 ["preparing", "shipping", "delivered", "refund"];
  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };

  const submitStatus = async (event) => {
    event.preventDefault();
    await updateOrder(selectedOrder._id, orderStatus);
    await getOrderList(searchQuery);
    handleClose();
  };

  if (!selectedOrder) {
    return <></>;
  }
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>예약번호: {selectedOrder.orderNum}</p>
        <p>주문날짜: {selectedOrder.createdAt.slice(0, 10)}</p>
        <p>이메일: {selectedOrder.userId.email}</p>
        <p>
          주소:{selectedOrder.shipTo.address + " " + selectedOrder.shipTo.city}
        </p>
        <p>
          연락처:
          {`${
            selectedOrder.contact.firstName + selectedOrder.contact.lastName
          } ${selectedOrder.contact.contact}`}
        </p>
        <p>주문내역</p>
        <div className="overflow-x">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.length > 0 &&
                selectedOrder.items.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.productId.name}</td>
                    <td>{currencyFormat(item.price)}</td>
                    <td>{item.qty}</td>
                    <td>{currencyFormat(item.price * item.qty)}</td>
                  </tr>
                ))}
              <tr>
                <td colSpan={4}>총계:</td>
                <td>{currencyFormat(selectedOrder.totalPrice)}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <Form onSubmit={submitStatus}>
          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select value={orderStatus} onChange={handleStatusChange}>
              {ORDER_STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="order-button-area">
            <Button
              variant="light"
              onClick={handleClose}
              className="order-button"
            >
              닫기
            </Button>
            <Button type="submit">저장</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetailDialog;
