import { create } from 'zustand';
import api from '../utils/api';


const productStore = create((set, get) => ({
  loading: false,
  error: "",
  productList : [],
  createProduct : async (formData) => {
    set({loading : true, error : ""});
    try {
      const response = await api.post('/product', formData);
      // console.log(response)
      set({loading : false});
      return true;
    } catch (error){
      set({loading : false, error : error || "상품 생성 실패"});
      return false;
    }
  },
  getProductList : async () => {
    set({loading : true, error : ""});
    try {
      const response = await api.get('/product');
      // console.log(response.data.products)
      set({loading : true, error : "", productList : response.data.products});
    } catch (error){
      set({loading : false, error : error})
    }
  },
})
)

export default productStore;
