import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import SearchBox from "../component/SearchBox";
import NewItemDialog from "../component/NewItemDialog";
import * as types from "../constants/product.constants";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductTable from "../component/ProductTable";
import productStore from "../store/productStore";
import useCommonUiStore from "../store/commonUiStore";

const AdminProduct = () => {
  
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();

  // 다이얼로그
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  }); 

  //검색 조건들을 저장하는 객체
  const [mode, setMode] = useState("new");
  
  // zustand : productStore
  const { getProductList, productList, totalPageNumber, setSelectedProduct, deleteProduct } = productStore();
  const { showToastMessage } = useCommonUiStore();
  const tableHeader = [
    "#",
    "Sku",
    "Name",
    "Price",
    "Stock",
    "Images",
    "Status",
    "",
  ];

  useEffect(()=>{
    getProductList(searchQuery);
  }, [searchQuery])

  useEffect(() => {
 
    if (searchQuery.name === ""){
      delete searchQuery.name
    }
    // URLSearchParams 객체를 쿼리 형태로 변환
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate("?" + query)
  }, [searchQuery]);

  //아이템 삭제하기
  const deleteItem = async (id) => {
    const success = await deleteProduct(id, navigate);
    if (!success) {
      showToastMessage('상품삭제실패', 'error');
    } else {
      showToastMessage('상품삭제성공', 'success');
      getProductList(searchQuery)
    }
  };

  // 수정 폼 및 선택한 상품의 정보 불러오기
  const openEditForm = (product) => {
    setMode('edit')
    setSelectedProduct(product);
    setShowDialog(true)
  };

  // 생품 생성 폼 열기
  const handleClickNewItem = () => {
    setMode("new");
    setShowDialog(true);
  };

  const handlePageClick = ({ selected }) => {
    setSearchQuery({...searchQuery, page : selected + 1})
  };
  return (
    <div className="locate-center">
      <Container>
        <div className="mt-2">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="제품 이름으로 검색"
            field="name"
          />
        </div>
        <Button className="mt-2 mb-2" onClick={handleClickNewItem}>
          Add New Item +
        </Button>

        <ProductTable
          header={tableHeader}
          data={productList}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
        />
        <ReactPaginate 
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPageNumber}
          forcePage={searchQuery.page - 1} 
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </Container>

      <NewItemDialog
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
};

export default AdminProduct;
