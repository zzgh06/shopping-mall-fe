import { create } from 'zustand';

const useCommonUiStore = create((set) => ({
  toastMessage: { message: "", status: "" },
  showToastMessage: (message, status) => set({ toastMessage: { message, status } }),
  clearToastMessage: () => set({ toastMessage: { message: "", status: "" } }),
}));

export default useCommonUiStore;