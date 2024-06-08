import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown, Modal } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import { cartActions } from "../action/cartAction";
import { currencyFormat } from "../utils/number";
import { RotatingLines } from "react-loader-spinner";
import "../style/productDetail.style.css";
import productStore from "../store/productStore";
import userStore from "../store/userStore";
import cartStore from "../store/cartStore";
import useCommonUiStore from "../store/commonUiStore";

const ProductDetail = () => {
  const { loading, selectedProduct, getProductDetail } = productStore();
  const { addToCart, error } = cartStore();
  const { showToastMessage } = useCommonUiStore();
  const { user } = userStore();
  const [size, setSize] = useState("");
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    //상품 디테일 정보 가져오기
    getProductDetail(id);
  }, [id]);

  // error 메세지가 있거나 "" 빈문자열이 아닐때, 에러메세지
  useEffect(()=>{
    if (error && error !== "") {
      showToastMessage(error, 'error');
    }
  }, [error, showToastMessage])
  

  const addItemToCart = async () => {
    // 사이즈를 아직 선택안했다면 에러
    if (size === "") {
      setSizeError(true);
      return
    }
    // 아직 로그인을 안한유저라면 로그인페이지로
    if (!user) {
      navigate('/login')
      showToastMessage('카트에 상품을 추가하기 위해서는 로그인이 필요합니다.', 'error');
      return;
    };
    // 카트에 아이템 추가하기
    const success = await addToCart({id, size});
    if (success) {
      showToastMessage('카트에 상품을 추가하였습니다.', 'success');
      setShowModal(true);
    }
  };

  // 모달닫기
  const handleCloseModal = () => setShowModal(false);

  // 카트로 이동
  const handleGoToCart = () => {
    setShowModal(false);
    navigate('/cart');
  };

  // 사이즈 선택
  const selectSize = (value) => {
    // 사이즈 추가하기
    if(sizeError) setSizeError(false)
    setSize(value)
  };


  //카트에러가 있으면 에러메세지 보여주기

  //에러가 있으면 에러메세지 보여주기

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
        {selectedProduct?.images && selectedProduct?.images.map((img)=>
          <Col sm={3}>
            <img
              src={img}
              className="w-100"
              alt={selectedProduct?.name}
            />
          </Col>
        )}
        
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
              {selectedProduct && Object.keys(selectedProduct.stock).length > 0 && 
                Object.keys(selectedProduct.stock).map((item) =>
                  selectedProduct?.stock[item] > 0 ? (
                  <Dropdown.Item eventKey={item}>
                    {item.toUpperCase()}
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
          <Button variant="dark" className="add-button" onClick={addItemToCart}>
            추가
          </Button>
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
