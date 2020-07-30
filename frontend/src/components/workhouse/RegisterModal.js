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
      address:"",
      telephone:"",
      email:"",
      description: "",
      c_id:"",
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
      "W-" +
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
        const newWorkhouse = {
          index_no: this.state.index_no,
          
          reg_date: this.state.reg_date,
          status: this.state.status,
          address: this.state.address,
          telephone: this.state.telephone,
          email: this.state.email,
          description: this.state.description,
          c_id: this.state.c_id,
        };
        if (
          this.state.telephone &&
          this.state.email &&
          this.state.address &&
          this.state.description &&
          this.state.c_id
        ) {
          Axios.post("workhouse/register", newWorkhouse)
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
          <ModalHeader close={this.closeBtn} className="text-white bg-success">Workhouse Register</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="telephone" sm={2}>
                  Telephone number
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="telephone"
                    id="telephone"
                    value={this.state.telephone}
                    onChange={(e) => this.setState({ telephone: e.target.value })}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="email" sm={2}>
                  email
                </Label>
                <Col sm={10}>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="address" sm={2}>
                  Address
                </Label>
                <Col sm={10}>
                  <Input
                    type="textarea"
                    name="address"
                    id="address"
                    value={this.state.address}
                    onChange={(e) =>
                      this.setState({ address: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="description" sm={2}>
                  Description
                </Label>
                <Col sm={10}>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={this.state.description}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="c_id" sm={2}>
                  Customer
                </Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    name="c_id"
                    id="c_id"
                    value={this.state.c_id}
                    onChange={(e) =>
                      this.setState({ c_id: e.target.value })
                    }
                  >
                    <option>Choose Customer</option>
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
            </Form>

            {this.state.isFieldsEmpty && (
              <Alert color="danger">Check whether all inputs are filled!</Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
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
