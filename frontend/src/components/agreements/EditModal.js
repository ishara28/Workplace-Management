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
<<<<<<< HEAD
      reg_id: "",
      description: "",
=======
      customers: [],
      reg_id: "",
      description: "",
      customer_index_no: "",
>>>>>>> Ishara
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
<<<<<<< HEAD
        start_date: this.props.agreement.start_date.slice(0, 10),
        end_date: this.props.agreement.end_date.slice(0, 10),
      },
      () => console.log("State", this.state)
    );
=======
        customer_index_no: this.props.agreement.customer_index_no,
        start_date: this.props.agreement.start_date.slice(0, 10),
        end_date: this.props.agreement.end_date.slice(0, 10),
      },
      () => console.log("Props", this.props)
    );
    Axios.get("/customer/")
      .then((res) => this.setState({ customers: res.data }))
      //   .then(() => console.log(this.state.customers))
      .catch((err) => console.log(err));
>>>>>>> Ishara
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
<<<<<<< HEAD
=======
      customer_index_no: this.state.customer_index_no,
>>>>>>> Ishara
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };
    if (this.state.reg_id && this.state.description) {
<<<<<<< HEAD
      Axios.post("agreement/update/" + this.props.agreement.a_id, newAgreement)
        .then((res) => console.log(res.data))
        .then(() => {
          this.props.closeEditModal();
          this.props.registrySuccessAlert();
        });
=======
      Axios.post(
        "agreement/update/" + this.props.agreement.a_id,
        newAgreement
      ).then((res) => {
        if (res.data.isError) {
          alert("Select a valid customer!");
        } else {
          this.props.closeEditModal();
          this.props.registrySuccessAlert();
        }
      });
>>>>>>> Ishara
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
<<<<<<< HEAD
=======
                <Label for="browser" sm={2}>
                  Customer
                </Label>
                <Col sm={10}>
                  <Input
                    list="browsers"
                    name="browser"
                    id="browser"
                    value={this.state.customer_index_no}
                    onChange={(e) =>
                      this.setState({ customer_index_no: e.target.value })
                    }
                  ></Input>
                  <datalist id="browsers">
                    {this.state.customers.map((customer) => {
                      return (
                        <option value={customer.index_no}>
                          {customer.name}
                        </option>
                      );
                    })}
                  </datalist>
                </Col>
              </FormGroup>

              <FormGroup row>
>>>>>>> Ishara
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
