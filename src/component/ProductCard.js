import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({item}) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
  };
  return (
    <div className="card" onClick={() => showProduct("hard_code")}>
      <img
        src={item?.image}
        alt={item?.name}
      />
      <div>{item?.name}</div>
      <div>₩ {item?.price}</div>
    </div>
  );
};

export default ProductCard;
