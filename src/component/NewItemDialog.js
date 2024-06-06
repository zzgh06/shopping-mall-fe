import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";
import { CATEGORY, STATUS, SIZE } from "../constants/product.constants";
import "../style/adminProduct.style.css";
import * as types from "../constants/product.constants";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import productStore from "../store/productStore";
import useCommonUiStore from "../store/commonUiStore";

const InitialFormData = {
  name: "",
  sku: "",
  stock: {},
  image: "",
  description: "",
  category: [],
  status: "active",
  price: 0,
};
const NewItemDialog = ({ mode, showDialog, setShowDialog, searchQuery, setSearchQuery }) => {
  const { error, createProduct, selectedProduct, editProduct, getProductList, totalPageNumber } = productStore();
  const { showToastMessage } = useCommonUiStore();
  const [formData, setFormData] = useState(
    mode === "new" ? { ...InitialFormData } : selectedProduct
  );
  const [stock, setStock] = useState([]);
  const [stockError, setStockError] = useState(false);
  
  const handleClose = () => {
    //모든걸 초기화시키고;
    setFormData({ ...InitialFormData });
    setStock([]);
    // 다이얼로그 닫아주기
    setShowDialog(false)
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      // console.log("formData", formData);
      // console.log("formData", stock);
      
      if (stock.length === 0) return setStockError(true)
    
      const totalStock = stock.reduce((total, item)=>{
          return {...total, [item[0]]:parseInt(item[1])}
      }, {})
      
      if (mode === "new") {
          const success = await createProduct({ ...formData, stock: totalStock });
          if (!success) {
              showToastMessage('상품생성실패', 'error');
          } else {
              showToastMessage('상품생성완료', 'success');
              handleClose();
              // 상품 생성시 마지막 페이지로 이동
              setSearchQuery({ page: totalPageNumber, name: "" });
          }
      } else {
          // 상품 수정하기
          const success = await editProduct({...formData, stock: totalStock}, selectedProduct._id);
          if (!success) {
              showToastMessage('상품수정실패', 'error');
          } else {
              showToastMessage('상품수정완료', 'success');
              // handlePageClick를 통해 searchQuery에 현재 페이지 값 전달하고 있기 때문에
              // 수정할 아이템이 있는 페이지의 ProductList를 불러옴
              getProductList(searchQuery);
          }
          setShowDialog(false)
      }
  };

  const handleChange = (event) => {
    //form에 데이터 넣어주기
    const {id, value} = event.target;
    setFormData({ ...formData, [id] : value});
  };

  const addStock = () => {
    // 재고타입 추가시 배열에 새 배열 추가
    setStock([...stock, []]);
  };

  const deleteStock = (idx) => {
    //재고 삭제하기
    const newStock = stock.filter((item, index)=> index !== idx);
    setStock(newStock);
  };

  const handleSizeChange = (value, index) => {
    //  재고 사이즈 변환하기
    // console.log(value, index)
    const newStock = [...stock];
    newStock[index][0] = value;
    setStock(newStock);
  };

  const handleStockChange = (value, index) => {
    //재고 수량 변환하기
    const newStock = [...stock];
    newStock[index][1] = value;
    setStock(newStock);
  };

  const onHandleCategory = (event) => {
    // top, dress, pants
    // formData의 category 배열에 이미 해당 카테고리가 포함되어 있는지 확인
    if (formData.category.includes(event.target.value)) {
      // 포함되어 있다면 해당 카테고리를 배열에서 제거
      const newCategory = formData.category.filter(
        (item) => item !== event.target.value
      );
      setFormData({
        ...formData,
        category: [...newCategory],
      });
    } else {
      // 포함되어 있지 않다면 해당 카테고리를 배열에 추가
      setFormData({
        ...formData,
        category: [...formData.category, event.target.value],
      });
    }
  };

  const uploadImage = (url) => {
    //이미지 업로드
    setFormData({...formData, image : url})
  };

  useEffect(() => {
    if (showDialog) {
      if (mode === "edit") {
        // 선택된 데이터값 불러오기 (재고 형태 객체에서 어레이로 바꾸기)
        setFormData(selectedProduct)
        const stockArray = Object.keys(selectedProduct.stock).map((size)=>[
          size, 
          selectedProduct.stock[size]
        ]);
        setStock(stockArray);
      } else {
        // 초기화된 값 불러오기
        setFormData({...InitialFormData});
        setStock([]);
      }
    }
  }, [showDialog]);

  //에러나면 토스트 메세지 보여주기

  return (
    <Modal show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        {mode === "new" ? (
          <Modal.Title>Create New Product</Modal.Title>
        ) : (
          <Modal.Title>Edit Product</Modal.Title>
        )}
      </Modal.Header>

      <Form className="form-container" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="sku">
            <Form.Label>Sku</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="Enter Sku"
              required
              value={formData.sku}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="Name"
              required
              value={formData.name}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="string"
            placeholder="Description"
            as="textarea"
            onChange={handleChange}
            rows={3}
            value={formData.description}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="stock">
          <Form.Label className="mr-1">Stock</Form.Label>
          {stockError && (
            <span className="error-message">재고를 추가해주세요</span>
          )}
          <Button size="sm" onClick={addStock}>
            Add +
          </Button>
          <div className="mt-2">
            {stock.map((item, index) => (
              <Row key={index}>
                <Col sm={4}>
                  <Form.Select
                    onChange={(event) =>
                      handleSizeChange(event.target.value, index)
                    }
                    required
                    defaultValue={item[0] ? item[0].toLowerCase() : ""}
                  >
                    <option value="" disabled selected hidden>
                      Please Choose...
                    </option>
                    {SIZE.map((item, index) => (
                      <option
                        invalid="true"
                        value={item.toLowerCase()}
                        disabled={stock.some(
                          (size) => size[0] === item.toLowerCase()
                        )}
                        key={index}
                      >
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm={6}>
                  <Form.Control
                    onChange={(event) =>
                      handleStockChange(event.target.value, index)
                    }
                    type="number"
                    placeholder="number of stock"
                    value={item[1]}
                    required
                  />
                </Col>
                <Col sm={2}>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteStock(index)}
                  >
                    -
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Image" required>
          <Form.Label>Image</Form.Label>
          <CloudinaryUploadWidget uploadImage={uploadImage} />

          <img
            id="uploadedimage"
            src={formData.image}
            className="upload-image mt-2"
            alt="uploadedimage"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={formData.price}
              required
              onChange={handleChange}
              type="number"
              placeholder="0"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              multiple
              onChange={onHandleCategory}
              value={formData.category}
              required
            >
              {CATEGORY.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={handleChange}
              required
            >
              {STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        {mode === "new" ? (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Edit
          </Button>
        )}
      </Form>
    </Modal>
  );
};

export default NewItemDialog;
