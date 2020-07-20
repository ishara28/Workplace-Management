import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl';
import axios from 'axios'

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
      })
    .then(response=> {
        dispatch(addWorkhouses(response.data));
    })
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