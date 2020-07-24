import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

function Agreement() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Agreements</BreadcrumbItem>
      </Breadcrumb>
    </>
  );
}

export default Agreement;
