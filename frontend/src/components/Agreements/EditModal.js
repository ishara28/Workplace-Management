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
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

var tempDate = new Date();
var date =
  tempDate.getFullYear() +
  "-" +
  (tempDate.getMonth() + 1) +
  "-" +
  tempDate.getDate();

const currDate = date;

export class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: [],
      reg_id: "",
      signed_date: "",
      client: "",
      description: "",
      start_date: "",
      end_date: "",
      isFieldsEmpty: false,
    };
  }

  componentDidMount() {
    this.setState(
      {
        reg_id: this.props.agreement.reg_id,
        signed_date: this.props.agreement.signed_date,
        client: this.props.agreement.customer_index_no,
        description: this.props.agreement.description,
        start_date: this.props.agreement.start_date.slice(0, 10),
        end_date: this.props.agreement.end_date.slice(0, 10),
      },
      () => console.log("Props", this.props)
    );
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
    const newAgreement = {
      reg_id: this.state.reg_id,
      signed_date: this.state.signed_date,
      customer_index_no: this.state.client,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };

    console.log(newAgreement);

    if (this.state.reg_id && this.state.description) {
      Axios.post(
        "agreement/update/" + this.props.agreement.a_id,
        newAgreement
      ).then((res) => {
        if (res.data.isError) {
          confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className="custom-ui">
                  <h2>Select a valid customer!</h2>
                  <div style={{ textAlign: "center" }}>
                    <Button style={{ backgroundColor: "#7a1d63", color: "white", margin: 3 }} onClick={onClose}>
                      OK
                    </Button>
                  </div>
                </div>
              );
            },
          });
          //alert("Select a valid customer!");
        } else {
          this.props.closeEditModal();
          this.props.registrySuccessAlert();
        }
      });
    } else {
      this.setState({ isFieldsEmpty: true });
    }
  };

  render() {
    return (
      <div>
        <Modal size="lg" isOpen={this.props.showEditModal}>
          <ModalHeader close={this.closeBtn} style={{ backgroundColor: "#7a1d63", color: "white" }}>Edit Machinery</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Reg ID
                </Label>
                <Col sm={10}>
                  <Input
                    name="index_no"
                    id="exampleEmail"
                    placeholder="Reg ID here..."
                    value={this.state.reg_id}
                    onChange={(e) => this.setState({ reg_id: e.target.value })}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Signed Date
                </Label>
                <Col sm={10}>
                  <Input
                    name="index_no"
                    id="exampleEmail"
                    type='date'
                    placeholder="Signed Date here..."
                    value={this.state.signed_date}
                    onChange={(e) => this.setState({ signed_date: e.target.value })}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="browser" sm={2}>
                  Client
                </Label>
                <Col sm={10}>
                  <Input
                    list="browsers"
                    name="browser"
                    id="browser"
                    value={this.state.client}
                    onChange={(e) =>
                      this.setState({ client: e.target.value })
                    }
                  ></Input>
                  <datalist id="browsers">
                    {this.state.clients.map((client) => {
                      return (
                        <option value={client.index_no}>
                          {client.name}
                        </option>
                      );
                    })}
                  </datalist>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleSelect" sm={2}>
                  Description
                </Label>
                <Col sm={10}>
                  <Input
                    type="textarea"
                    name="select"
                    id="exampleSelect"
                    value={this.state.description}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                  ></Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleText" sm={2}>
                  Start Date
                </Label>
                <Col sm={10}>
                  <Input
                    type="date"
                    name="text"
                    id="exampleText"
                    value={this.state.start_date}
                    onChange={(e) =>
                      this.setState({ start_date: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleText" sm={2}>
                  End Date
                </Label>
                <Col sm={10}>
                  <Input
                    type="date"
                    name="text"
                    id="exampleText"
                    value={this.state.end_date}//methana update wenakota dawasak aduwen update wenne
                    onChange={(e) =>
                      this.setState({ end_date: e.target.value })
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
              style={{ backgroundColor: "#7a1d63", color: "white" }}
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
