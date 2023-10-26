import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function FullNavbar({ company }) {
  return (
    <>
        <style>
            .navbar-nav .nav-link {"{font-size: 24px;}"}

            .button-svg {"{fill: var(--bs-nav-link-color); transition: fill .15s ease-in-out}"}
            .button-svg:hover {"{fill: var(--bs-navbar-active-color);}"}
        </style>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
            <Nav className="me-auto">
                <Navbar.Brand href="/">
                <img
                    alt=""
                    src="img/logoNoText.svg"
                    height="42"
                    className="d-inline-block align-top"
                />
                </Navbar.Brand>
                <Nav.Link href="/Invoicing">Invoicing</Nav.Link>
                <Nav.Link href="/Quoting">Quoting</Nav.Link>
                <Nav.Link href="/Relations">Relations</Nav.Link>
            </Nav>

            <Nav className="ml-auto"> {/* Use ml-auto to push items to the right */}

                <Navbar.Brand href="/account">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" className="button-svg d-inline-block align-bottom bi bi-sliders2" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5ZM12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5ZM1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8Zm9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5Zm1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z"/>
                </svg>
                </Navbar.Brand>

                <Nav.Link href="./logout">Logout</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    </>
  );
}

export default FullNavbar;