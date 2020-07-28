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

export class OneWorkhouse extends Component {
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
    alert("Updated successfully!");
    window.location.reload(false);
    // this.setState({ successAlertVisible: true });
    // setTimeout(() => {
    //   this.setState({ successAlertVisible: false });
    // }, 1000);
  };

  removeWorkhouse = () => {
    Axios.post("/workhouse/remove/" + this.props.workhouse.index_no)
      .then(() => window.location.reload(false))
      .catch((err) => console.log(err));
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
                  this.removeWorkhouse();
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

  blockWorkhouse = () => {
    var tempDate = new Date();
    var date =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();

    const currDate = date;

    var blockedWorkhouse = {
      blocked_date: currDate,
      reason: this.state.blockReason,
    };
    if (this.state.blockReason) {
      console.log(blockedWorkhouse);
      Axios.post("/workhouse/block/" + this.props.workhouse.index_no, blockedWorkhouse)
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
        <th scope="row">{this.props.workhouse.index_no}</th>
        <td>{this.props.workhouse.reg_date.slice(0, 10)}</td>
        <th>{this.props.workhouse.status}</th>
        <td>{this.props.workhouse.address}</td>
        <td>{this.props.workhouse.telephone}</td>
        <td>{this.props.workhouse.email}</td>
        <td>
          <textarea name="" id="" cols="35" disabled>
            {this.props.workhouse.description}
          </textarea>
        </td>
        <td>{this.props.workhouse.c_id}</td>
        <td>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret size="sm">
              Operation
            </DropdownToggle>
            <DropdownMenu
              style={{ backgroundColor: "#23272B", color: "white" }}
            >
              <DropdownItem
                style={{ color: "white" }}
                onClick={this.showEditModal}
              >
                Edit
              </DropdownItem>
              <DropdownItem
                style={{ color: "white" }}
                onClick={this.removeDialog}
              >
                Remove
              </DropdownItem>
              <DropdownItem
                style={{ color: "white" }}
                onClick={this.toggleBlock}
              >
                Block
              </DropdownItem>
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
          workhouse={this.props.workhouse}
          registrySuccessAlert={this.registrySuccessAlert}
        />
        {/* Edit modal ended  */}

        {/* Confirm block modal  */}
        <div>
          <Modal isOpen={this.state.blockModal} toggle={this.toggleBlock}>
            <ModalHeader toggle={this.toggleBlock}>
              Do you want to block "{this.props.workhouse.index_no}"?
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
              <Button color="danger" onClick={this.blockWorkhouse}>
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

export default OneWorkhouse;
