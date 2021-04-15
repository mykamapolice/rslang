import React from 'react'
import Authentication from '../Authentication/Authentication'

import { Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function Header(): JSX.Element {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand to="/" as={NavLink} exact>
                RS-Lang
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link eventKey="1" to="/book" as={NavLink}>
                        Электронный учебник
                    </Nav.Link>
                    <Nav.Link eventKey="2" to="/mini-games" as={NavLink}>
                        Мини-игры
                    </Nav.Link>
                    <Nav.Link eventKey="3" to="/statistics" as={NavLink}>
                        Статистика
                    </Nav.Link>
                    <Nav.Link eventKey="4" to="/team" as={NavLink}>
                        Команда
                    </Nav.Link>
                    <Nav.Link eventKey="5" to="/settings" as={NavLink}>
                        Настройки
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Authentication/>
        </Navbar>
    )
}

export default Header
