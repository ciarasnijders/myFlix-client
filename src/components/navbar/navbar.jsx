import React from 'react';
import {Navbar,Container, Nav} from 'react-bootstrap';
import logo from './assets/logo.png';
import AppName from './assets/AppName.png';
import './navbar.scss';

class NavBar extends React.Component {
    render() {
        return (
            <Navbar className="navbar" collapseOnSelect expand="lg" style={{backgroundColor: 'white'}} fixed="top">
                <Container>
                    <Navbar.Brand className="name">
                        <img
                            alt="app logo"
                            src={logo}
                            width="50px"
                            height="50px"
                            className="d-inline-block align-left logo"
                        />{' '}
                    </Navbar.Brand>
                    
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">
                                <img
                                    alt="app name"
                                    src={AppName}
                                    height="58"
                                    width="200"
                                />{' '}
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/">Homepage</Nav.Link>
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