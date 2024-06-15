import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown, Modal, Carousel } from "react-bootstrap";
import { RotatingLines } from "react-loader-spinner";
import "../style/productDetail.style.css";
import productStore from "../store/productStore";
import userStore from "../store/userStore";
import cartStore from "../store/cartStore";
import useCommonUiStore from "../store/commonUiStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-regular-svg-icons";

const ProductDetail = () => {
  const { loading, selectedProduct, getProductDetail } = productStore();
  const { addToCart, error, resetError } = cartStore();
  const { showToastMessage } = useCommonUiStore();
  const { user } = userStore();
  const [size, setSize] = useState("");
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetail(id);
    return () => {
      resetError();
    };
  }, [id, getProductDetail, resetError]);

  useEffect(() => {
    if (error && error !== "") {
      showToastMessage(error, "error");
    }
  }, [error, showToastMessage]);

  // 카트에 아이템 담기
  const addItemToCart = async () => {
    if (size === "") {
      setSizeError(true);
      return;
    }
    if (!user) {
      navigate("/login");
      showToastMessage(
        "카트에 상품을 추가하기 위해서는 로그인이 필요합니다.",
        "error"
      );
      return;
    }
    // 카트에 아이템 추가하기
    const success = await addToCart({ id, size });
    if (success) {
      showToastMessage("카트에 상품을 추가하였습니다.", "success");
      setShowModal(true);
    }
  };

  // 모달닫기
  const handleCloseModal = () => setShowModal(false);

  // 카트로 이동
  const handleGoToCart = () => {
    setShowModal(false);
    navigate("/cart");
  };

  // 사이즈 선택
  const selectSize = (value) => {
    // 사이즈 추가하기
    if (sizeError) setSizeError(false);
    setSize(value);
  };

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <RotatingLines
            visible={true}
            height="150"
            width="150"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <Container className="product-detail-card">
          <Row>
            <Col sm={6}>
              {selectedProduct?.images && (
                <Carousel>
                  {selectedProduct.images.map((img, idx) => (
                    <Carousel.Item key={idx}>
                      <img
                        className="d-block w-100 h-20"
                        src={img}
                        alt={`${selectedProduct?.name}-${idx}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </Col>
            <Col className="product-info-area" sm={6}>
              <div className="product-info">{selectedProduct?.name}</div>
              <div className="product-info">₩ {selectedProduct?.price}</div>
              <div className="product-info">{selectedProduct?.description}</div>
              <Dropdown
                className="drop-down size-drop-down"
                title={size}
                align="start"
                onSelect={(value) => selectSize(value)}
              >
                <Dropdown.Toggle
                  className="size-drop-down"
                  variant={sizeError ? "outline-danger" : "outline-dark"}
                  id="dropdown-basic"
                  align="start"
                >
                  {size === "" ? "사이즈 선택" : size.toUpperCase()}
                </Dropdown.Toggle>

                <Dropdown.Menu className="size-drop-down">
                  {selectedProduct &&
                    Object.keys(selectedProduct.stock).length > 0 &&
                    Object.keys(selectedProduct.stock).map((item) =>
                      selectedProduct?.stock[item] > 0 ? (
                        <Dropdown.Item eventKey={item} key={item}>
                          {item.toUpperCase()}{" "}
                          {selectedProduct?.stock[item] <= 5 && (
                            <span className="low-stock">
                              - {selectedProduct?.stock[item]}개 남음 (품절임박)
                            </span>
                          )}
                        </Dropdown.Item>
                      ) : (
                        <Dropdown.Item eventKey={item} disabled={true}>
                          {item.toUpperCase()}
                        </Dropdown.Item>
                      )
                    )}
                </Dropdown.Menu>
              </Dropdown>
              <div className="warning-message">
                {sizeError && "사이즈를 선택해주세요."}
              </div>
              <Button
                variant="dark"
                className="add-button"
                onClick={addItemToCart}
              >
                추가
              </Button>
              <div className="likes-count">
                <FontAwesomeIcon icon={solid.faHeart} color={'red'} size={'2x'} />
                <span>좋아요 {selectedProduct?.likes}</span>
              </div>
            </Col>
          </Row>
        </Container>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>카트에 상품이 추가되었습니다.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          카트로 이동하시겠습니까, 아니면 계속 쇼핑하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            계속 쇼핑
          </Button>
          <Button variant="primary" onClick={handleGoToCart}>
            카트로 이동
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductDetail;
