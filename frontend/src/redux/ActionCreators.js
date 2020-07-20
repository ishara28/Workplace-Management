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

    axios({
        method: 'get',
        url: baseUrl+'workhouse',
        responseType: 'stream'
      })
        .then(function (response) {
          console.log(response);
        });
    /*setTimeout(() => {
        dispatch(addWorkhouses(DISHES));
    }, 2000);*/
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