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
import { useAuth } from "../auth";

export class OneSite extends Component {
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

  toggleBlock = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        blockModal: !prevState.blockModal,
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
              <Button color="success" style={{ margin: 3 }} onClick={onClose}>
                OK
              </Button>
            </div>
          </div>
        );
      },
    });
    //alert("Updated successfully!");
    window.location.reload(false);
  };

  activeSite = () => {
    Axios.post("/site/active/" + this.props.site.index_no)
      .then(() => window.location.reload(false))
      .catch((err) => console.log(err));
  };

  inactiveSite = () => {
    Axios.post("/site/inactive/" + this.props.site.index_no)
      .then(() => window.location.reload(false))
      .catch((err) => console.log(err));
  };

  removeSite = () => {
    Axios.post("/site/remove/" + this.props.site.index_no)
      .then(() => window.location.reload(false))
      .catch((err) => console.log(err));
  };

  activeDialog = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h2>Are you sure to active?</h2>
            {/* <p>You want to delete this file?</p> */}
            <div style={{ textAlign: "center" }}>
              <Button style={{ margin: 3 }} onClick={onClose}>
                No
              </Button>
              <Button
                color="danger"
                style={{ margin: 3 }}
                onClick={() => {
                  this.activeSite();
                  onClose();
                }}
              >
                Yes, Active
              </Button>
            </div>
          </div>
        );
      },
    });
  };

  inactiveDialog = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h2>Are you sure to inactive?</h2>
            {/* <p>You want to delete this file?</p> */}
            <div style={{ textAlign: "center" }}>
              <Button style={{ margin: 3 }} onClick={onClose}>
                No
              </Button>
              <Button
                color="danger"
                style={{ margin: 3 }}
                onClick={() => {
                  this.inactiveSite();
                  onClose();
                }}
              >
                Yes, Inactive
              </Button>
            </div>
          </div>
        );
      },
    });
  };

  removeDialog = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h2>Are you sure to remove?</h2>
            {/* <p>You want to delete this file?</p> */}
            <div style={{ textAlign: "center" }}>
              <Button style={{ margin: 3 }} onClick={onClose}>
                No
              </Button>
              <Button
                color="danger"
                style={{ margin: 3 }}
                onClick={() => {
                  this.removeSite();
                  onClose();
                }}
              >
                Yes, Remove
              </Button>
            </div>
          </div>
        );
      },
    });
  };

  blockSite = () => {
    var tempDate = new Date();
    var date =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();

    const currDate = date;

    var blockedSite = {
      blocked_date: currDate,
      reason: this.state.blockReason,
    };
    if (this.state.blockReason) {
      Axios.post("/site/block/" + this.props.site.s_id, blockedSite)
        .then((res) => console.log(res.data))
        .then(() => {
          this.toggleBlock();
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <tr>
        <th scope="row">{this.props.site.index_no}</th>
        <td>{this.props.site.reg_date.slice(0, 10)}</td>
        <td>{this.props.site.name}</td>
        <td>
          <textarea name="" id="" cols="35" disabled>
            {this.props.site.description}
          </textarea>
        </td>
        <td>{this.props.site.address}</td>
        <td>{this.props.site.telephone}</td>
        <td>{this.props.site.email}</td>
        <td>{this.props.site.status}</td>
        <td>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret size="sm" className="btn-success">
              Actions
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                onClick={this.showEditModal}
              >
                Edit
              </DropdownItem>
              {this.props.site.status!=="ACTIVE" && <DropdownItem
                onClick={this.activeDialog}
              >
                Active
              </DropdownItem>}
              {this.props.site.status!=="INACTIVE" && <DropdownItem
                onClick={this.inactiveDialog}
              >
                Inactive
              </DropdownItem>}
              {this.props.site.status!=="REMOVED" && <DropdownItem
                onClick={this.removeDialog}
              >
                Remove
              </DropdownItem>}
              {this.props.site.status!=="BLOCKED" && <DropdownItem
                onClick={this.toggleBlock}
              >
                Block
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
            className="bg-success text-white"
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
          site={this.props.site}
          registrySuccessAlert={this.registrySuccessAlert}
        />
        {/* Edit modal ended  */}

        {/* Confirm block modal  */}
        <div>
          <Modal isOpen={this.state.blockModal} toggle={this.toggleBlock}>
            <ModalHeader toggle={this.toggleBlock} className="bg-success text-white">
              Do you want to block {this.props.site.index_no}?
            </ModalHeader>
            <ModalBody>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Reason</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="reason here..."
                  value={this.state.blockReason}
                  onChange={(e) =>
                    this.setState({ blockReason: e.target.value })
                  }
                />
              </InputGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.blockSite}>
                Block
              </Button>
              <Button color="secondary" onClick={this.toggleBlock}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </tr>
    );
  }
}

export default OneSite;
