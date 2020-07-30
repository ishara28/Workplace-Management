import React, { Component } from "react";
import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
  InputGroup,
  InputGroupAddon,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroupText,
} from "reactstrap";
import EditModal from "./EditModal";
import Axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export class OneProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      editModal: false,
      successAlertVisible: false,
      blockReason: "",
      blockModal: false,
    };
  }

  toggle = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        dropdownOpen: !prevState.dropdownOpen,
      };
    });
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
            <h2>Updated successfully!</h2>
            <div style={{ textAlign: "center" }}>
              <Button color="info" style={{ margin: 3 }} onClick={onClose}>
                OK
              </Button>
            </div>
          </div>
        );
      },
    });
    //alert("Updated successfully!");
    window.location.reload(false);
    // this.setState({ successAlertVisible: true });
    // setTimeout(() => {
    //   this.setState({ successAlertVisible: false });
    // }, 1000);
  };

  startProject = () => {
    Axios.post("/project/start/" + this.props.project.p_id)
      .then(() => window.location.reload(false))
      .catch((err) => console.log(err));
  };

  endProject = () => {
    Axios.post("/project/end/" + this.props.project.p_id)
      .then(() => window.location.reload(false))
      .catch((err) => console.log(err));
  };

  closeProject = () => {
    Axios.post("/project/close/" + this.props.project.p_id)
      .then(() => window.location.reload(false))
      .catch((err) => console.log(err));
  };

  cancelProject = () => {
    Axios.post("/project/cancel/" + this.props.project.p_id)
      .then(() => window.location.reload(false))
      .catch((err) => console.log(err));
  };

  startDialog = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h2>Do you want to start?</h2>
            <div style={{ textAlign: "center" }}>
              <Button style={{ margin: 3 }} onClick={onClose}>
                No
              </Button>
              <Button
                color="success"
                style={{ margin: 3 }}
                onClick={() => {
                  this.startProject();
                  onClose();
                }}
              >
                Yes, Start
              </Button>
            </div>
          </div>
        );
      },
    });
  };

  endDialog = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h2>Are you sure to end?</h2>
            <div style={{ textAlign: "center" }}>
              <Button style={{ margin: 3 }} onClick={onClose}>
                No
              </Button>
              <Button
                color="danger"
                style={{ margin: 3 }}
                onClick={() => {
                  this.endProject();
                  onClose();
                }}
              >
                Yes, End
              </Button>
            </div>
          </div>
        );
      },
    });
  };

  closeDialog = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h2>Are you sure to close?</h2>
            <div style={{ textAlign: "center" }}>
              <Button style={{ margin: 3 }} onClick={onClose}>
                No
              </Button>
              <Button
                color="danger"
                style={{ margin: 3 }}
                onClick={() => {
                  this.closeProject();
                  onClose();
                }}
              >
                Yes, Close
              </Button>
            </div>
          </div>
        );
      },
    });
  };

  cancelDialog = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h2>Are you sure to cancel?</h2>
            <div style={{ textAlign: "center" }}>
              <Button style={{ margin: 3 }} onClick={onClose}>
                No
              </Button>
              <Button
                color="danger"
                style={{ margin: 3 }}
                onClick={() => {
                  this.cancelProject();
                  onClose();
                }}
              >
                Yes, Cancel
              </Button>
            </div>
          </div>
        );
      },
    });
  };

  render() {
    return (
      <tr>
        <th scope="row">{this.props.project.index_no}</th>
        <td>{this.props.project.reg_date.slice(0, 10)}</td>
        <td>{this.props.project.owner_id}</td>
        <td>
          <textarea name="" id="" cols="35" disabled>
            {this.props.project.description}
          </textarea>
        </td>
        <td>{this.props.project.estimated_start.slice(0, 10)}</td>
        <td>{this.props.project.estimated_days}</td>
        <td>{this.props.project.estimated_value}</td>
        <th>{this.props.project.status}</th>
        <th>{this.props.project.workhouse_id}</th>
        <th>{this.props.project.agent_id}</th>
        <th>{this.props.project.agreement_id}</th>
        <td>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret size="sm" color="info">
              Actions
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                onClick={this.showEditModal}
              >
                Update
              </DropdownItem>
              {this.props.project.status!=="STARTED" && <DropdownItem
                onClick={this.startDialog}
              >
                Start
              </DropdownItem>}
              {this.props.project.status!=="DONE" && <DropdownItem
                onClick={this.endDialog}
              >
                End
              </DropdownItem>}
              {this.props.project.status!=="PAYED" && <DropdownItem
                onClick={this.closeDialog}
              >
                Close
              </DropdownItem>}
              {this.props.project.status!=="CANCEL" && <DropdownItem
                onClick={this.cancelDialog}
              >
                Cancel
              </DropdownItem>}
            </DropdownMenu>
          </ButtonDropdown>
        </td>

        {/* Success alert  */}
        <div
          style={{
            width: 500,
            textAlign: "center",
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
            Details Updated Successfully!
          </Alert>
        </div>
        {/* Edit Modal  */}
        <EditModal
          showEditModal={this.state.editModal}
          closeEditModal={this.closeEditModal}
          project={this.props.project}
          registrySuccessAlert={this.registrySuccessAlert}
        />
        {/* Edit modal ended  */}
      </tr>
    );
  }
}

export default OneProject;
