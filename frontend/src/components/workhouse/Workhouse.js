import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Alert,
  Table,
  Input,
  InputGroupAddon,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import RegisterModal from "./RegisterModal";
import OneWorkhouse from "./OneWorkhouse";
import EditModal from "./EditModal";
import { FaSearch } from "react-icons/fa";

export class Workhouse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workhouse: [],
      workhouseClone: [],
      modal: false,
      successAlertVisible: false,
      editModal: false,
      searchValue: "",
    };
  }

  componentDidMount() {
    Axios.get("/workhouse/")
      .then((res) =>
        this.setState({
          workhouse: res.data,
        })
      )
      // .then(() => console.log(this.state.workhouse))
      .catch((err) => console.log(err));
  }

  showModal = () => {
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  showEditModal = () => {
    this.setState({ editModal: true });
  };

  closeEditModal = () => {
    this.setState({ editModal: false });
  };

  registrySuccessAlert = () => {
    this.setState({ successAlertVisible: true });
    window.location.reload(false);
  };

  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Workhouse</BreadcrumbItem>
        </Breadcrumb>

        {/* <div className="container-fluid d-flex flex-row-reverse">
          <button className="btn btn-success ml-2">Register</button>
          <input
            type="text"
            className="form-control textbox"
            placeholder="Search by Id"
          />
        </div> */}
        <div style={{ float: "left", width: "300px", marginLeft: 10 }}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <FaSearch style={{ color: "#23272B" }} />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Search"
              value={this.state.searchValue}
              onChange={(e) => this.setState({ searchValue: e.target.value })}
            />
          </InputGroup>
        </div>

        <div style={{ float: "right", margin: 5 }}>
          <Button
            style={{ backgroundColor: "#23272B" }}
            onClick={this.showModal}
          >
            Register a workhouse
          </Button>
        </div>

        {/* Workhouses List  */}
        <div>
          <Table striped bordered hover responsive>
            <thead style={{ backgroundColor: "#23272B", color: "white" }}>
              <tr>
                <th>Index No.</th>
                <th>Registered date</th>
                <th>Status</th>
                <th>Address</th>
                <th>Telephone</th>
                <th>email</th>
                <th>Description</th>
                <th>Customer</th>
              </tr>
            </thead>
            <tbody>
              {this.state.workhouse
                .filter((workhouse) => {
                  return (
                    workhouse.index_no.includes(this.state.searchValue) ||
                    workhouse.reg_date.includes(this.state.searchValue) ||
                    workhouse.status.includes(this.state.searchValue.toUpperCase()) ||
                    workhouse.address.includes(this.state.searchValue) ||
                    workhouse.telephone.includes(this.state.searchValue) ||
                    workhouse.email.includes(this.state.searchValue) ||
                    workhouse.description.includes(this.state.searchValue) ||
                    workhouse.c_id.includes(this.state.searchValue)
                  )
                })
                .map((workhouse) => {
                  return <OneWorkhouse workhouse={workhouse} />;
                })}
              {/* {this.state.workhouse.map((workhouse) => {
                return <OneWorkhouse workhouse={workhouse} />;
              })} */}
            </tbody>
          </Table>
        </div>

        {/* Modal for register */}
        <RegisterModal
          showModal={this.state.modal}
          closeModal={this.closeModal}
          registrySuccessAlert={this.registrySuccessAlert}
        />
        {/* Modal ended */}

        {/* Success alert  */}
        <div
          style={{
            width: 500,
            textAlign: "center",
            alignItems: "center",
            margin: "auto",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <Alert
            style={{ backgroundColor: "#23272B", color: "white" }}
            isOpen={this.state.successAlertVisible}
            toggle={() => this.setState({ successAlertVisible: false })}
          >
            Workhouse Successfully Registered!
          </Alert>
        </div>
      </div>
    );
  }
}

export default Workhouse;
