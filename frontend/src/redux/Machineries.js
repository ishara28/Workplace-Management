import { ADD_MACHINERY, MACHINERY_LOADING, MACHINERY_FAILED, UPDATE_MACHINERY, ACTIVE_MACHINERY, BLOCK_MACHINERY, REMOVED_MACHINERY } from './ActionTypes';
import axios from 'axios'
import {baseUrl} from '../shared/baseUrl'

export const Machineries = (state = {}, action) => {
    switch(action.type){
        case ADD_MACHINERY:
            return {...state, isLoading: false, errMess: null, machineries: action.payload};

        case MACHINERY_LOADING:
            return {...state, isLoading: true, errMess: null, machineries: []}

        case MACHINERY_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case UPDATE_MACHINERY:
            for (var i=0;i<state.machineries.length;i++){
                if(state.machineries[i].w_id===action.payload.w_id){
                    state.machineries[i]=action.payload;
                }
            }

            axios.post(baseUrl+'machinery/update/'+action.payload.w_id, {
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

            return {...state,isLoding:false, errerrMess: null, machineries:state.machineries}

        case ACTIVE_MACHINERY:
            for (i=0;i<state.machineries.length;i++){
                if(state.machineries[i].w_id===action.payload){
                    state.machineries[i].status="ACTIVE";
                }
            }
    
            axios.post(baseUrl+'machinery/active/'+action.payload)
            .then((response) => {
                console.log(response);
            })
            .catch(err=>console.log(err));
    
            return {...state,isLoding:false, errerrMess: null, machineries:state.machineries}

        case BLOCK_MACHINERY:
            for (i=0;i<state.machineries.length;i++){
                if(state.machineries[i].w_id===action.payload.w_id){
                    state.machineries[i].status="BLOCKED";
                }
            }

            axios.post(baseUrl+'machinery/block/'+action.payload.w_id, {
                reason:action.payload.reason
            })
            .then((response) => {
                console.log(response);
            })
            .catch(err=>console.log(err));

            return {...state,isLoding:false, errerrMess: null, machineries:state.machineries}

        case REMOVED_MACHINERY:
            for (i=0;i<state.machineries.length;i++){
                if(state.machineries[i].w_id===action.payload){
                    state.machineries[i].status="REMOVED";
                }
            }

            axios.post(baseUrl+'machinery/remove/'+action.payload)
            .then((response) => {
                console.log(response);
            })
            .catch(err=>console.log(err));

            return {...state,isLoding:false, errerrMess: null, machineries:state.machineries}

        default:
            return state;
    }
}