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
} from "reactstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import RegisterModal from "./RegisterModal";
import Onemachine from "./Onemachine";
import EditModal from "./EditModal";

export class Machinery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      machinery: [],
      machineryClone: [],
      modal: false,
      successAlertVisible: false,
      editModal: false,
      searchIndex: "",
      searchRegId: "",
      searchRegDate: "",
      searchCategory: "",
      searchDescription: "",
      searchStatus: "",
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
            <thead style={{ backgroundColor: "#23272B" }}>
              <tr>
                <th>
                  <Input
                    size="sm"
                    placeholder="Search Index"
                    value={this.state.searchIndex}
                    onChange={(e) =>
                      this.setState({ searchIndex: e.target.value })
                    }
                  />
                </th>
                <th>
                  <Input
                    size="sm"
                    placeholder="Search Reg Id"
                    value={this.state.searchRegId}
                    onChange={(e) =>
                      this.setState({ searchRegId: e.target.value })
                    }
                  />
                </th>
                <th>
                  <Input
                    size="sm"
                    placeholder="Search Reg. Date"
                    value={this.state.searchRegDate}
                    onChange={(e) =>
                      this.setState({ searchRegDate: e.target.value })
                    }
                  />
                </th>
                <th>
                  <Input
                    size="sm"
                    placeholder='Search Category'
                    // value={this.state.searchCategory}
                    onSelect={(e) =>
                      this.setState({ searchCategory: e.target.value }, () =>
                        console.log(this.state.searchCategory)
                      )
                    }
                  ></Input>
                </th>
                <th>
                  <Input
                    size="sm"
                    placeholder="Search"
                    value={this.state.searchDescription}
                    onChange={(e) =>
                      this.setState({ searchDescription: e.target.value })
                    }
                  />
                </th>
                <th>
                  <Input
                    size="sm"
                    placeholder="Search Status"
                    value={this.state.searchStatus}
                    onChange={(e) =>
                      this.setState({ searchStatus: e.target.value })
                    }
                  />
                </th>
              </tr>
            </thead>
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
                    machine.index_no.includes(this.state.searchIndex) &&
                    machine.reg_id.includes(this.state.searchRegId) &&
                    machine.reg_date.includes(this.state.searchRegDate) &&
                    machine.description.includes(
                      this.state.searchDescription
                    ) &&
                    machine.index_no.includes(this.state.searchIndex) &&
                    machine.status.includes(
                      this.state.searchStatus.toUpperCase()
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
