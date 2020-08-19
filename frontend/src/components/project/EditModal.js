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
      sites: [],
      agreements: [],
      reg_date:'',
      agreement_id: "", 
      owner_id: "",
      agent_id: "",
      site_id: "", 
      description: "",
      estimated_start: "",
      estimated_days: "",
      estimated_value: "",
      isFieldsEmpty: false,
    };
  }

  componentDidMount() {
    console.log("Project", this.props.project);
    this.setState({
      reg_date: this.props.reg_date,
      agreement_id: this.props.project.a_id,
      owner_id: this.props.project.c_id,
      agent_id: this.props.project.c_id,
      site_id: this.props.project.workhouse_id,
      description: this.props.project.description,
      estimated_start: this.props.project.estimated_start,
      estimated_days: this.props.project.estimated_days,
      estimated_value: this.props.project.estimated_value,
    });
    Axios.get("/customer/")
      .then((res) => this.setState({ customers: res.data }))
      //   .then(() => console.log(this.state.customers))
      .catch((err) => console.log(err));

    Axios.get("/workhouse/")
    .then((res) => this.setState({ workhouses: res.data }))
    .then(() => console.log(this.state.sites))
    .catch((err) => console.log(err));

    Axios.get("/agreement/")
    .then((res) => this.setState({ agreements: res.data }))
    .then(() => console.log(this.state.agreements))
    .catch((err) => console.log(err));
  }

  closeBtn = (
    <button className="close" onClick={this.props.closeEditModal}>
      &times;
    </button>
  );

  updateData = () => {
    const newProject = {
      reg_date: this.state.reg_date,
      agreement_id: this.state.agreement_id,
      owner_id: this.state.owner_id,
      agent_id: this.state.agent_id,
      workhouse_id: this.state.site_id,
      description: this.state.description,
      estimated_start: this.state.estimated_start,
      estimated_days: this.state.estimated_days,
      estimated_value: this.state.estimated_value,
    };
    if (
      this.state.owner_id &&
      this.state.description &&
      this.state.estimated_start &&
      this.state.estimated_days &&
      this.state.estimated_value &&
      this.state.site_id &&
      this.state.agent_id &&
      this.state.agreement_id
    ) {
      console.log(newProject);
      Axios.post("project/update/" + this.props.project.p_id, newProject)
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
          <ModalHeader close={this.closeBtn} className="bg-info text-white">Edit Project</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="description" sm={2}>
                  Registered Date
                </Label>
                <Col sm={10}>
                  <Input
                    type="date"
                    name="description"
                    id="description"
                    value={this.state.reg_date}
                    onChange={(e) =>
                      this.setState({ reg_date: e.target.value })
                    }
                  />
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

              <FormGroup row>
                <Label for="owner_id" sm={2}>
                  Client
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
                    {this.state.clients.map((agent) => {
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
                <Label for="workhouse_id" sm={2}>
                  Site
                </Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    name="workhouse_id"
                    id="workhouse_id"
                    value={this.state.site_id}
                    onChange={(e) =>
                      this.setState({ site_id: e.target.value })
                    }
                  >
                    <option>Choose Site</option>
                    {this.state.sites.map((site) => {
                      return (
                        <option value={site.w_id}>
                          {site.index_no}
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
              
            </Form>

            {this.state.isFieldsEmpty && (
              <Alert color="danger">Check whether all inputs are filled!</Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="info"
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
