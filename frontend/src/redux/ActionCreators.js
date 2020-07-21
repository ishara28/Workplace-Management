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