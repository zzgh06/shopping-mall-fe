import { create } from "zustand";
import api from "../utils/api";
import useCommonUiStore from "./commonUiStore";

const userStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  likedProducts: [],

  registerUser: async ({ name, email, password }, navigate) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/user", { email, password, name });
      if (response.status !== 200) throw new Error(response.error);
      set({ loading: false });
      navigate();
      return true;
    } catch (error) {
      set({ loading: false, error: error.message });
      return false;
    }
  },

  emailLogin: async ({ email, password }) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.status !== 200) throw new Error(response.error);
      sessionStorage.setItem("token", response.data.token);

      await get().fetchUserData();
    } catch (error) {
      set({ loading: false, error: error.error });
    }
  },

  tokenLogin: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/user/me");
      if (response.status !== 200) throw new Error(response.error);
      set({
        loading: false,
        user: response.data,
        likedProducts: response.data.likedProducts || [],
      });
    } catch (error) {
      set({ loading: false, error: error.message, user: null });
      sessionStorage.removeItem("token");
    }
  },

  loginWithGoogle: async (token) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/auth/google", { token });
      if (response.status !== 200) throw new Error(response.error);
      sessionStorage.setItem("token", response.data.token);
      await get().fetchUserData();
    } catch (error) {
      set({ loading: false });
      const { showToastMessage } = useCommonUiStore.getState();
      showToastMessage(error.error, "error");
    }
  },

  userLogout: async () => {
    set({ user: null, likedProducts: [] });
    sessionStorage.removeItem("token");
  },

  clearError: async () => {
    set({ error: null });
  },

  // 유저 데이터 불러오기
  fetchUserData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/user/me");
      if (response.status !== 200) throw new Error(response.error);
      set({
        loading: false,
        user: response.data,
        likedProducts: response.data.likedProducts || [],
      });
    } catch (error) {
      set({ loading: false, error: error.message, user: null });
      sessionStorage.removeItem("token");
    }
  },
}));

export default userStore;
