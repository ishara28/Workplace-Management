import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { connect } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {fetchWorkhouses} from '../redux/ActionCreators'

const mapStateToProps = (state) => ({
    Workhouses:state.Workhouses
})

const mapDispatchToProps = (dispatch) => ({
    fetchWorkhouses:()=>dispatch(fetchWorkhouses())
})

class Workhouse extends Component {
    componentDidMount(){
        fetchWorkhouses
    }

    render(){
        return (
            <>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Workhouse</BreadcrumbItem>
                </Breadcrumb>

                <div className="container-fluid d-flex flex-row-reverse">
                    <button className="btn btn-success ml-2">Register</button>
                    <input type="text" className="form-control textbox" placeholder="Search by Id"/>
                </div>
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Workhouse))
