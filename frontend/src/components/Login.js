import React, { Component } from "react";
import "../stylesheets/Login.css";
import { updateUsername } from "../redux/ActionCreators";
import { connect } from "react-redux";
import Axios from "axios";

const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateUsername: (username) => dispatch(updateUsername(username)),
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    Axios.post("/auth/", user).then((res) => {
      if (res.data.isLogged) {
        this.props.updateUsername(this.state.username);
        localStorage.setItem("username", this.state.username);
        window.location.href = "/";
      } else {
        console.log("Invalid Login");
      }
    });

    // this.props.updateUsername(this.state.username);
  }

  //WARNING! To be deprecated in React v17. Use  instead.

  render() {
    return (
      <div className="mainContainer bg-dark">
        <div className="container-fluid bg-primary">
          <div className="text-center text-white font-weight-bold">
            <h1 className="p-4">Workplace Management System</h1>
          </div>
        </div>
        <div className="row">
          <div className="container bg-light formbox">
            <h2 className="text-center">
              <b>Login</b>
            </h2>
            <hr className="bg-success horizontal_line" />
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                className="form-control mb-3"
                id="username"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                placeholder="username"
                required
              />
              <input
                type="password"
                className="form-control mb-3"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                placeholder="password"
                required
              />
              <center>
                <button className="btn btn-success btn_login_register">
                  Login
                </button>
              </center>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


/*import React,{useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { useAuth } from "./auth";
import '../stylesheets/Login.css'

function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    function postLogin(e) {
        e.preventDefault();
        axios.post("http://localhost:5000/auth", {
          username: username,
          password: password
        }).then(result => {
          if (result.data.isLogged) {
            setAuthTokens(result.data);
            setLoggedIn(true);
          } else {
            setIsError(true);
          }
        }).catch(e => {
          setIsError(true);
        });
      }

      if (isLoggedIn) {
        return <Redirect to="/" />;
      }

    return (
        
        <div className="mainContainer bg-dark">
                    <div className="container-fluid bg-primary">
                        <div className="text-center text-white font-weight-bold">
                            <h1 className="p-4">Workplace Management System</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="container bg-light formbox">
                            <h2 className="text-center"><b>Login</b></h2>
                            <hr className="bg-success horizontal_line"/>
                            <form onSubmit={postLogin}>
                                <input type="text" className="form-control mb-3" id="username" name="username" value={username} onChange={e => {setUsername(e.target.value);}} placeholder="username" required/> 
                                <input type="password" className="form-control mb-3" id="password" name="password" value={password} onChange={e => {setPassword(e.target.value);}} placeholder="password" required/>
                                <center>
                                    <button className="btn btn-success btn_login_register">Login</button>
                                </center>
                            </form>

                                { isError &&<h3>The username or password provided were incorrect!</h3> }
                        </div>
                    </div>            
                </div>
    )
}

export default Login


/*import React,{Component} from 'react'
import axios from 'axios'

//import { updateUsername } from '../redux/ActionCreators'
//import { connect } from 'react-redux'

/*const mapStateToProps = state => {
    return{
        username: state.username
    }
}

const mapDispatchToProps = dispatch => ({
    updateUsername: username => dispatch(updateUsername(username))
})

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username:'',
            password:'',
            isLoggedIn:false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.postLogin = this.postLogin.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]:value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        this.postLogin();
        //this.props.updateUsername(this.state.username);
    }

    /*postLogin() {
        axios.post("https:/user/login", {
          userName,
          password
        }).then(result => {
          if (result.status === 200) {
            setAuthTokens(result.data);
            setLoggedIn(true);
          } else {
            setIsError(true);
          }
        }).catch(e => {
          setIsError(true);
        });
      }

    render(){
        if (isLoggedIn) {
            return <Redirect to="/" />;
        }else{
            return (
                <div className="mainContainer bg-dark">
                    <div className="container-fluid bg-primary">
                        <div className="text-center text-white font-weight-bold">
                            <h1 className="p-4">Workplace Management System</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="container bg-light formbox">
                            <h2 className="text-center"><b>Login</b></h2>
                            <hr className="bg-success horizontal_line"/>
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" className="form-control mb-3" id="username" name="username" value={this.state.username} onChange={this.handleInputChange} placeholder="username" required/> 
                                <input type="password" className="form-control mb-3" id="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="password" required/>
                                <center>
                                    <button className="btn btn-success btn_login_register">Login</button>
                                </center>
                            </form>
                        </div>
                    </div>            
                </div>
            )
        }
    }*/
//}

//export default connect(mapStateToProps,mapDispatchToProps)(Login)*/