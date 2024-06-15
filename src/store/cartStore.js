import { create } from "zustand";
import api from "../utils/api";

const cartStore = create((set, get) => ({
  loading: false,
  error: "",
  cartList: [],
  totalPrice: 0,
  cartItemCount: 0,
  selectedItems: [],
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
      const cartItems = response.data.data;
      set({
        loading: false,
        error: "",
        cartList: cartItems,
        selectedItems: cartItems.map(item => item._id),
      });
    } catch (error) {
      set({ loading: false, error: error });
    }
  },
  selectItem: (id) => {
    const { selectedItems } = get();
    if (selectedItems.includes(id)) {
      set({ selectedItems: selectedItems.filter(item => item !== id) });
    } else {
      set({ selectedItems: [...selectedItems, id] });
    }
  },
  deleteCartItem: async (id) => {
    set({ loading: true, error: "" });
    try {
      console.log(id)
      const response = await api.delete(`/cart/${id}`);
      set({ loading: false, error: "", cartItemCount: response.data.cartItemQty });
      return true;
    } catch (error) {
      set({ loading: false, error: error });
      return false;
    }
  },
  // 선택된 상품만 결제되어 카트에서 선택된 상품만 삭제하기 위한 함수
  deleteSelectedCartItems: async () => {
    const { selectedItems, deleteCartItem, getCartList } = get();
    set({ loading: true, error: "" });

    try {
      for (const id of selectedItems) {
        await deleteCartItem(id);
      }
      await getCartList();
      set({ selectedItems: [] });
      set({ loading: false, error: "" });
    } catch (error) {
      set({ loading: false, error: error });
    }
  },
  updateQty: async (id, value) => {
    set({ loading: true, error: "" });
    try {
      const response = await api.put(`/cart/${id}`, { qty: value });
      set({ loading: false, error: "", cartItemCount: response.data.data });
      return true;
    } catch (error) {
      set({ loading: false, error: error });
      return false;
    }
  },
  getCartQty: async () => {
    set({ loading: true, error: "" });
    try {
      const response = await api.get("/cart/qty");
      set({ loading: false, error: "", cartItemCount: response.data.qty });
    } catch (error) {
      set({ loading: false, error: error });
    }
  },
  clearCart: () => {
    set({
      cartList: [],
      totalPrice: 0,
      cartItemCount: 0,
    });
  },
  resetError: () => {
    set({ error: "" });
  },
}));

export default cartStore;
