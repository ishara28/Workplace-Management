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
import OneCustomer from "./OneCustomer";

class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      searchValue: "",
    };
  }

  componentDidMount() {
<<<<<<< HEAD
    Axios.get("/customer/",{
      headers: this.props.token
    })
=======
    Axios.get("/customer/")
>>>>>>> Ishara
      .then((res) => this.setState({ customers: res.data }))
      .then(() => console.log(this.state.customers))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Customer</BreadcrumbItem>
        </Breadcrumb>

        {/* Register Modal  */}
<<<<<<< HEAD
        <RegisterModal token={this.props.token}/>
=======
        <RegisterModal />
>>>>>>> Ishara

        {/* Customer Table  */}

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
                <th>Name</th>
                <th>Reg. date</th>
                <th>NIC / Passport</th>
                <th>Address</th>
                <th>Email</th>
                <th>Telephone No.</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.customers
                .filter((customer) => {
                  return (
                    customer.index_no
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    customer.reg_date
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    customer.name
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    customer.nic_passport
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    customer.address
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    customer.telephone
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    customer.description
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    customer.reg_date
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    customer.email
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    customer.status
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase())
                  );
                })
                .map((customer) => {
<<<<<<< HEAD
                  return <OneCustomer customer={customer} token={this.props.token}/>;
=======
                  return <OneCustomer customer={customer} />;
>>>>>>> Ishara
                })}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

export default Customer;
