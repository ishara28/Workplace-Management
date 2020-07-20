import React from 'react';
import {Breadcrumb, BreadcrumbItem,Card, CardHeader, CardBody, CardText} from 'reactstrap';
import {Link} from 'react-router-dom';

function Machinery() {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Machinery</BreadcrumbItem>
            </Breadcrumb>

            <div className="container-fluid d-flex flex-row-reverse">
                <button className="btn btn-success ml-2">Register</button>
                <input type="text" className="form-control textbox" placeholder="Search by Id"/>
            </div>

            <div className="container-fluid">
                <Card>
                    <CardHeader>Index no</CardHeader>
                    <CardBody>
                        <CardText>Register date</CardText>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default Machinery
