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
import OneProject from "./OneProject";
import EditModal from "./EditModal";
import { FaSearch } from "react-icons/fa";

export class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: [],
      projectClone: [],
      modal: false,
      successAlertVisible: false,
      editModal: false,
      searchValue: "",
    };
  }

  componentDidMount() {
    Axios.get("/project/")
      .then((res) =>
        this.setState({
          project: res.data,
        })
      )
      // .then(() => console.log(this.state.project))
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
    //setTimeout(() => {
      //this.setState({ successAlertVisible: false });
      //window.location.reload(false);
    //}, 3000);
  };

  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Project</BreadcrumbItem>
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
            Register a project
          </Button>
        </div>

        {/* Projects List  */}
        <div>
          <Table striped bordered hover responsive>
            <thead style={{ backgroundColor: "#23272B", color: "white" }}>
              <tr>
                <th>Index No</th>
                <th>Registered Date</th>
                <th>Owner</th>
                <th>Description</th>
                <th>Estimated Start</th>
                <th>Estimated Days</th>
                <th>Estimated Value</th>
                <th>Status</th>
                <th>Workhouse</th>
                <th>Agent</th>
                <th>Agreement</th>
              </tr>
            </thead>
            <tbody>
              {this.state.project
                .filter((project) => {
                  return (
                    project.index_no.includes(this.state.searchValue) ||
                    project.owner_id.includes(this.state.searchValue) ||
                    project.reg_date.includes(this.state.searchValue) ||
                    project.description.includes(this.state.searchValue) ||
                    project.estimated_start.includes(this.state.searchValue) ||
                    project.estimated_days.includes(this.state.searchValue) ||
                    project.estimated_value.includes(this.state.searchValue) ||
                    project.status.includes(
                      this.state.searchValue.toUpperCase()
                    ) ||
                    project.workhouse_id.includes(this.state.searchValue) ||
                    project.agent_id.includes(this.state.searchValue) ||
                    project.agreement_id.includes(this.state.searchValue)
                  );
                })
                .map((project) => {
                  return <OneProject project={project} />;
                })}
              {/* {this.state.project.map((project) => {
                return <OneProject project={project} />;
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
            Project Successfully Registered!
          </Alert>
        </div>
      </div>
    );
  }
}

export default Project;
