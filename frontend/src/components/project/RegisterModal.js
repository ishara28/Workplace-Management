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
      workhouses: [],
      agreements: [],
      index_no: "",
      reg_date: currDate,
      owner_id: "",
      description: "",
      estimated_start: "",
      estimated_days: "",
      estimated_value: "",
      status: "PROPOSED",
      workhouse_id: "",
      agent_id: "",
      agreement_id: "",
      isFieldsEmpty: false,
      
    };
  }

  componentDidMount() {
    Axios.get("/customer/")
      .then((res) => this.setState({ customers: res.data }))
      .then(() => console.log(this.state.customers))
      .catch((err) => console.log(err));

    Axios.get("/workhouse/")
    .then((res) => this.setState({ workhouses: res.data }))
    .then(() => console.log(this.state.workhouses))
    .catch((err) => console.log(err));

    Axios.get("/agreement/")
    .then((res) => this.setState({ agreements: res.data }))
    .then(() => console.log(this.state.agreements))
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
      "P-" +
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
        const newProject = {
          index_no: this.state.index_no,
          reg_date: this.state.reg_date,
          owner_id: this.state.owner_id,
          description: this.state.description,
          estimated_start: this.state.estimated_start,
          estimated_days: this.state.estimated_days,
          estimated_value: this.state.estimated_value,
          status: this.state.status,
          workhouse_id: this.state.workhouse_id,
          agent_id: this.state.agent_id,
          agreement_id: this.state.agreement_id,
        };
        if (
          this.state.owner_id &&
          this.state.description &&
          this.state.estimated_start &&
          this.state.estimated_days &&
          this.state.estimated_value &&
          this.state.workhouse_id &&
          this.state.agent_id &&
          this.state.agreement_id
        ) {
          console.log(newProject);
          Axios.post("project/register", newProject)
            .then((res) => console.log(res.data))
            .then(() => {
              confirmAlert({
                customUI: ({ onClose }) => {
                  return (
                    <div className="custom-ui">
                      <h2>Registered successfully!</h2>
                      <div style={{ textAlign: "center" }}>
                        <Button color="info" style={{ margin: 3 }} onClick={onClose}>
                          OK
                        </Button>
                      </div>
                    </div>
                  );
                },
              });
              this.props.closeModal();
              window.location.reload();
              //this.props.registrySuccessAlert();
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
          <ModalHeader close={this.closeBtn} className="text-white bg-info">Project Register</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="owner_id" sm={2}>
                  Owner
                </Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    name="owner_id"
                    id="owner_id"
                    value={this.state.owner_id}
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
                <Label for="estimated_start" sm={2}>
                  Estimated Start
                </Label>
                <Col sm={10}>
                  <Input
                    name="estimated_start"
                    id="estimated_start"
                    type="date"
                    value={this.state.estimated_start}
                    onChange={(e) => this.setState({ estimated_start: e.target.value })}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="estimated_days" sm={2}>
                  Estimated Days
                </Label>
                <Col sm={10}>
                  <Input
                    name="estimated_days"
                    id="estimated_days"
                    type="number"
                    value={this.state.estimated_days}
                    onChange={(e) => this.setState({ estimated_days: e.target.value })}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="estimated_value" sm={2}>
                  Estimated Value
                </Label>
                <Col sm={10}>
                  <Input
                    name="estimated_value"
                    id="estimated_value"
                    type="text"
                    value={this.state.estimated_value}
                    onChange={(e) => this.setState({ estimated_value: e.target.value })}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="workhouse_id" sm={2}>
                  Workhouse
                </Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    name="workhouse_id"
                    id="workhouse_id"
                    value={this.state.workhouse_id}
                    onChange={(e) =>
                      this.setState({ workhouse_id: e.target.value })
                    }
                  >
                    <option>Choose Workhouse</option>
                    {this.state.workhouses.map((workhouse) => {
                      return (
                        <option value={workhouse.w_id}>
                          {workhouse.index_no}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="owner_id" sm={2}>
                  Agent
                </Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    name="agent_id"
                    id="agent_id"
                    value={this.state.agent_id}
                    onChange={(e) =>
                      this.setState({ agent_id: e.target.value })
                    }
                  >
                    <option>Choose Agent</option>
                    {this.state.customers.map((agent) => {
                      return (
                        <option value={agent.c_id}>
                          {agent.index_no + " - " + agent.name}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="agreement_id" sm={2}>
                  Agreement
                </Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    name="agreement_id"
                    id="agreement_id"
                    value={this.state.agreement_id}
                    onChange={(e) =>
                      this.setState({ agreement_id: e.target.value })
                    }
                  >
                    <option>Choose Agreement</option>
                    {this.state.agreements.map((agreement) => {
                      return (
                        <option value={agreement.a_id}>
                          {agreement.index_no}
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
              color="info"
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
