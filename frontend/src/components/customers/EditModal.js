import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Col,
  Alert,
} from "reactstrap";
import Axios from "axios";

var tempDate = new Date();
var date =
  tempDate.getFullYear() +
  "-" +
  (tempDate.getMonth() + 1) +
  "-" +
  tempDate.getDate();

const currDate = date;
// const index_no =
//   "M-" +
//   tempDate.getFullYear().toString().slice(2) +
//   (tempDate.getMonth() + 1).toString() +
//   tempDate.getDate().toString() +
//   "-" +
//   tempDate.getHours() +
//   "" +
//   tempDate.getMinutes() +
//   "" +
//   tempDate.getSeconds();

export class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      name: "",
      nic_passport: "",
      address: "",
      isFieldsEmpty: false,
    };
  }

  componentDidMount() {
    console.log("Machine", this.props.machine);
    this.setState({
      reg_id: this.props.machine.reg_id,
      category: this.props.machine.category,
      owner_id: this.props.machine.owner_id,
      description: this.props.machine.description,
    });
    Axios.get("/customer/")
      .then((res) => this.setState({ customers: res.data }))
      //   .then(() => console.log(this.state.customers))
      .catch((err) => console.log(err));
  }

  closeBtn = (
    <button className="close" onClick={this.props.closeEditModal}>
      &times;
    </button>
  );

  updateData = () => {
    const newMachinery = {
      reg_id: this.state.reg_id,
      category: this.state.category,
      description: this.state.description,
      owner_id: this.state.owner_id,
    };
    if (
      this.state.reg_id &&
      this.state.description &&
      this.state.category &&
      this.state.owner_id
    ) {
      Axios.post("machinery/update/" + this.props.machine.m_id, newMachinery)
        .then((res) => console.log(res.data))
        .then(() => {
          this.props.closeEditModal();
          this.props.registrySuccessAlert();
        });
    } else {
      this.setState({ isFieldsEmpty: true });
    }
  };

  render() {
    return (
      <div>
        <Modal size="lg" isOpen={this.props.showEditModal}>
          <ModalHeader close={this.closeBtn}>Edit Machinery</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Name
                </Label>
                <Col sm={10}>
                  <Input
                    name="index_no"
                    id="exampleEmail"
                    placeholder="Reg id here..."
                    value={this.props.name}
                    onChange={(e) => this.setState({ reg_id: e.target.value })}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleSelect" sm={2}>
                  Category
                </Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    value={this.state.category}
                    onChange={(e) =>
                      this.setState({ category: e.target.value })
                    }
                  >
                    <option>Choose Category</option>
                    <option>VEHICLE</option>
                    <option>TOOL</option>
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleSelect" sm={2}>
                  Owner
                </Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    value={this.state.owner}
                    onChange={(e) =>
                      this.setState({ owner_id: e.target.value })
                    }
                  >
                    <option>Choose Owner</option>
                    {this.state.customers.map((customer) => {
                      return (
                        <option value={customer.c_id}>
                          {customer.index_no + " - " + customer.name}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleText" sm={2}>
                  Description
                </Label>
                <Col sm={10}>
                  <Input
                    type="textarea"
                    name="text"
                    id="exampleText"
                    value={this.state.description}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
            </Form>

            {this.state.isFieldsEmpty && (
              <Alert color="danger">Check whether all inputs are filled!</Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              style={{ backgroundColor: "#23272B" }}
              onClick={this.updateData}
            >
              Update Now
            </Button>{" "}
            <Button color="secondary" onClick={this.props.closeEditModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditModal;
