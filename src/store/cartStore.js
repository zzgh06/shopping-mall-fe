import { create } from "zustand";
import api from "../utils/api";

const cartStore = create((set, get) => ({
  loading: false,
  error: "",
  cartItemQty: 0,
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
        cartItemQty: response.data.cartItemQty,
      });
      return true;
    } catch (error) {
      set({ loading: false, error: error });
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
  }
}));

export default cartStore;
