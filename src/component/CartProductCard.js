import React, {useState} from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { currencyFormat } from "../utils/number";
import useCommonUiStore from "../store/commonUiStore";

const CartProductCard = ({ item, deleteCartItem, getCartList, updateQty }) => {
  // console.log('item',item)
  const [showModal, setShowModal] = useState(false);
  const {showToastMessage} = useCommonUiStore();
  const handleQtyChange = async (id, event) => {
    //아이템 수량을 수정한다
    const value = event.target.value;
    // console.log(id, value)
    const success = await updateQty(id, value);
    if (!success) {
      showToastMessage('상품 수량 변경에 실패하였습니다', 'error');
    } else {
      showToastMessage('상품 수량 변경 성공', 'success');
      await getCartList();
    }
  };

  const handleCloseModal = () => setShowModal(false); 
  const handleOpenModal = () => setShowModal(true);

  // 카트 아이템 삭제
  const deleteCart = async (id) => {
    //아이템을 지운다
    const success = await deleteCartItem(id);
    if (!success) {
      showToastMessage('상품삭제실패', 'error');
    } else {
      showToastMessage('상품삭제성공', 'success');
      setShowModal(false);
      getCartList();
    }
  };

  return (
    <>
    <div className="product-card-cart">
      <Row>
        <Col md={2} xs={12}>
          <img style={{paddingRight :'15px'}}
            src={item?.productId.images[0]}
            width={112} alt={item?.productId.name}
          />
        </Col>
        <Col md={10} xs={12}>
          <div className="display-flex space-between">
            <h3>{item?.productId.name}</h3>
            <button className="trash-button">
              <FontAwesomeIcon
                icon={faTrash}
                width={24}
                onClick={() => handleOpenModal()}
              />
            </button>
          </div>

          <div>
            <strong>₩ {currencyFormat(item?.productId.price)}</strong>
          </div>
          <div>Size: {item?.size.toUpperCase()}</div>
          <div>Total: ₩ {currencyFormat(item?.productId.price * item?.qty)}</div>
          <div>
            Quantity:
            <Form.Select
              onChange={(event) => handleQtyChange(item._id, event)}
              required
              defaultValue={item?.qty}
              className="qty-dropdown"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </Form.Select>
          </div>
        </Col>
      </Row>
    </div>
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>카트에서 선택하신 상품을 삭제하시겠습니까?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        상품을 삭제하시겠습니까, 카트페이지로 돌아가시겠습니까?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          돌아가기
        </Button>
        <Button variant="primary" onClick={() => deleteCart(item._id)}>
          삭제하기
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default CartProductCard;
