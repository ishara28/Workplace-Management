import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

export class Machinery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      machinery: [],
    };
  }

  componentDidMount() {
    Axios.get("/machinery/")
      .then((res) =>
        this.setState({
          machinery: res.data,
        })
      )
      .then(() => console.log(this.state.machinery))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Machinery</BreadcrumbItem>
        </Breadcrumb>

        {/* <div className="container-fluid d-flex flex-row-reverse">
          <button className="btn btn-success ml-2">Register</button>
          <input
            type="text"
            className="form-control textbox"
            placeholder="Search by Id"
          />
        </div> */}

        <div style={{ float: "right", marginRight: 5 }}>
          <Button style={{ backgroundColor: "#23272B" }}>
            Register a machinery
          </Button>{" "}
        </div>
      </div>
    );
  }
}

export default Machinery;
