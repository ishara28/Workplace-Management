import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl';

export const updateUsername = (username)=>({
    type:ActionTypes.UPDATE_USERNAME,
    payload:{
        username:username
    }
})



export const fetchWorkhouses = () => (dispatch) => {

    dispatch(WorkhousesLoading(true));

    return fetch(baseUrl + "workhouse")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(workhouses => dispatch(addWorkhouses(workhouses)))
    .catch(error => dispatch(WorkhousesFailed(error.message)));
}

export const WorkhousesLoading = () => ({
    type: ActionTypes.WORKHOUSE_LOADING
});

export const WorkhousesFailed = (errmess) => ({
    type: ActionTypes.WORKHOUSE_FAILED,
    payload: errmess
});

export const addWorkhouses = (workhouses) => ({
    type: ActionTypes.ADD_WORKHOUSE,
    payload: workhouses
});

export const updateWorkhouse = (workhouse) => ({
    type: ActionTypes.UPDATE_WORKHOUSE,
    payload: workhouse
})

export const activeWorkhouse = (w_id) => ({
  type: ActionTypes.ACTIVE_WORKHOUSE,
  payload: w_id
})

export const blockWorkhouse = (w_id, reason) => ({
    type: ActionTypes.BLOCK_WORKHOUSE,
    payload:{
      w_id:w_id,
      reason:reason
    }
})

export const removeWorkhouse = (w_id) => ({
    type: ActionTypes.REMOVED_WORKHOUSE,
    payload: w_id
})



export const fetchMachineries = () => (dispatch) => {

  dispatch(MachineriesLoading(true));

  return fetch(baseUrl + "machinery")
  .then(
    response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        error.response = response;
        throw error;
      }
    },
    error => {
      var errmess = new Error(error.message);
      throw errmess;
    }
  )
  .then(response => response.json())
  .then(machineries => dispatch(addMachineries(machineries)))
  .catch(error => dispatch(MachineriesFailed(error.message)));
}

export const MachineriesLoading = () => ({
  type: ActionTypes.MACHINERY_LOADING
});

export const MachineriesFailed = (errmess) => ({
  type: ActionTypes.MACHINERY_FAILED,
  payload: errmess
});

export const addMachineries = (machineries) => ({
  type: ActionTypes.ADD_MACHINERY,
  payload: machineries
});

export const updateMachinery = (machinery) => ({
  type: ActionTypes.UPDATE_MACHINERY,
  payload: machinery
})

export const activeMachinery = (w_id) => ({
type: ActionTypes.ACTIVE_MACHINERY,
payload: w_id
})

export const blockMachinery = (w_id, reason) => ({
  type: ActionTypes.BLOCK_MACHINERY,
  payload:{
    w_id:w_id,
    reason:reason
  }
})

export const removeMachinery = (w_id) => ({
  type: ActionTypes.REMOVED_MACHINERY,
  payload: w_id
})