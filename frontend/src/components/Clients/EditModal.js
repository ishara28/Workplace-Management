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
    console.log(this.props.client);
    this.setState({
      nic_passport: this.props.client.nic_passport,
      name: this.props.client.name,
      reg_date: this.props.client.reg_date,
      description: this.props.client.description,
      address: this.props.client.address,
      telephone: this.props.client.telephone,
      email: this.props.client.email,
    });
  }

  closeBtn = (
    <button className="close" onClick={this.props.closeEditModal}>
      &times;
    </button>
  );

  updateData = () => {
    const newClient = {
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
      Axios.post("client/update/" + this.props.client.c_id, newClient)
        .then((res) => {
          console.log(res.data);
          this.props.closeEditModal();
          this.props.registrySuccessAlert();
        },
          (err)=>{if(err.response.status===401){
            localStorage.removeItem("username");
            window.location.reload(true);
          }
        })
    } else {
      this.setState({ isFieldsEmpty: true });
    }
  };

  render() {
    return (
      <div>
        <Modal size="lg" isOpen={this.props.showEditModal}>
          <ModalHeader 
            close={this.closeBtn} 
            style={{ backgroundColor: "#0069D9", color: "white" }}
          >
            Edit Client
          </ModalHeader>
          
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  NIC / Passport / Reg. ID
                </Label>
                <Col sm={9}>
                  <Input
                    placeholder="NIC / Passport / Reg. ID here..."
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
                    type='date'
                    placeholder="Register Date here..."
                    value={this.state.reg_date}
                    onChange={(e) => this.setState({ reg_date: e.target.value })}
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
            </Form>

            {this.state.isFieldsEmpty && (
              <Alert color="danger">Check whether all inputs are filled!</Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              style={{ backgroundColor: "#0069D9" }}
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
