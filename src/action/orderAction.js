import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";

const createOrder = (payload) => async (dispatch) => {};

const getOrder = () => async (dispatch) => {};
const getOrderList = (query) => async (dispatch) => {};

const updateOrder = (id, status) => async (dispatch) => {};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};
