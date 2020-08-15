import { UPDATE_USERNAME } from "./ActionTypes";

export const Auth = (state = { username: null }, action) => {
  switch (action.type) {
    case UPDATE_USERNAME:
      var newState = { username: action.payload.username };
      return newState;

    default:
      return state;
  }
};
