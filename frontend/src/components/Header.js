import React,{Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import '../stylesheets/Header.css';

class Header extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            dropdownOpen:false,
            modalUsername:false,
            modalPassword:false,
            modalDelete:false,

            username:'',
            newUsername:'',
            password:'',
            newPassword:'',
            confNewPassword:''
        }

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.toggleModalUsername = this.toggleModalUsername.bind(this);
        this.toggleModalPassword = this.toggleModalPassword.bind(this);
        this.toggleModalDelete = this.toggleModalDelete.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    toggleDropdown(){
        this.setState({
            dropdownOpen:!this.state.dropdownOpen
        })
    }

    toggleModalUsername(){
        this.setState({
            modalUsername:!this.state.modalUsername
        })
    }

    toggleModalPassword(){
        this.setState({
            modalPassword:!this.state.modalPassword
        })
    }

    toggleModalDelete(){
        this.setState({
            modalDelete:!this.state.modalDelete
        })
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]:value
        })
    }

    changeUsername(values){
        this.toggleModalUsername();
    }

    changePassword(values){
        this.toggleModalPassword();
    }

    deleteAccount(values){
        this.toggleModalDelete();
    }

    render(){
        return (
            <>
                <Modal isOpen={this.state.modalUsername} toggle={this.toggleModalUsername}>
                    <ModalHeader toggle={this.toggleModalUsername}>Change username</ModalHeader>
                    <ModalBody>
                        <form onSubmit={values=>this.changeUsername(values)}>
                            <input type="text" className="form-control mb-3" id="username" name="username" value={this.state.username} onChange={this.handleInputChange} placeholder="username" required/>
                            <input type="password" className="form-control mb-3" id="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="password" required/>
                            <input type="text" className="form-control mb-3" id="newUsername" name="newUsername" value={this.state.newUsername} onChange={this.handleInputChange} placeholder="new username" required/>
                            <center>
                                <button type="submit" class="btn btn-success">change</button>
                            </center>
                        </form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.modalPassword} toggle={this.toggleModalPassword}>
                    <ModalHeader toggle={this.toggleModalPassword}>Change password</ModalHeader>
                    <ModalBody>
                        <form onSubmit={values=>this.changePassword(values)}>
                            <input type="text" className="form-control mb-3" id="username" name="username" value={this.state.username} onChange={this.handleInputChange} placeholder="username" required/>
                            <input type="password" className="form-control mb-3" id="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="password" required/>
                            <input type="password" className="form-control mb-3" id="newPassword" name="newPassword" value={this.state.newPassword} onChange={this.handleInputChange} placeholder="new password" required/>
                            <input type="password" className="form-control mb-3" id="confNewPassword" name="confNewPassword" value={this.state.confNewPassword} onChange={this.handleInputChange} placeholder="confirm new password" required/>
                            <center>
                                <button type="submit" class="btn btn-success">change</button>
                            </center>
                        </form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.modalDelete} toggle={this.toggleModalDelete}>
                    <ModalHeader toggle={this.toggleModalDelete} className="text-danger">Warning!</ModalHeader>
                    <ModalBody>
                        Do you want to delete account?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-success" onClick={this.toggleModalDelete}>Cancel</button>
                        <button className="btn btn-danger" onClick={this.deleteAccount}>Delete</button>
                    </ModalFooter>
                </Modal>

                <Navbar dark color="primary" expand="md">
                    <div className="container">
                        <NavbarBrand className="mr-auto" href="/home"><h1><b>Workplace Management System</b></h1></NavbarBrand>
                    </div>
                    <Nav className="ml-auto" navbar>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                            <DropdownToggle caret className="btn btn-light header_button">
                                <b>User</b>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.toggleModalUsername}>Change username</DropdownItem>
                                <DropdownItem onClick={this.toggleModalPassword}>Change password</DropdownItem>
                                <DropdownItem className="text-danger btn-danger" onClick={this.deleteAccount}>Delete account</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>           
                        <NavItem>
                            <button className="btn btn-light header_button"><b>Log out</b></button>
                        </NavItem>
                    </Nav>
                </Navbar>
            </>
        )
    }
}

export default Header
