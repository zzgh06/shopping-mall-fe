import { create } from "zustand";
import api from "../utils/api";

const cartStore = create((set, get) => ({
  loading: false,
  error: "",
  cartList: [],
  totalPrice: 0,
  cartItemCount: 0,
  addToCart: async ({ id, size }) => {
    set({ loading: true, error: "" });
    try {
      const response = await api.post("/cart", { productId: id, size, qty: 1 });
      console.log("rrr", response);
      set({
        loading: false,
        error: "",
        cartItemCount: response.data.cartItemQty,
      });
      return true;
    } catch (error) {
      set({ loading: false, error: error.error });
      return false;
    }
  },
  getCartList: async () => {
    set({ loading: true, error: "" });
    try {
      const response = await api.get("/cart");
      // console.log('response', response.data.data)
      set({
        loading: false,
        error: "",
        cartList: response.data.data,
        totalPrice: response.data.data.reduce(
          (total, item) => (total += item.productId.price * item.qty),
          0
        ),
      });
    } catch (error) {
      set({ loading: false, error: error });
    }
  },
  deleteCartItem : async (id) => {
    set({ loading: true, error: "" });
    try {
      const response = await api.delete(`/cart/${id}`);
      set({ loading: false, error: "",  cartItemCount : response.data.cartItemQty});
      return true;
    } catch(error) {
      set({ loading: false, error: error });
      return false;
    }
  },
  updateQty : async (id, value) => {
    set({ loading: true, error: "" });
    try {
      // { qty : value} 백엔드에는 req.body 에 qty로 전달되고 있어 이런식으로 변경해서 보내야함
      const response = await api.put(`/cart/${id}`, { qty : value});
      // console.log('rrr', response.data.data)
      set({ loading: false, error: "",  cartItemCount : response.data.data});
      return true;
    } catch(error){
      set({ loading: false, error: error });
      return false;
    }
  },
  getCartQty : async () => {
    set({ loading: true, error: "" });
    try {
      const response = await api.get("/cart/qty");
      // console.log('qqq',response.data)
      set({ loading : false, error : "", cartItemCount : response.data.qty });
    } catch (error) {
      set({ loading: false, error: error });
    }
  },
  // 로그아웃 시 카트 초기화
  clearCart: () => {
    set({
      cartList: [],
      totalPrice: 0,
      cartItemCount: 0,
    });
  },
  // 에러 초기화
  resetError: () => {
    set({ error: "" });
  },
}));

export default cartStore;
