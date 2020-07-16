import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

function Workhouse() {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Workhouse</BreadcrumbItem>
            </Breadcrumb>

            
        </>
    )
}

export default Workhouse
