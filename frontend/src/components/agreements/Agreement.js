import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import EditModal from "./EditModal";
import RegisterModal from "./RegisterModal";
import { FaSearch } from "react-icons/fa";
import OneAgreement from "./OneAgreement";
import Axios from "axios";

export class Agreement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agreements: [],
      searchValue: "",
    };
  }

  componentDidMount() {
    Axios.get("/agreement/")
      .then((res) =>
        this.setState({
          agreements: res.data,
        })
      )
      .then(() => console.log(this.state.agreements));
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Agreements</BreadcrumbItem>
        </Breadcrumb>

        {/* Register Modal  */}
        <RegisterModal />

        {/* Agreement Table  */}
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
                <FaSearch style={{ color: "#7a1d63" }} />
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
            <thead style={{ backgroundColor: "#7a1d63", color: "white" }}>
              <tr>
                <th>Index No.</th>
                <th>Reg. date</th>
                <th>Reg. Id</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.agreements
                .filter((agreement) => {
                  return (
                    agreement.index_no
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    agreement.reg_id
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    agreement.description
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    agreement.reg_date
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    agreement.start_date
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    agreement.status
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    agreement.end_date
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase())
                  );
                })
                .map((agreement) => {
                  return <OneAgreement agreement={agreement} />;
                })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Agreement;
