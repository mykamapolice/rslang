import React from 'react';
import Authentication from '../Authentication/Authentication';

import {
  Button, Form, FormControl, Nav, Navbar,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import LogIn from '../Authentication/LogIn';

function Header(): JSX.Element {
  return (
        <Navbar bg="light">
            <Navbar.Brand to="/" as={NavLink} exact>
                RS-Lang
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link eventKey="1" to="/learning" as={NavLink}>
                        Learning
                    </Nav.Link>
                    <Nav.Link eventKey="2" to="/mini-games" as={NavLink}>
                        MiniGames
                    </Nav.Link>
                    <Nav.Link eventKey="3" to="/vocabulary" as={NavLink}>
                        Vocabulary
                    </Nav.Link>
                    <Nav.Link eventKey="4" to="/statistics" as={NavLink}>
                        Statistics
                    </Nav.Link>
                    <Nav.Link eventKey="5" to="/team" as={NavLink}>
                        Team
                    </Nav.Link>
                    <Nav.Link eventKey="6" to="/settings" as={NavLink}>
                        Settings
                    </Nav.Link>
                </Nav>
                <Authentication />
            </Navbar.Collapse>
        </Navbar>
  );
}

export default Header;
