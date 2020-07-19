import { createStore, combineReducers } from 'redux'
import { Auth } from './Auth'
import {Agreements} from './Agreements'
import {Customers} from './Customers'
import {Machineries} from './Machineries'
import {Organizations} from './Organizations'
import {Projects} from './Projects'
import {Workplaces} from './Workplaces'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Auth:Auth,
            Agreements:Agreements,
            Customers:Customers,
            Machineries:Machineries,
            Organizations:Organizations,
            Projects:Projects,
            Workplaces:Workplaces
        })
    );

    return store;
}