import React,{useState} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import '../stylesheets/Header.css';

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Navbar dark color="primary" expand="md">
            <div className="container">
                <NavbarBrand className="mr-auto" href="/home"><b>Workplace Management System</b></NavbarBrand>
            </div>
            <Nav className="ml-auto" navbar>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret className="btn btn-light header_button">
                        <b>User</b>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>Change username</DropdownItem>
                        <DropdownItem>Change password</DropdownItem>
                        <DropdownItem className="text-danger btn-danger">Delete account</DropdownItem>
                    </DropdownMenu>
                </Dropdown>           
                <NavItem>
                    <button className="btn btn-light header_button"><b>Log out</b></button>
                </NavItem>
            </Nav>
        </Navbar> 
    )
}

export default Header
