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
      telephone: "",
      email: "",
      address: "",
      description: "",
      reg_id: "",
      c_id: "",
      isFieldsEmpty: false,
    };
  }

  componentDidMount() {
    console.log("Contact Person", this.props.cp);
    this.setState({
      telephone: this.props.cp.telephone,
      email: this.props.cp.email,
      address: this.props.cp.address, 
      description: this.props.cp.description,
      reg_id: this.props.cp.reg_id,
      c_id: this.props.cp.c_id,
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
    const newOrganization = {
      telephone: this.state.telephone,
      email: this.state.email,
      address: this.state.address,
      description: this.state.description,
      reg_id: this.state.reg_id,
      c_id: this.state.c_id,
    };
    if (
      this.state.telephone &&
      this.state.email &&
      this.state.address &&
      this.state.description &&
      this.state.reg_id &&
      this.state.c_id
    ) {
      console.log("AA"+this.props.organization.o_id);
      Axios.post("organization/update/" + this.props.organization.o_id, newOrganization)
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
          <ModalHeader close={this.closeBtn} className="text-white bg-danger">Edit Organization</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="telephone" sm={2}>
                  Telephone
                </Label>
                <Col sm={10}>
                  <Input
                    name="telephone"
                    id="telephone"
                    type="text"
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
                    type="text"
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
                <Label for="reg_id" sm={2}>
                  Reg id
                </Label>
                <Col sm={10}>
                  <Input
                  type="text"
                    name="reg_id"
                    id="reg_id"
                    value={this.state.reg_id}
                    onChange={(e) => this.setState({ reg_id: e.target.value })}
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

            </Form>

            {this.state.isFieldsEmpty && (
              <Alert color="danger">Check whether all inputs are filled!</Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
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
