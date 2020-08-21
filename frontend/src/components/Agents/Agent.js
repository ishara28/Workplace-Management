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
import OneAgent from "./OneAgent";

class Agent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agents: [],
      searchValue: "",
    };
  }

  componentDidMount() {
    Axios.get("/agent/")
      .then((res) => this.setState({ agents: res.data })
          ,(err)=>{if(err.response.status===401){
            localStorage.removeItem("username");
            window.location.reload(true);
          }
        }
      )
      .then(() => console.log(this.state.agents))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Agents</BreadcrumbItem>
        </Breadcrumb>

        {/* Register Modal  */}
        <RegisterModal />

        {/* Agent Table  */}

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
                <FaSearch style={{ color: 'brown' }} />
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
            <thead style={{ backgroundColor: "brown", color: "white" }}>
              <tr>
                <th>Index No.</th>
                <th>NIC / Passport</th>
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
              {this.state.agents
                .filter((agent) => {
                  return (
                    agent.index_no
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    agent.reg_date
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    agent.name
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    agent.nic_passport
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    agent.address
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    agent.telephone
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    agent.description
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    agent.reg_date
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    agent.email
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    agent.status
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase())
                  );
                })
                .map((agent) => {
                  return <OneAgent agent={agent} />;
                })}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

export default Agent;
