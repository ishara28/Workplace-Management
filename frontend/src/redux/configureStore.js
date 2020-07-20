import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Auth } from './Auth'
import {Agreements} from './Agreements'
import {Customers} from './Customers'
import {Machineries} from './Machineries'
import {Organizations} from './Organizations'
import {Projects} from './Projects'
import {Workhouses} from './Workhouse'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Auth:Auth,
            Agreements:Agreements,
            Customers:Customers,
            Machineries:Machineries,
            Organizations:Organizations,
            Projects:Projects,
            Workhouses:Workhouses
        }),
        composeWithDevTools(applyMiddleware(thunk))
    );

    return store;
}