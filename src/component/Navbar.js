import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import * as regular from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faBox,
  faSearch,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import userStore from "../store/userStore";
import cartStore from "../store/cartStore";
import { Modal } from "react-bootstrap";

const Navbar = ({ user }) => {
  const { cartItemCount, clearCart } = cartStore();
  const { userLogout } = userStore();
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const menuList = [
    "Women",
    "Men",
    "Top",
    "Dress",
    "Skirt",
    "Accessories",
    "Shoes",
  ];

  let [width, setWidth] = useState(0);
  let navigate = useNavigate();

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        return navigate("/");
      }
      navigate(`?name=${event.target.value}`);
    }
  };
  const logout = () => {
    userLogout();
    clearCart();
    navigate("/");
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div>
        {showSearchBox && (
          <div className="display-space-between mobile-search-box w-100">
            <div className="search display-space-between w-100">
              <div>
                <FontAwesomeIcon className="search-icon" icon={faSearch} />
                <input
                  type="text"
                  placeholder="제품검색"
                  onKeyPress={onCheckEnter}
                />
              </div>
              <button
                className="closebtn"
                onClick={() => setShowSearchBox(false)}
              >
                &times;
              </button>
            </div>
          </div>
        )}
        <div className="side-menu" style={{ width: width }}>
          <button className="closebtn" onClick={() => setWidth(0)}>
            &times;
          </button>

          <div className="side-menu-list" id="menu-list">
            {menuList.map((menu, index) => (
              <button key={index}>{menu}</button>
            ))}
          </div>
        </div>
        {user && user?.level === "admin" && (
          <Link to="/admin/product?page=1" className="link-area">
            Admin page
          </Link>
        )}
        <div className="nav-header">
          <div className="burger-menu hide">
            <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
          </div>

          <div>
            <div className="display-flex">
              {user ? (
                <div className="nav-icon">
                  <span>{user.name}님</span>
                  <span style={{ marginRight: "10px" }}>
                    <strong onClick={() => handleOpenModal()}>
                      {user.level === "customer"
                        ? "CUSTOMER"
                        : user.level === "bronze"
                        ? "BRONZE"
                        : user.level === "silver"
                        ? "SILVER"
                        : user.level === "gold"
                        ? "GOLD"
                        : "ADMIN"}
                    </strong>{" "}
                    등급
                  </span>
                  <FontAwesomeIcon icon={faUser} />
                  {!isMobile && (
                    <span style={{ cursor: "pointer" }} onClick={logout}>
                      로그아웃
                    </span>
                  )}
                </div>
              ) : (
                <div onClick={() => navigate("/login")} className="nav-icon">
                  <FontAwesomeIcon icon={faUser} />
                  {!isMobile && (
                    <span style={{ cursor: "pointer" }}>로그인</span>
                  )}
                </div>
              )}
              <div
                onClick={() => (user ? navigate("/cart") : navigate("/login"))}
                className="nav-icon"
              >
                <FontAwesomeIcon icon={faShoppingBag} />
                {!isMobile && (
                  <span style={{ cursor: "pointer" }}>{`쇼핑백(${
                    cartItemCount || 0
                  })`}</span>
                )}
              </div>
              <div
                onClick={() =>
                  user ? navigate("/account/purchase") : navigate("/login")
                }
                className="nav-icon"
              >
                <FontAwesomeIcon icon={faBox} />
                {!isMobile && (
                  <span style={{ cursor: "pointer" }}>내 주문</span>
                )}
              </div>
              <div
                onClick={() => (user ? navigate("/likes") : navigate("/login"))}
                className="nav-icon"
              >
                <FontAwesomeIcon icon={regular.faHeart} />
                {!isMobile && (
                  <span style={{ cursor: "pointer" }}>좋아요 목록</span>
                )}
              </div>
              {isMobile && (
                <div
                  className="nav-icon"
                  onClick={() => setShowSearchBox(true)}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="nav-logo">
          <Link to="/">
            <img
              width={100}
              src="/image/WEFashion-logo.png"
              alt="WEFashion-logo.png"
            />
          </Link>
        </div>
        <div className="nav-menu-area">
          <ul className="menu">
            {menuList.map((menu, index) => (
              <li key={index}>
                <Link to={`/${menu.toLowerCase()}`}>{menu}</Link>
              </li>
            ))}
          </ul>
          {!isMobile && ( 
            <div className="search-box landing-search-box ">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder="제품검색"
                onKeyPress={onCheckEnter}
              />
            </div>
          )}
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>등급별 혜택 안내</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>- GOLD 등급 : 10% 할인률 적용</div>
          <div>- SILVER 등급 : 7% 할인률 적용</div>
          <div>- BRONZE 등급 : 5% 할인률 적용</div>
          <div>- CUSTOMER 등급 : 3% 할인률 적용</div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navbar;
