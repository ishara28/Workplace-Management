import * as ActionTypes from './ActionTypes'
import { updateUsername } from './ActionCreators';

export const initialState = {
    username:null
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_USERNAME:
            var newState ={username:action.payload.username}
            return newState;
    
        default:
            return state;
    }  
}