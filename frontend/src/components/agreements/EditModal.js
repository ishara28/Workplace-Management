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

export class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reg_id: "",
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
        description: this.props.agreement.description,
        start_date: this.props.agreement.start_date.slice(0, 10),
        end_date: this.props.agreement.end_date.slice(0, 10),
      },
      () => console.log("State", this.state)
    );
  }

  closeBtn = (
    <button className="close" onClick={this.props.closeEditModal}>
      &times;
    </button>
  );

  updateData = () => {
    const newAgreement = {
      reg_id: this.state.reg_id,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };
    if (this.state.reg_id && this.state.description) {
      Axios.post("agreement/update/" + this.props.agreement.a_id, newAgreement)
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
          <ModalHeader close={this.closeBtn}>Edit Machinery</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Reg id
                </Label>
                <Col sm={10}>
                  <Input
                    name="index_no"
                    id="exampleEmail"
                    placeholder="Reg id here..."
                    value={this.state.reg_id}
                    onChange={(e) => this.setState({ reg_id: e.target.value })}
                  />
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
                    value={this.state.end_date}
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
              style={{ backgroundColor: "#23272B" }}
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
