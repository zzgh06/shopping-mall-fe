import { create } from "zustand";
import api from "../utils/api";
import userStore from "./userStore";
import commonUiStore from "./commonUiStore";

const productStore = create((set, get) => ({
  loading: false,
  error: "",
  productList: [],
  totalPageNumber: 1,
  selectedProduct: null,
  // 상품 생성하기
  createProduct: async (formData) => {
    set({ loading: true, error: "" });
    try {
      const response = await api.post("/product", formData);
      set({ loading: false, error: "" });
      return true;
    } catch (error) {
      set({ loading: false, error: error || "상품 생성 실패" });
      return false;
    }
  },
  // 상품정보 가져오기
  getProductList: async (query) => {
    set({ loading: true, error: "" });
    try {
      const response = await api.get("/product", {
        params: { ...query },
      });
      set({
        loading: false,
        error: "",
        productList: response.data.data,
        totalPageNumber: response.data.totalPageNumber,
      });
    } catch (error) {
      set({ loading: false, error: error });
    }
  },
  getProductDetail: async (id) => {
    set({ loading: true, error: "" });
    try {
      const response = await api.get(`/product/${id}`);
      set({ loading: false, selectedProduct: response?.data.data });
    } catch (error) {
      set({ loading: false, error: error });
    }
  },
  // 선택한 상품 정보 불러오기
  setSelectedProduct: (product) => {
    set({ selectedProduct: product });
  },
  // 상품 수정하기
  editProduct: async (formData, id) => {
    set({ loading: true, error: "" });
    try {
      const response = await api.put(`/product/${id}`, formData);
      set({ loading: false, error: "" });
      return true;
    } catch (error) {
      set({ loading: false, error: error });
      return false;
    }
  },
  // 상품 삭제하기
  deleteProduct: async (id) => {
    set({ loading: true, error: "" });
    try {
      const response = await api.delete(`/product/${id}`);
      return true;
    } catch (error) {
      set({ loading: false, error: error });
      return false;
    }
  },
  // 상품 좋아요
  toggleLikeProduct: async (id) => {
    set({ loading: true, error: "" });
    try {
      const response = await api.post(`/product/${id}/likes`);
      const { likedProducts } = userStore.getState();
      const alreadyLiked = likedProducts.includes(id);
      const updatedLikedProducts = alreadyLiked
        ? likedProducts.filter((productId) => productId !== id)
        : [...likedProducts, id];

      userStore.setState({ likedProducts: updatedLikedProducts });

      set({ loading: false, error: "" });
    } catch (error) {
      set({ loading: false, error: error });
      const { showToastMessage } = commonUiStore.getState();
      showToastMessage(
        "로그인 유저만 좋아요를 할 수 있습니다, 로그인 부탁드립니다.",
        "error"
      );
      return false;
    }
  },
}));

export default productStore;
