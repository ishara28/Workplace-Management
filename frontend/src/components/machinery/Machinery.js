import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardHeader,
  CardBody,
  CardText,
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
import Onemachine from "./Onemachine";
import EditModal from "./EditModal";
import { FaSearch } from "react-icons/fa";

export class Machinery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      machinery: [],
      machineryClone: [],
      modal: false,
      successAlertVisible: false,
      editModal: false,
      searchValue: "",
    };
  }

  componentDidMount() {
    Axios.get("/machinery/")
      .then((res) =>
        this.setState({
          machinery: res.data,
        })
      )
      // .then(() => console.log(this.state.machinery))
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
    setTimeout(() => {
      this.setState({ successAlertVisible: false });
      window.location.reload(false);
    }, 3000);
  };

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
            Register a machinery
          </Button>
        </div>

        {/* Machines List  */}
        <div>
          <Table striped bordered hover responsive>
            <thead style={{ backgroundColor: "#23272B", color: "white" }}>
              <tr>
                <th>Index No.</th>
                <th>Reg Id</th>
                <th>Registered date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.machinery
                .filter((machine) => {
                  return (
                    machine.index_no.includes(this.state.searchValue) ||
                    machine.reg_id.includes(this.state.searchValue) ||
                    machine.reg_date.includes(this.state.searchValue) ||
                    machine.category.includes(
                      this.state.searchValue.toUpperCase()
                    ) ||
                    machine.description.includes(this.state.searchValue) ||
                    machine.status.includes(
                      this.state.searchValue.toUpperCase()
                    )
                  );
                })
                .map((machine) => {
                  return <Onemachine machine={machine} />;
                })}
              {/* {this.state.machinery.map((machine) => {
                return <Onemachine machine={machine} />;
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
            Machine Successfully Registered!
          </Alert>
        </div>
      </div>
    );
  }
}

export default Machinery;
