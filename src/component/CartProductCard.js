import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cartActions } from "../action/cartAction";
import { currencyFormat } from "../utils/number";
import useCommonUiStore from "../store/commonUiStore";

const CartProductCard = ({ item, deleteCartItem, getCartList }) => {
  console.log('item',item)
  const {showToastMessage} = useCommonUiStore();
  const handleQtyChange = () => {
    //아이템 수량을 수정한다
  };

  const deleteCart = async (id) => {
    //아이템을 지운다
    const success = await deleteCartItem(id);
    if (!success) {
      showToastMessage('상품삭제실패', 'error');
    } else {
      showToastMessage('상품삭제성공', 'success');
      getCartList();
    }
  };

  return (
    <div className="product-card-cart">
      <Row>
        <Col md={2} xs={12}>
          <img
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
                onClick={() => deleteCart(item._id)}
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
              onChange={(event) => handleQtyChange()}
              required
              defaultValue={1}
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
  );
};

export default CartProductCard;
