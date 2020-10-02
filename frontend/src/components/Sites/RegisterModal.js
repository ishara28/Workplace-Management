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
      clients: [],
      index_no: "",
      reg_date: currDate,
      description: "",
      address:"",
      telephone:"",
      email:"",
      c_id:"",
      status: "ACTIVE",
      isFieldsEmpty: false,
    };
  }

  componentDidMount() {
    Axios.get("/client/")
      .then((res) => this.setState({ clients: res.data }))
      .then(() => console.log(this.state.clients))
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
      "S-" +
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
        const newSite = {
          index_no: this.state.index_no,
          reg_date: this.state.reg_date, 
          description: this.state.description,
          address: this.state.address,
          telephone: this.state.telephone,
          email: this.state.email,
          c_id: this.state.c_id,
          status: this.state.status,
        };
        if (
          this.state.description &&
          this.state.telephone &&
          this.state.email &&
          this.state.address &&
          this.state.c_id
        ) {
          Axios.post("site/register", newSite)
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
          <ModalHeader close={this.closeBtn} className="text-white bg-success">Site Register</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="c_id" sm={2}>
                  Client
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
                    <option>Choose Client</option>
                    {this.state.clients.map((client) => {
                      return (
                        <option value={client.c_id}>
                          {client.index_no + " - " + client.name}
                        </option>
                      );
                    })}
                  </Input>
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
