import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import * as regular from "@fortawesome/free-regular-svg-icons";

const ProductCard = ({ item, toggleLikeProduct, isLiked, getProductList }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };
  const handleLikeClick = async (id) => {
    await toggleLikeProduct(id);
    await getProductList();
  };
  console.log(item._id)
  return (
    <>
      <div className="card">
        <img
          className="sub-img"
          src={item?.images[1]}
          alt={item?.name}
          onClick={() => showProduct(item?._id)}
        />
        <img
          className="main-img"
          src={item?.images[0]}
          alt={item?.name}
          onClick={() => showProduct(item?._id)}
        />
        <div className="like-button" onClick={() => handleLikeClick(item._id)}>
          {isLiked ? (
            <FontAwesomeIcon icon={solid.faHeart} color={"red"} size={"2x"} />
          ) : (
            <FontAwesomeIcon icon={regular.faHeart} size={"2x"} />
          )}
        </div>
        <div className="disc">
          <div>{item?.name}</div>
          <div>₩ {item?.price}</div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
