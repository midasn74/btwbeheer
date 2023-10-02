import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function FullNavbar({ company }) {
  return (
    <>
        <style>
            .navbar-nav .nav-link {"{font-size: 24px;}"}
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
                <Nav.Link href="/Relations">Relations</Nav.Link>
            </Nav>

            <Nav className="ml-auto"> {/* Use ml-auto to push items to the right */}
                {company?.company_logo != null ? 
                    <Navbar.Brand href="/account">
                    <img
                        alt=""
                        src={company?.company_logo}
                        height="42"
                        className="d-inline-block align-top"
                    />
                    </Navbar.Brand>
                : 
                    <Navbar.Brand href="/account">
                    <img
                        alt=""
                        src="img/logoNoText.svg"
                        height="42"
                        className="d-inline-block align-top"
                    />
                    </Navbar.Brand>
                }

                <Nav.Link href="./logout">Logout</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    </>
  );
}

export default FullNavbar;