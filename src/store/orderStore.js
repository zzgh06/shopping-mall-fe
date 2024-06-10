import { create } from 'zustand';
import api from '../utils/api';

const orderStore = create((set, get) => ({
  loading: false,
  error: "",
  orderNum : "",
  createOrder : async (data, navigate) => {
    console.log(data)
    set({loading:true, error: ""})
    try {
      const response = await api.post("/order", data)
      console.log('rrr', response.data.orderNum)
      set({loading : false, error: "", orderNum : response.data.orderNum})
      navigate('/payment/success')
      return true
    } catch(error) {
      // console.log(error.error)
      set({ loading: false, error: error.error });
      return false
    }
  }
})
)

export default orderStore;