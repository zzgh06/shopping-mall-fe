import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({item}) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
    navigate(`/product/${id}`)
  };
  // console.log('iii', item)
  return (
    <div className="card" onClick={() => showProduct(item?._id)}>
      <img
        src={item?.images[0]}
        alt={item?.name}
      />
      <div>{item?.name}</div>
      <div>₩ {item?.price}</div>
    </div>
  );
};

export default ProductCard;
