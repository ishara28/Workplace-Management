import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

function Organization() {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Organizations</BreadcrumbItem>
            </Breadcrumb>

            <div className="container-fluid d-flex flex-row-reverse">
                <button className="btn btn-success ml-2">Register</button>
                <input type="text" className="form-control textbox" placeholder="Search by Id"/>
            </div>
        </>
    )
}

export default Organization
