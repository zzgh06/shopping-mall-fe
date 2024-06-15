import React from "react";
import { Route, Routes } from "react-router";
import AdminOrderPage from "../page/AdminOrderPage";
import AdminProduct from "../page/AdminProduct";
import CartPage from "../page/CartPage";
import Login from "../page/Login";
import MyPage from "../page/MyPage";
import OrderCompletePage from "../page/OrderCompletePage";
import PaymentPage from "../page/PaymentPage";
import ProductAll from "../page/ProductAll";
import ProductDetail from "../page/ProductDetail";
import RegisterPage from "../page/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import LikesPage from "../page/LikesPage";
import WomenPage from "../page/WomenPage";
import MenPage from "../page/MenPage";
import TopPage from "../page/TopPage";
import DressPage from "../page/DressPage";
import PantsPage from "../component/PantsPage";
import SkirtPage from "../page/SkirtPage";
import AccessoriesPage from "../page/AccessoriesPage";
import ShoesPage from "../page/ShoesPage";


const AppRouter = () => {

  return (
    <Routes>
      <Route path="/" element={<ProductAll />} />
      <Route path="/women" element={<WomenPage />} />
      <Route path="/men" element={<MenPage />} />
      <Route path="/top" element={<TopPage />} />
      <Route path="/dress" element={<DressPage />} />
      <Route path="/skirt" element={<SkirtPage />} />
      <Route path="/accessories" element={<AccessoriesPage />} />
      <Route path="/shoes" element={<ShoesPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route element={<PrivateRoute permissionLevel="customer" />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/likes" element={<LikesPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/success" element={<OrderCompletePage />} />
        <Route path="/account/purchase" element={<MyPage />} />
      </Route>
      <Route element={<PrivateRoute permissionLevel="admin" />}>
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/admin/order" element={<AdminOrderPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
