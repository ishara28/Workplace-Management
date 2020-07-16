import React from 'react';
import Header from './Header';
import { Switch, Route, Redirect} from 'react-router-dom';
import Home from './Home';
import Customer from './Customer';
import Machinery from './Machinery';
import Workhouse from './Workhouse';
import Organization from './Organization';
import Agreement from './Agreement';
import Project from './Project';

function Main() {
    return (
        <>
            <Header/>
            <Switch>
                <Route path="/home" component={()=><Home/>}/>
                <Route path="/customer" component={()=><Customer/>}/>
                <Route path="/machinery" component={()=><Machinery/>}/>
                <Route path="/workhouse" component={()=><Workhouse/>}/>
                <Route path="/organization" component={()=><Organization/>}/>
                <Route path="/agreement" component={()=><Agreement/>}/>
                <Route path="/project" component={()=><Project/>}/>
                <Redirect to="/home"/>
            </Switch>
        </>
    )
}

export default Main
