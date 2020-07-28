import {
  ADD_WORKHOUSE,
  WORKHOUSE_LOADING,
  WORKHOUSE_FAILED,
  UPDATE_WORKHOUSE,
  ACTIVE_WORKHOUSE,
  BLOCK_WORKHOUSE,
  REMOVED_WORKHOUSE,
} from "./ActionTypes";
import axios from "axios";
import { baseUrl } from "../shared/baseUrl";

export const Workhouses = (
  state = { isLoading: true, errMess: null, workhouses: [] },
  action
) => {
  switch (action.type) {
    case ADD_WORKHOUSE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        workhouses: action.payload,
      };

    case WORKHOUSE_LOADING:
      return { ...state, isLoading: true, errMess: null, workhouses: [] };

    case WORKHOUSE_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case UPDATE_WORKHOUSE:
      for (var i = 0; i < state.workhouses.length; i++) {
        if (state.workhouses[i].w_id === action.payload.w_id) {
          state.workhouses[i] = action.payload;
        }
      }

      axios
        .post(baseUrl + "workhouse/update/" + action.payload.w_id, {
          address: action.payload.address,
          telephone: action.payload.telephone,
          email: action.payload.email,
          description: action.payload.description,
          c_id: action.payload.c_id,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));

      return {
        ...state,
        isLoding: false,
        errerrMess: null,
        workhouses: state.workhouses,
      };

    case ACTIVE_WORKHOUSE:
      for (i = 0; i < state.workhouses.length; i++) {
        if (state.workhouses[i].w_id === action.payload) {
          state.workhouses[i].status = "ACTIVE";
        }
      }

      axios
        .post(baseUrl + "workhouse/active/" + action.payload)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));

      return {
        ...state,
        isLoding: false,
        errerrMess: null,
        workhouses: state.workhouses,
      };

    case BLOCK_WORKHOUSE:
      for (i = 0; i < state.workhouses.length; i++) {
        if (state.workhouses[i].w_id === action.payload.w_id) {
          state.workhouses[i].status = "BLOCKED";
        }
      }

      axios
        .post(baseUrl + "workhouse/block/" + action.payload.w_id, {
          reason: action.payload.reason,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));

      return {
        ...state,
        isLoding: false,
        errerrMess: null,
        workhouses: state.workhouses,
      };

    case REMOVED_WORKHOUSE:
      for (i = 0; i < state.workhouses.length; i++) {
        if (state.workhouses[i].w_id === action.payload) {
          state.workhouses[i].status = "REMOVED";
        }
      }

      axios
        .post(baseUrl + "workhouse/remove/" + action.payload)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));

      return {
        ...state,
        isLoding: false,
        errerrMess: null,
        workhouses: state.workhouses,
      };

    default:
      return state;
  }
};
