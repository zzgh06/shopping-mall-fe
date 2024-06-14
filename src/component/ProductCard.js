import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from '@fortawesome/free-solid-svg-icons';
import * as regular from '@fortawesome/free-regular-svg-icons';

const ProductCard = ({ item, toggleLikeProduct, isLiked, getProductList }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
    navigate(`/product/${id}`);
  };
  // console.log(isLiked)
  const handleLikeClick = async (id) => {
    await toggleLikeProduct(id);
    await getProductList();
  };
  return (
    <>
    <div className="card">
      <img src={item?.images[0]} alt={item?.name} onClick={() => showProduct(item?._id)}/>
      <div className='like-button' onClick={() => handleLikeClick(item._id)}>
				{isLiked ? (
					<FontAwesomeIcon icon={solid.faHeart} color={'red'} size={'2x'} />
				) : (
					<FontAwesomeIcon icon={regular.faHeart} size={'2x'}/>
				)}
			</div>
      <div>{item?.name}</div>
      <div>₩ {item?.price}</div>
    </div>
    </>
  );
};

export default ProductCard;
