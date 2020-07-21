import { ADD_WORKHOUSE, WORKHOUSE_LOADING, WORKHOUSE_FAILED, UPDATE_WORKHOUSE } from './ActionTypes';
import { updateWorkhouse } from './ActionCreators';

export const Workhouses = (state = { isLoading: true, errMess: null, workhouses:[]}, action) => {
    switch (action.type) {
        case ADD_WORKHOUSE:
            return {...state, isLoading: false, errMess: null, workhouses: action.payload};

        case WORKHOUSE_LOADING:
            return {...state, isLoading: true, errMess: null, workhouses: []}

        case WORKHOUSE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};