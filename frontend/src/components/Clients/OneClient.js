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

export class OneClient extends Component {
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
              <Button color="primary" style={{ margin: 3 }} onClick={onClose}>
                OK
              </Button>
            </div>
          </div>
        );
      },
    });
    window.location.reload(false);
    // this.setState({ successAlertVisible: true });
    // setTimeout(() => {
    //   this.setState({ successAlertVisible: false });
    // }, 1000);
  };

  activeClient = () => {
    Axios.post("/client/active/" + this.props.client.c_id)
      .then(() => window.location.reload(false)
        ,(err)=>{if(err.response.status===401){
          localStorage.removeItem("username");
          window.location.reload(true);
        }
      }
      )
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
              <Button
                color="danger"
                style={{ margin: 3 }}
                onClick={() => {
                  this.activeClient();
                  onClose();
                }}
              >
                Yes, Active
              </Button>
              <Button style={{ margin: 3 }} onClick={onClose}>
                No
              </Button>
            </div>
          </div>
        );
      },
    });
  };

  inactiveClient = () => {
    Axios.post("/client/inactive/" + this.props.client.c_id)
      .then(() => window.location.reload(false)
        ,(err)=>{if(err.response.status===401){
          localStorage.removeItem("username");
          window.location.reload(true);
        }
      }
      )
      .catch((err) => console.log(err));
  };

  inactiveDialog = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h2>Are you sure to inactive?</h2>
              <div style={{ textAlign: "center" }}>
              <Button
                color="danger"
                style={{ margin: 3 }}
                onClick={() => {
                  this.inactiveClient();
                  onClose();
                }}
              >
                Yes, Inactive
              </Button>
              <Button style={{ margin: 3 }} onClick={onClose}>
                No
              </Button>
            </div>
          </div>
        );
      },
    });
  };


  removeClient = () => {
    Axios.post("/client/remove/" + this.props.client.c_id)
      .then(() => window.location.reload(false)
        ,(err)=>{if(err.response.status===401){
          localStorage.removeItem("username");
          window.location.reload(true);
        }
      }
      )
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
              <Button
                color="danger"
                style={{ margin: 3 }}
                onClick={() => {
                  this.removeClient();
                  onClose();
                }}
              >
                Yes, Remove
              </Button>
              <Button style={{ margin: 3 }} onClick={onClose}>
                No
              </Button>
            </div>
          </div>
        );
      },
    });
  };

  blockClient = () => {
    var tempDate = new Date();
    var date =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();

    const currDate = date;

    var blockedClient = {
      c_id:this.props.client.c_id,
      blocked_date: currDate,
      reason: this.state.blockReason,
    };
    if (this.state.blockReason) {
      Axios.post("client/block/" + this.props.client.c_id, blockedClient)
        .then((res) => console.log(res.data)
        ,(err)=>{if(err.response.status===401){
          localStorage.removeItem("username");
          window.location.reload(true);
        }
      }
        )
        .then(() => {
          this.toggleBlock();
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <tr style={{ fontSize: 15 }}>
        <th scope="row">{this.props.client.index_no}</th>
        <td>{this.props.client.nic_passport}</td>
        <td>{this.props.client.name}</td>
        <td>{this.props.client.reg_date.slice(0, 10)}</td>
        <td>
          <textarea name="" id="" cols="25" disabled>
            {this.props.client.description}
          </textarea>
        </td>
        <td>
          <textarea name="" id="" cols="25" disabled>
            {this.props.client.address}
          </textarea>
        </td>
        <td>{this.props.client.telephone}</td>
        <td>{this.props.client.email}</td>
        <th>{this.props.client.status}</th>
        <td>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret size="sm" color="primary">
              Actions
            </DropdownToggle>
            <DropdownMenu
              right
            >
              <DropdownItem
                onClick={this.showEditModal}
              >
                Update
              </DropdownItem>
              {this.props.client.status!=="ACTIVE" && <DropdownItem
                onClick={this.activeDialog}
              >
                Active
              </DropdownItem>}
              {this.props.client.status!=="INACTIVE" && <DropdownItem
                onClick={this.inactiveDialog}
              >
                Inactive
              </DropdownItem>}
              {this.props.client.status!=="REMOVED" && <DropdownItem
                onClick={this.removeDialog}
              >
                Remove
              </DropdownItem>}
              {this.props.client.status!=="BLOCKED" &&  <DropdownItem
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
          client={this.props.client}
          registrySuccessAlert={this.registrySuccessAlert}
        />
        {/* Edit modal ended 

        {/* Confirm block modal  */}
        <div>
          <Modal isOpen={this.state.blockModal} toggle={this.toggleBlock}>
            <ModalHeader toggle={this.toggleBlock}>
              Do you want to block "{this.props.client.index_no}"?
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
              <Button color="danger" onClick={this.blockClient}>
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

export default OneClient;
