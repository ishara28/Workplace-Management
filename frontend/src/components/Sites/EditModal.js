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
      clients: [],
      reg_date: '',
      description: "",
      address: "",
      telephone: "",
      email:"",
      c_id: "",
      isFieldsEmpty: false,
    };
  }

  componentDidMount() {
    console.log("Site", this.props.site);
    this.setState({
      reg_date: this.props.site.reg_date,
      description: this.props.site.description,
      address: this.props.site.address,
      telephone: this.props.site.telephone,
      email: this.props.site.email,
      c_id: this.props.site.c_id,
    });
    Axios.get("/customer/")
      .then((res) => this.setState({ clients: res.data }))
      //   .then(() => console.log(this.state.customers))
      .catch((err) => console.log(err));
  }

  closeBtn = (
    <button className="close" onClick={this.props.closeEditModal}>
      &times;
    </button>
  );

  updateData = () => {
    const newSite = {
      reg_date: this.state.reg_date,
      description: this.state.description,
      address: this.state.address,
      telephone: this.state.telephone,
      email: this.state.email,
      c_id: this.state.c_id,
    };
    if (
      this.state.reg_date &&
      this.state.description &&
      this.state.address &&
      this.state.telephone &&
      this.state.email &&
      this.state.c_id
    ) {
      Axios.post("site/update/" + this.props.site.index_no, newSite)
        .then((res) => {
          console.log(res.data);
        })
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
          <ModalHeader close={this.closeBtn} className="text-white bg-success">Edit Site</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="reg_date" sm={2}>
                  Register Date
                </Label>
                <Col sm={10}>
                  <Input
                    name="reg_date"
                    id="reg_date"
                    type="date"
                    value={this.state.reg_date}
                    onChange={(e) => this.setState({ reg_date: e.target.value })}
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
                    <option>Choose client</option>
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
            </Form>

            {this.state.isFieldsEmpty && (
              <Alert color="danger">Check whether all inputs are filled!</Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
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
