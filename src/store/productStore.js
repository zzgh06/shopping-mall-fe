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
      set({loading : false});
      return true;
    } catch (error){
      set({loading : false, error : error || "상품 생성 실패"});
      return false;
    }
  },
  getProductList : async (query) => {
    set({loading : true, error : ""});
    console.log(query)
    try {
      // 옵션으로 쿼리 추가
      const response = await api.get('/product', {
        params : {...query}
      });
      console.log(response)
      // console.log(response.data.products)
      set({loading : true, error : "", productList : response.data.productList});
    } catch (error){
      set({loading : false, error : error})
    }
  },
})
)

export default productStore;
