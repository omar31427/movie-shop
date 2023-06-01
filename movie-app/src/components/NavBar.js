
import { Container, Nav, Navbar } from 'react-bootstrap';

import NavDropdown from 'react-bootstrap/NavDropdown';
import {Outlet} from "react-router-dom";

function NavBar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>

                    <Navbar.Brand href="/Search">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/Search">Search</Nav.Link>
                        <Nav.Link href="/Cart">Cart</Nav.Link>
                        <Nav.Link href="/Checkout">Checkout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}

export default NavBar;