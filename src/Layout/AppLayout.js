import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import ToastMessage from "../component/ToastMessage";
import userStore from "../store/userStore";
import cartStore from "../store/cartStore";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const { user, tokenLogin } = userStore();
  const { getCartQty } = cartStore();
  console.log(user)

  useEffect(() => {
    tokenLogin();
  }, []);

  // 로그인되어 있을 경우 카트의 담긴 아이템의 갯수 가져옴
  useEffect(() => {
    if (user) {
      getCartQty();
    }
  }, [user]);

  return (
    <div>
      <ToastMessage />
      {location.pathname.includes("admin") ? (
        <Row className="vh-100">
          <Col xs={12} md={3} className="sidebar mobile-sidebar">
            <Sidebar />
          </Col>
          <Col xs={12} md={9}>
            {children}
          </Col>
        </Row>
      ) : (
        <>
          <Navbar user={user?.user} />
          {children}
        </>
      )}
    </div>
  );
};

export default AppLayout;