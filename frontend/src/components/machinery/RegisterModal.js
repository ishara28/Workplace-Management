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

export class RegisterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      index_no: "",
      reg_date: currDate,
      status: "ACTIVE",
      reg_id: "",
      category: "",
      owner_id: "",
      description: "",
      isFieldsEmpty: false,
    };
  }

  componentDidMount() {
    Axios.get("/customer/")
      .then((res) => this.setState({ customers: res.data }))
      .then(() => console.log(this.state.customers))
      .catch((err) => console.log(err));
  }

  closeBtn = (
    <button className="close" onClick={this.props.closeModal}>
      &times;
    </button>
  );

  submitData = () => {
    var tempDate = new Date();
    const index_no =
      "M-" +
      tempDate.getFullYear().toString().slice(2) +
      (tempDate.getMonth() + 1).toString() +
      tempDate.getDate().toString() +
      "-" +
      tempDate.getHours() +
      tempDate.getMinutes() +
      tempDate.getSeconds();

    this.setState(
      {
        index_no: index_no,
      },
      () => {
        const newMachinery = {
          index_no: this.state.index_no,
          reg_id: this.state.reg_id,
          reg_date: this.state.reg_date,
          status: this.state.status,
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
          Axios.post("machinery/register", newMachinery)
            .then((res) => console.log(res.data))
            .then(() => {
              this.props.closeModal();
              this.props.registrySuccessAlert();
            });
        } else {
          this.setState({ isFieldsEmpty: true });
        }
      }
    );
  };

  render() {
    return (
      <div>
        <Modal size="lg" isOpen={this.props.showModal}>
          <ModalHeader
            style={{ backgroundColor: "#23272B", color: "white" }}
            close={this.closeBtn}
          >
            Machinery Register
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Reg id
                </Label>
                <Col sm={10}>
                  <Input
                    name="index_no"
                    id="exampleEmail"
                    placeholder="Reg id here..."
                    value={this.state.reg_id}
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
                <Label for="browser" sm={2}>
                  Owner
                </Label>
                <Col sm={10}>
                  <Input
                    list="browsers"
                    name="browser"
                    id="browser"
                    // value={this.state.owner}
                    onChange={(e) =>
                      this.setState({ owner_id: e.target.value })
                    }
                  ></Input>
                  <datalist id="browsers">
                    {this.state.customers.map((customer) => {
                      return (
                        <option value={customer.c_id}>
                          {customer.index_no + " - " + customer.name}
                        </option>
                      );
                    })}
                  </datalist>
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
              onClick={this.submitData}
            >
              Register Now
            </Button>{" "}
            <Button color="secondary" onClick={this.props.closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RegisterModal;
