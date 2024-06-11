import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import SearchBox from "../component/SearchBox";
import NewItemDialog from "../component/NewItemDialog";
import * as types from "../constants/product.constants";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate, useRouteError } from "react-router-dom";
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
  }); //검색 조건들을 저장하는 객체

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

  // searchBox에서 검색어를 읽어온다 => 엔터를 치면 => searchQuery 객체가 업데이트 됨 { name : 제품명 }
  // searchQuery 객체 안의 아이템 기준으로 url를 새로 생성해서 호출 => url 쿼리 읽어오기 
  // => url 쿼리 기준으로 BE 검색조건과 함께 호출한다.
  
  //상품리스트 가져오기 (url쿼리 맞춰서)
  // 쿼리값을 옵션으로 백엔드에 전달
  useEffect(()=>{
    getProductList(searchQuery);
  }, [searchQuery])

  useEffect(() => {
    //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
    // 기본값이 "" 검색내용이 없으면 delete
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
      // 현재 페이지에 해당하는 아이템 정보를 불러옴
      getProductList(searchQuery)
    }
  };

  // 수정 폼 및 선택한 상품의 정보 불러오기
  const openEditForm = (product) => {
    //edit모드로 설정하고
    setMode('edit')
    // 아이템 수정다이얼로그 열어주기
    setSelectedProduct(product);
    setShowDialog(true)
  };

  // 생품 생성 폼 열기
  const handleClickNewItem = () => {
    //new 모드로 설정하고
    setMode("new");
    // 다이얼로그 열어주기
    setShowDialog(true);
  };

  const handlePageClick = ({ selected }) => {
    //  쿼리에 페이지 값 바꿔주기
    setSearchQuery({...searchQuery, page : selected + 1})
    // console.log(selected) // 현재 페이지 + 1
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
          pageCount={totalPageNumber} // 전체페이지
          forcePage={searchQuery.page - 1} // 1페이지면 2임 여긴 한개씩 +1 해야함
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
          // className="pagination-display-center list-style-none"
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
