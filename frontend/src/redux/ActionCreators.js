import * as ActionTypes from './ActionTypes'

export const updateUsername = (username)=>({
    type:ActionTypes.UPDATE_USERNAME,
    payload:{
        username:username
    }
})