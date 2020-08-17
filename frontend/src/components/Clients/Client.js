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
import OneClient from "./OneClient";

class Client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: [],
      searchValue: "",
    };
  }

  componentDidMount() {
    Axios.get("/customer/")
      .then((res) => this.setState({ clients: res.data }))
      .then(() => console.log(this.state.clients))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Clients</BreadcrumbItem>
        </Breadcrumb>

        {/* Register Modal  */}
        <RegisterModal />

        {/* Client Table  */}

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
                <FaSearch style={{ color: "#0069D9" }} />
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
            <thead style={{ backgroundColor: "#0069D9", color: "white" }}>
              <tr>
                <th>Index No.</th>
                <th>NIC / Passport/ Reg. ID</th>
                <th>Name</th>
                <th>Register Date</th>
                <th>Description</th>
                <th>Address</th>
                <th>Telephone</th>
                <th>Email</th>                
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.clients
                .filter((client) => {
                  return (
                    client.index_no
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    client.reg_date
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    client.name
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    client.nic_passport
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    client.address
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    client.telephone
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    client.description
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    client.reg_date
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    client.email
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    client.status
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase())
                  );
                })
                .map((client) => {
                  return <OneClient client={client} />;
                })}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

export default Client;
