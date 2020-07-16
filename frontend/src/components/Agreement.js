import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

function Agreement() {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Agreements</BreadcrumbItem>
            </Breadcrumb>
        </>
    )
}

export default Agreement
