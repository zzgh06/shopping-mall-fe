// src/store/userStore.js
import { create } from 'zustand';
import api from '../utils/api';

const userStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  registerUser: async ({ name, email, password }, navigate) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/user', { email, password, name });
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
      const response = await api.post('/auth/login', {email, password});
      if (response.status !== 200) throw new Error(response.error);
      sessionStorage.setItem('token', response.data.token)
      set({loading: false, user: response.data})
    } catch (error){
      // console.log(error.error)
      set({ loading: false, error: error.error });
    }
  },
  tokenLogin: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/user/me')
      if (response.status !== 200) throw new Error(response.error)
      set({loading: false, user: response.data})
    } catch (error){
      set({ loading: false, error: error.message, user : null});
      sessionStorage.removeItem('token')
    }
  },
  userLogout: async () => {
    set({ user: null });
    sessionStorage.removeItem('token');
  },
  clearError : async () => {
    set({ error : null})
  }
}));

export default userStore;