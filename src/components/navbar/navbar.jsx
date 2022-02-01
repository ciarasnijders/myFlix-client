import React from 'react';
import {Navbar,Container, Nav} from 'react-bootstrap';

class NavBar extends React.Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="white" variant="light" fixed="top">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="images/logo.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        WhatFlix movie app
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Homepage</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/favorites">My Favorites</Nav.Link>
                            <Nav.Link href="/users/:username">My Profile</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
};

export default NavBar;