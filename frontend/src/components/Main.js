import React, { Component } from 'react';
import Header from './Header';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './Home';
import Login from './Login'
import Customer from './Customer';
import Machinery from './Machinery';
import Workhouse from './Workhouse';
import Organization from './Organization';
import Agreement from './Agreement';
import Project from './Project';
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return{
        username:state.Auth.username
    }
}

class Main extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        const HomePage = ()=>{
            if(this.props.username==null){
                return(<Home/>)
            }
            else{
                return(<Login/>)
            }
        }

        const CustomerPage = ()=>{
            if(this.props.username==null){
                return(<Customer/>)
            }
            else{
                return(<Login/>)
            }
        }

        const MachineryPage = ()=>{
            if(this.props.username==null){
                return(<Machinery/>)
            }
            else{
                return(<Login/>)
            }
        }

        const WorkhousePage = ()=>{
            if(this.props.username==null){
                return(<Workhouse/>)
            }
            else{
                return(<Login/>)
            }
        }

        const OrganizationPage = ()=>{
            if(this.props.username==null){
                return(<Organization/>)
            }
            else{
                return(<Login/>)
            }
        }

        const AgreementPage = ()=>{
            if(this.props.username==null){
                return(<Agreement/>)
            }
            else{
                return(<Login/>)
            }
        }

        const ProjectPage = ()=>{
            if(this.props.username==null){
                return(<Project/>)
            }
            else{
                return(<Login/>)
            }
        }

        return (
            <>
                {this.props.username==null && <Header/>}
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/customer" component={CustomerPage}/>
                    <Route path="/machinery" component={MachineryPage}/>
                    <Route path="/workhouse" component={WorkhousePage}/>
                    <Route path="/organization" component={OrganizationPage}/>
                    <Route path="/agreement" component={AgreementPage}/>
                    <Route path="/project" component={ProjectPage}/>
                    <Redirect to="/"/>
                </Switch>
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps)(Main))
