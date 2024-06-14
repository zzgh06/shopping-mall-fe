import React, { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";
import orderStore from "../store/orderStore";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { getOrderList, orderList, totalPageNum } = orderStore();
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
  });
  //오더리스트 들고오기
  // console.log(orderList);

  useEffect(() => {
    getOrderList({ ...searchQuery });
  }, [searchQuery]);

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  useEffect(() => {
    const params = new URLSearchParams(searchQuery);
    const queryString = params.toString();
    navigate("?" + queryString);
  }, [searchQuery]);

  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  if (orderList?.length === 0) {
    return (
      <Container className="status-card-container">
        <div>주문하신 상품이 없습니다</div>
      </Container>
    );
  }
  return (
    <>
      <Container className="status-card-container">
        {orderList.map((item) => (
          <OrderStatusCard item={item} key={item._id} />
        ))}
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPageNum}
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
          // className="display-center list-style-none"
        />
      </Container>
    </>
  );
};

export default MyPage;
