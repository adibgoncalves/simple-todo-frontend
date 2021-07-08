import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { HeaderContainer } from './HeaderComponent.style';

const HeaderComponent = () => {
    return(
        <HeaderContainer>
            <Navbar expand="lg" className="container">
                <Navbar.Brand className="text-light" href="/">MakeNow</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link className="text-light" href="/new">Nova tarefa</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
        </HeaderContainer>
    )
}

export default HeaderComponent;