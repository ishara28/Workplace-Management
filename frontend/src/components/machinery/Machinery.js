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
import Onemachine from "./Onemachine";
import EditModal from "./EditModal";
import { FaSearch } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export class Machinery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      machinery: [],
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
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h2>Machine Successfully Registered!</h2>
            <div style={{ textAlign: "center" }}>
              <Button color="dark" style={{ margin: 3 }} onClick={onClose}>
                OK
              </Button>
            </div>
          </div>
        );
      },
    });
    //alert("Machine Successfully Registered!");
    window.location.reload(false);
    // this.setState({ successAlertVisible: true });
    // setTimeout(() => {
    //   this.setState({ successAlertVisible: false });
    // }, 3000);
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

        {/* Search  */}
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

        <div style={{ float: "right", marginRight: 5, marginBottom: 10 }}>
          <Button
            onClick={this.showModal}
            className = "mr-3 btn-dark"
          >
            Register
          </Button>
        </div>

        {/* Machines List  */}
        <div>
          <Table striped bordered hover responsive>
            <thead className="bg-dark text-white">
              <tr>
                <th>Index No.</th>
                <th>Reg Id</th>
                <th>Registered date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Status</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {this.state.machinery
                .filter((machine) => {
                  return (
                    machine.index_no
                      .toUpperCase()
                      .includes(this.state.searchValue.toUpperCase()) ||
                    machine.reg_id
                      .toUpperCase()
                      .includes(this.state.searchValue.toUpperCase()) ||
                    machine.reg_date
                      .toUpperCase()
                      .includes(this.state.searchValue.toUpperCase()) ||
                    machine.category
                      .toUpperCase()
                      .includes(this.state.searchValue.toUpperCase()) ||
                    machine.description
                      .toUpperCase()
                      .includes(this.state.searchValue.toUpperCase()) ||
                    machine.name
                      .toUpperCase()
                      .includes(this.state.searchValue.toUpperCase()) ||
                    machine.status
                      .toUpperCase()
                      .includes(this.state.searchValue.toUpperCase())
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
