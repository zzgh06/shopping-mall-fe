import { create } from "zustand";
import api from "../utils/api";
import useCommonUiStore from "./commonUiStore";

const orderStore = create((set, get) => ({
  loading: false,
  error: "",
  orderNum: "",
  orderList: [],
  totalPageNum: 0,
  selectedOrder: null,
  createOrder: async (data, navigate) => {
    set({ loading: true, error: "" });
    try {
      const response = await api.post("/order", data);
      set({ loading: false, error: "", orderNum: response.data.orderNum });
      navigate("/payment/success");
      return true;
    } catch (error) {
      set({ loading: false });
      const { showToastMessage } = useCommonUiStore.getState();
      showToastMessage(error.error, "error");
      navigate("/cart");
      return false;
    }
  },
  getOrderList: async (query) => {
    set({ loading: true, error: "" });
    try {
      const response = await api.get("/order/me", { params: { ...query } });
      set({
        loading: false,
        error: "",
        orderList: response.data.data,
        totalPageNum: response.data.totalPageNum,
      });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
  setSelectedOrder: (order) => {
    set({ selectedOrder: order });
  },
  updateOrder: async (id, status) => {
    set({ loading: true, error: "" });
    try {
      const response = await api.put(`/order/${id}`, { status });
      set({ loading: false, error: "" });
      const { showToastMessage } = useCommonUiStore.getState();
      showToastMessage("주문상태 변경을 성공하였습니다", "success");
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
}));

export default orderStore;
