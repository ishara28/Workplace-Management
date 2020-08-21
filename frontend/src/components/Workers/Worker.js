import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Table,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import RegisterModal from "./RegisterModal";
import { FaSearch } from "react-icons/fa";
import OneWorker from "./OneWorker";

class Workers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workers: [],
      searchValue: "",
    };
  }

  componentDidMount() {
    Axios.get("/worker/")
      .then((res) => this.setState({ workers: res.data }))
      .then(() => console.log(this.state.workers))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Workers</BreadcrumbItem>
        </Breadcrumb>

        {/* Register Modal  */}
        <RegisterModal />

        {/* Worker Table  */}

        <div
          style={{
            float: "left",
            width: "300px",
            marginLeft: 10,
            marginBottom: 10,
          }}
        >
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <FaSearch style={{ color: "#fb15c9" }} />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Search"
              value={this.state.searchValue}
              onChange={(e) => this.setState({ searchValue: e.target.value })}
            />
          </InputGroup>
        </div>

        <div>
          <Table striped bordered hover responsive size="sm">
            <thead style={{ backgroundColor: "#fb15c9", color: "white" }}>
              <tr>
                <th>Index No.</th>
                <th>NIC / Passport</th>
                <th>Name</th>
                <th>Register Date</th>
                <th>Current Site</th>
                <th>Description</th>
                <th>Address</th>
                <th>Telephone</th>
                <th>Email</th>                
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.workers
                .filter((worker) => {
                  return (
                    worker.index_no
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    worker.reg_date
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    worker.name
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    worker.nic_passport
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    worker.address
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    worker.telephone
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    worker.description
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    worker.reg_date
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    worker.email
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    worker.status
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase())
                  );
                })
                .map((worker) => {
                  return <OneWorker worker={worker} />;
                })}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

export default Workers;
