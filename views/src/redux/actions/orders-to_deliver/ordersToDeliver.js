import {
  FETCH_ORDERS_TO_DELIVER_STARTED,
  FETCH_ORDERS_TO_DELIVER_SUCCESS,
  FETCH_ORDERS_TO_DELIVER_FAILURE
} from "../types";
import { tokenConfig } from "../auth-actions/tokenConfig";
import axios from "axios";

export const fetchOrdersToDeliver = () => (dispatch, getState) => {
  dispatch(fetchOrdersToDeliverStarted());

  axios
    .get("/api/users/ordersToDeliver", tokenConfig(getState))
    .then(res => {
      dispatch(fetchOrdersToDeliverSuccess(res.data.ordersToDeliver));
    })
    .catch(err => {
      dispatch(fetchOrdersToDeliverFailure(err.response.data.message));
    });
};

const fetchOrdersToDeliverStarted = () => {
  return {
    type: FETCH_ORDERS_TO_DELIVER_STARTED
  };
};

const fetchOrdersToDeliverSuccess = ordersToDeliver => {
  return {
    type: FETCH_ORDERS_TO_DELIVER_SUCCESS,
    payload: { ordersToDeliver }
  };
};

const fetchOrdersToDeliverFailure = error => {
  return {
    type: FETCH_ORDERS_TO_DELIVER_FAILURE,
    payload: { error }
  };
};
