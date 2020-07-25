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
      modal: false,
      index_no: "",
      reg_id: "",
      description: "",
      start_date: "",
      end_date: "",
      reg_date: currDate,
      isEmptyAlertVisible: false,
    };
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
      "C-" +
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
          reg_date: this.state.reg_date,
          reg_id: this.state.reg_id,
          description: this.state.description,
          start_date: this.state.start_date,
          end_date: this.state.end_date,
          status: "ACTIVE",
        };

        if (
          this.state.reg_id &&
          this.state.description &&
          this.state.start_date &&
          this.state.end_date
        ) {
          Axios.post("/agreement/register", newAgreement)
            .then((res) => console.log(res.data))
            .then(() => {
              alert("Agreement Successfully Registered!");
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
          <Button style={{ backgroundColor: "#7a1d63" }} onClick={this.toggle}>
            Register Machinery
          </Button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.state.modal} size="lg">
          <ModalHeader
            style={{ backgroundColor: "#7a1d63", color: "white" }}
            toggle={this.toggle}
          >
            Register Machinery
          </ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Reg. Id
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
