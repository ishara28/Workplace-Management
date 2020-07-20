import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';




class Customer extends Component {
    componentDidMount(){

    }

    render(){
        return (
            <>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Customer</BreadcrumbItem>
                </Breadcrumb>

                <div className="container-fluid d-flex flex-row-reverse">
                    <button className="btn btn-success ml-2">Register</button>
                    <input type="text" className="form-control textbox" placeholder="Search by Id"/>
                </div>

                <div className="container-fluid">

                    <div className="row">
                        <div className="col-6">
                            <Link to="/customer">
                                <button className="btn btn-primary custom_card">
                                    <h2>Register Customers</h2>
                                </button>
                            </Link>
                        </div>
                        <div className="col-6">
                        <Link to="/machinery">
                                <button className="btn btn-success custom_card">
                                    <h2>Update Customers</h2>
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <Link to="/customer">
                                <button className="btn btn-danger custom_card">
                                    <h2>Remove Customers</h2>
                                </button>
                            </Link>
                        </div>
                        <div className="col-6">
                        <Link to="/machinery">
                                <button className="btn btn-dark custom_card">
                                    <h2>Block agents</h2>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Customer