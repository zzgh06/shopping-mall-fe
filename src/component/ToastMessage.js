import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCommonUiStore from "../store/commonUiStore";

const ToastMessage = () => {
  const { toastMessage, clearToastMessage } = useCommonUiStore();

  useEffect(() => {
    if (toastMessage.message) {
      toast[toastMessage.status](toastMessage.message, { theme: "colored" });
      clearToastMessage(); 
    }
  }, [toastMessage, clearToastMessage]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default ToastMessage;
