import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./auth";
import PrivateRoute from '../PrivateRoute';
import Header from './Header';
import Home from './Home';
import Login from './Login'
import Customer from './customers/Customer';
import Machinery from "./machinery/Machinery";
import Workhouse from "./workhouse/Workhouse";
import Organization from './organization/Organization';
import Agreement from './agreements/Agreement';
import Project from './project/Project';

function App(props) {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  const HomePage = ()=>{
    if(authTokens){
        return(<Home/>)
    }
    else{
        return(<Login/>)
    }
}

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        {authTokens && <Header/>}
        
        <Router>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={HomePage} />
            <PrivateRoute path="/customer" component={()=>(<Customer token={authTokens}/>)} />
            <PrivateRoute path="/workhouse" component={()=>(<Workhouse token={authTokens}/>)} />
            <PrivateRoute path="/machinery" component={()=>(<Machinery token={authTokens}/>)} />
            <PrivateRoute path="/organization" component={()=>(<Organization token={authTokens}/>)} />
            <PrivateRoute path="/agreement" component={()=>(<Agreement token={authTokens}/>)} />
            <PrivateRoute path="/project" component={()=>(<Project token={authTokens}/>)} />
            <Redirect to="/"/>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
