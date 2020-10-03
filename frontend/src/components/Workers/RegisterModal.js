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
      sites:[],
      modal: false,
      index_no: "",
      name: "",
      nic_passport: "",
      site: "",
      address: "",
      telephone: "",
      email: "",
      description: "",
      reg_date: currDate,
      isEmptyAlertVisible: false,
    };
  }

  componentDidMount() {
    Axios.get("/site/")
      .then((res) => this.setState({ sites: res.data }))
      .then(() => console.log(this.state.sites))
      .catch((err) => console.log(err));
  }

  toggle = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        modal: !prevState.modal,
      };
    });
  };

  registerWorker = () => {
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
        const newWorker = {
          index_no: this.state.index_no,
          nic_passport: this.state.nic_passport,
          name: this.state.name,
          reg_date: this.state.reg_date,
          site: this.state.site,
          description: this.state.description,
          address: this.state.address,
          telephone: this.state.telephone,
          email: this.state.email,   
          status: "ACTIVE",
        };

        console.log(newWorker)

        if (
          this.state.name &&
          this.state.nic_passport &&
          this.state.site &&
          this.state.address &&
          this.state.telephone &&
          this.state.email &&
          this.state.description
        ) {
          Axios.post("/worker/register", newWorker)
            .then((res) => console.log(res.data))
            .then(() => {
              confirmAlert({
                customUI: ({ onClose }) => {
                  return (
                    <div className="custom-ui">
                      <h2>Worker Successfully Registered!</h2>
                      <div style={{ textAlign: "center" }}>
                        <Button color="primary" style={{ margin: 3 }} onClick={onClose}>
                          OK
                        </Button>
                      </div>
                    </div>
                  );
                },
              });
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
          <Button style={{ backgroundColor: "#fb15c9" }} onClick={this.toggle}>
            Register
          </Button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.state.modal} size="lg">
          <ModalHeader
            style={{ backgroundColor: "#fb15c9" , color: "white" }}
            toggle={this.toggle}
          >
            Register Worker
          </ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                NIC / Passport
              </Label>
              <Col sm={9}>
                <Input
                  name="index_no"
                  id="exampleEmail"
                  placeholder="NIC / Passport here..."
                  value={this.state.nic_passport}
                  onChange={(e) =>
                    this.setState({ nic_passport: e.target.value })
                  }
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Name
              </Label>
              <Col sm={9}>
                <Input
                  name="index_no"
                  id="exampleEmail"
                  placeholder="Name here..."
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="c_id" sm={3}>
                  Site
                </Label>
                <Col sm={9}>
                  <Input
                    type="select"
                    name="s_id"
                    id="s_id"
                    value={this.state.s_id}
                    onChange={(e) =>
                      this.setState({ site: e.target.value })
                    }
                  >
                    <option>Choose Site</option>
                    {this.state.sites.map((site) => {
                      return (
                        <option value={site.s_id}>
                          {site.index_no}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Address
              </Label>
              <Col sm={9}>
                <Input
                  type="textarea"
                  name="index_no"
                  id="exampleEmail"
                  placeholder="Address here..."
                  value={this.state.address}
                  onChange={(e) => this.setState({ address: e.target.value })}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Telephone
              </Label>
              <Col sm={9}>
                <Input
                  name="index_no"
                  id="exampleEmail"
                  placeholder="Telephone no. here..."
                  value={this.state.telephone}
                  onChange={(e) => this.setState({ telephone: e.target.value })}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Email
              </Label>
              <Col sm={9}>
                <Input
                  type="email"
                  name="index_no"
                  id="exampleEmail"
                  placeholder="Email here..."
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
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
              style={{ backgroundColor: "#fb15c9" }}
              onClick={this.registerWorker}
            >
              Register Now
            </Button>{" "}
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
