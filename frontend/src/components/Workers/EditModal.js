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
      workers: [],
      nic_passport: "",
      name: "",
      reg_date:'',
      description: "",
      address: "",
      telephone: "",
      email: "",
      isFieldsEmpty: false,
    };
  }

  componentDidMount() {
    console.log(this.props.worker);
    this.setState({
      nic_passport: this.props.worker.nic_passport,
      name: this.props.worker.name,
      reg_date:this.props.worker.reg_date,
      description: this.props.worker.description,
      address: this.props.worker.address,
      telephone: this.props.worker.telephone,
      email: this.props.worker.email,
    });
  }

  closeBtn = (
    <button className="close" onClick={this.props.closeEditModal}>
      &times;
    </button>
  );

  updateData = () => {
    const newWorker = {
      nic_passport: this.state.nic_passport,
      name: this.state.name,
      reg_date: this.state.reg_date,
      description: this.state.description,
      address: this.state.address,
      telephone: this.state.telephone,
      email: this.state.email,
    };
    if (
      this.state.nic_passport &&
      this.state.name &&
      this.state.reg_date &&
      this.state.description &&
      this.state.address &&
      this.state.telephone &&
      this.state.email
    ) {
      Axios.post("worker/update/" + this.props.worker.w_id, newWorker)
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
          <ModalHeader close={this.closeBtn} style={{ backgroundColor: "#fb15c9", color: "white" }}>Edit Worker</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  NIC / Passport
                </Label>
                <Col sm={9}>
                  <Input
                    placeholder="Name here..."
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
                    placeholder="Name here..."
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Register Date
                </Label>
                <Col sm={9}>
                  <Input
                    placeholder="Name here..."
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Address
                </Label>
                <Col sm={9}>
                  <Input
                    type="textarea"
                    placeholder="Address here..."
                    value={this.state.address}
                    onChange={(e) => this.setState({ address: e.target.value })}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Telephone No.
                </Label>
                <Col sm={9}>
                  <Input
                    placeholder="Telephone no. here..."
                    value={this.state.telephone}
                    onChange={(e) =>
                      this.setState({ telephone: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Email
                </Label>
                <Col sm={9}>
                  <Input
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
                    placeholder="Description  here..."
                    value={this.state.description}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
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
              style={{ backgroundColor: "#fb15c9" }}
              onClick={this.updateData}
            >
              Update Now
            </Button>
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
