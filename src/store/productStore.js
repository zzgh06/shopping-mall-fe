import { create } from 'zustand';
import api from '../utils/api';


const productStore = create((set, get) => ({
  loading: false,
  error: "",
  productList : [],
  totalPageNumber : 1,
  selectedProduct : null,
  // 상품 생성하기
  createProduct : async (formData) => {
    set({loading : true, error : ""});
    try {
      const response = await api.post('/product', formData);
      set({loading : false, error : ""});
      return true;
    } catch (error){
      set({loading : false, error : error || "상품 생성 실패"});
      return false;
    }
  },
  // 상품정보 가져오기
  getProductList : async (query) => {
    set({loading : true, error : ""});
    console.log('qqq',query)
    try {
      // 옵션으로 쿼리 추가
      const response = await api.get('/product', {
        params : {...query}
      });
      // console.log(response)
      // console.log(response.data.products)
      set({loading : true, error : "", productList : response.data.data, totalPageNumber : response.data.totalPageNumber});
    } catch (error){
      set({loading : false, error : error})
    }
  },
  // 선택한 상품 정보 불러오기
  setSelectedProduct : (product) => {
    console.log(product)
    set({selectedProduct : product});
  },
  // 상품 수정하기
  editProduct : async (formData, id) => {
    set({loading : true, error : ""});
    try {
      const response = await api.put(`/product/${id}`, formData);
      set({loading : false, error : ""});
      return true;
    } catch(error) {
      set({loading : false, error : error });
      return false;
    }
  },
  // 상품 삭제하기
  deleteProduct : async (id) => {
    set({loading : true, error : ""});
    try {
      const response = await api.delete(`/product/${id}`);
      return true;
    } catch(error) {
      set({loading : false, error : error });
      return false;
    }
  }
})
)

export default productStore;
