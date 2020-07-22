import { ADD_WORKHOUSE, WORKHOUSE_LOADING, WORKHOUSE_FAILED, UPDATE_WORKHOUSE } from './ActionTypes';
import axios from 'axios'
import {baseUrl} from '../shared/baseUrl'

export const Workhouses = (state = { isLoading: true, errMess: null, workhouses:[]}, action) => {
    switch (action.type) {
        case ADD_WORKHOUSE:
            return {...state, isLoading: false, errMess: null, workhouses: action.payload};

        case WORKHOUSE_LOADING:
            return {...state, isLoading: true, errMess: null, workhouses: []}

        case WORKHOUSE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case UPDATE_WORKHOUSE:
            for (var i=0;i<state.workhouses.length;i++){
                if(state.workhouses[i].w_id===action.payload.w_id){
                    state.workhouses[i]=action.payload;
                }
            }

            axios.post(baseUrl+'workhouse/update/'+action.payload.w_id, {
                address: action.payload.address,
                telephone: action.payload.telephone,
                email: action.payload.email,
                description: action.payload.description,
                c_id: action.payload.c_id,
            })
            .then((response) => {
                console.log(response);
            })
            .catch(err=>console.log(err));

            return {...state}

        default:
            return state;
    }
};