import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Input,
  Label,
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

export class RegisterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: [],
      modal: false,
      index_no: "",
      reg_id: "",
      signed_date: currDate,
      client: "",
      description: "",
      start_date: "",
      end_date: "",
      isEmptyAlertVisible: false,
    };
  }

  componentDidMount() {
    Axios.get("/customer/")
      .then((res) => this.setState({clients: res.data }))
      .then(() => console.log("STATE", this.state.clients));
  }

  toggle = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        modal: !prevState.modal,
      };
    });
  };

  registerAgreement = () => {
    var tempDate = new Date();
    const index_no =
      "A-" +
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
        const newAgreement = {
          index_no: this.state.index_no,
          reg_id: this.state.reg_id,
          signed_date: this.state.signed_date,
          client: this.state.client,
          description: this.state.description,
          start_date: this.state.start_date,
          end_date: this.state.end_date,
          status: "ACTIVE",
        };

        if (
          this.state.reg_id &&
          this.state.client &&
          this.state.description &&
          this.state.start_date &&
          this.state.end_date
        ) {
          Axios.post("/agreement/register", newAgreement)
            .then((res) => console.log(res.data))
            .then(() => {
              confirmAlert({
                customUI: ({ onClose }) => {
                  return (
                    <div className="custom-ui">
                      <h2>Agreement Successfully Registered!</h2>
                      <div style={{ textAlign: "center" }}>
                        <Button style={{ backgroundColor: "#7a1d63", color: "white", margin: 3  }} onClick={onClose}>
                          OK
                        </Button>
                      </div>
                    </div>
                  );
                },
              });
              //alert("Agreement Successfully Registered!");
              this.setState({ modal: false });
              window.location.reload(false);
            });
        } else {
          this.setState({ isEmptyAlertVisible: true });
        }
      }
    );
  };

  render() {
    return (
      <div>
        <div style={{ float: "right", marginRight: 10 }}>
          <Button style={{ backgroundColor: "#7a1d63" }} onClick={this.toggle} className="mr-3">
            Register
          </Button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.state.modal} size="lg">
          <ModalHeader
            style={{ backgroundColor: "#7a1d63", color: "white" }}
            toggle={this.toggle}
          >
            Register Agreement
          </ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Reg. ID
              </Label>
              <Col sm={9}>
                <Input
                  name="index_no"
                  id="exampleEmail"
                  placeholder="Reg. id here..."
                  value={this.state.reg_id}
                  onChange={(e) => this.setState({ reg_id: e.target.value })}
                />
              </Col>
            </FormGroup>
            
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Signed Date
              </Label>
              <Col sm={9}>
                <Input
                  name="index_no"
                  id="exampleEmail"
                  placeholder="Signed Date here..."
                  value={this.state.signed_date}
                  onChange={(e) => this.setState({ signed_date: e.target.value })}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="browser" sm={3}>
                Client
              </Label>
              <Col sm={9}>
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
                      <option value={client.index_no}>{client.name}</option>
                    );
                  })}
                </datalist>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Description
              </Label>
              <Col sm={9}>
                <Input
                  type="textarea"
                  name="index_no"
                  id="exampleEmail"
                  placeholder="Description here..."
                  value={this.state.description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Start Date
              </Label>
              <Col sm={9}>
                <Input
                  type="date"
                  name="datetime"
                  id="exampleDatetime"
                  placeholder="start date"
                  value={this.state.start_date}
                  onChange={(e) =>
                    this.setState({ start_date: e.target.value })
                  }
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                End Date
              </Label>
              <Col sm={9}>
                <Input
                  type="date"
                  name="datetime"
                  id="exampleDatetime"
                  placeholder="end date"
                  value={this.state.end_date}
                  onChange={(e) => this.setState({ end_date: e.target.value })}
                />
              </Col>
            </FormGroup>

            {/* Is empty check alert  */}
            <Alert
              color="danger"
              isOpen={this.state.isEmptyAlertVisible}
              toggle={() => this.setState({ isEmptyAlertVisible: false })}
            >
              Check whether all inputs are filled!
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button
              style={{ backgroundColor: "#7a1d63" }}
              onClick={this.registerAgreement}
            >
              Register Now
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RegisterModal;