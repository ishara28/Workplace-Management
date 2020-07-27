import React, {useState} from 'react'
import {Navbar, NavbarBrand, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { useAuth } from "./auth";
import { Redirect } from 'react-router-dom';
import axios from 'axios'

function Header(props) {
    const  [modalUsername,setModalUsername] = useState(false)
    const  [modalPassword,setModalPassword] = useState(false)
    const  [modalDelete,setModalDelete] = useState(false)
    const  [dropdownOpen,setDropdownOpen] = useState(false)

    const  [username,setUsername] = useState("")
    const  [password,setPassword] = useState("")
    const  [newUsername,setNewUsername] = useState("")
    const  [newPassword,setNewPassword] = useState("")
    const  [confNewPassword,setConfNewPassword] = useState("")

    const { authTokens, setAuthTokens } = useAuth();

    function changeUsername(event){
        event.preventDefault();
        const updated = {
            username:username,
            password:password,
            newUsername:newUsername
        };
        axios.post("/auth/username",updated,{
            headers: props.token
          })
        .then((res) => console.log(res.data))
        .then(() => {
            alert("Username Successfully changed!");
            setModalUsername(false);
        })
        .catch((err) => console.log(err));

    }

    function changePassword(event){
        event.preventDefault();
        const updated = {
            username:username,
            password:password,
            newUsername:newUsername
        };
        axios.post("/auth/pwd",updated,{
            headers: props.token
          })
        .then((res) => console.log(res.data))
        .then(() => {
            alert("Password Successfully changed!");
            setModalPassword(false);
        })
        .catch((err) => console.log(err));
    }

    function deleteAccount(){
        const updated = {
            username:username,
            password:password,
            newUsername:newUsername
        };
        axios.delete("/auth/delete",updated,{
            headers: props.token
          })
        .then((res) => console.log(res.data))
        .then(() => {
            setModalDelete(false);
            Redirect('/login')
        })
        .catch((err) => console.log(err));
    }

    function logOut() {
        setAuthTokens();
        
        localStorage.removeItem("tokens");
    }

    return (
        <>
            <Modal isOpen={modalUsername} toggle={()=>setModalUsername(!modalUsername)}>
                    <ModalHeader>Change username</ModalHeader>
                    <ModalBody>
                        <form onSubmit={event=>changeUsername(event)}>
                            <input type="text" className="form-control mb-3" id="username" name="username" value={username} onChange={e => {setUsername(e.target.value)}} placeholder="username" required/>
                            <input type="password" className="form-control mb-3" id="password" name="password" value={password} onChange={e => {setPassword(e.target.value)}} placeholder="password" required/>
                            <input type="text" className="form-control mb-3" id="newUsername" name="newUsername" value={newUsername} onChange={e => {setNewUsername(e.target.value)}} placeholder="new username" required/>
                            <center>
                                <button type="submit" className="btn btn-success">change</button>
                            </center>
                        </form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={modalPassword} toggle={()=>setModalPassword(!modalPassword)}>
                    <ModalHeader>Change password</ModalHeader>
                    <ModalBody>
                        <form onSubmit={event=>changePassword(event)}>
                            <input type="text" className="form-control mb-3" id="username" name="username" value={username} onChange={e => {setUsername(e.target.value)}} placeholder="username" required/>
                            <input type="password" className="form-control mb-3" id="password" name="password" value={password} onChange={e => {setPassword(e.target.value)}} placeholder="password" required/>
                            <input type="password" className="form-control mb-3" id="newPassword" name="newPassword" value={newPassword} onChange={e => {setNewPassword(e.target.value)}} placeholder="new password" required/>
                            <input type="password" className="form-control mb-3" id="confNewPassword" name="confNewPassword" value={confNewPassword} onChange={e => {setConfNewPassword(e.target.value)}} placeholder="confirm new password" required/>
                            <center>
                                <button type="submit" className="btn btn-success">change</button>
                            </center>
                        </form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={modalDelete} toggle={()=>setModalDelete(!modalDelete)}>
                    <ModalHeader className="text-danger">Warning!</ModalHeader>
                    <ModalBody>
                        Do you want to delete account?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-success" onClick={()=>setModalDelete(!modalDelete)}>Cancel</button>
                        <button className="btn btn-danger" onClick={()=>deleteAccount()}>Delete</button>
                    </ModalFooter>
                </Modal>

                <Navbar dark color="primary" expand="md">
                    <Nav>
                        <NavItem><NavLink href='/' className="text-white h1">Workplace Management System</NavLink></NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <Dropdown isOpen={dropdownOpen} toggle={()=>setDropdownOpen(!dropdownOpen)}>
                            <DropdownToggle caret className="btn btn-light">
                                <b>{authTokens.username}</b>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={()=>setModalUsername(!modalUsername)}>Change username</DropdownItem>
                                <DropdownItem onClick={()=>setModalPassword(!modalPassword)}>Change password</DropdownItem>
                                <DropdownItem className="text-danger btn-danger" onClick={deleteAccount}>Delete account</DropdownItem>
                                <DropdownItem onClick={logOut}>Log out</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>           
                    </Nav>
                   
                </Navbar>
            </>
    )
}

export default Header