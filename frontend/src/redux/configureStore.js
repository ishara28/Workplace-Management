import { createStore, combineReducers, applyMiddleware } from "redux";
import { Auth } from "./Auth";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      Auth: Auth,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};
