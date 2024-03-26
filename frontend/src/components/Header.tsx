import { Navbar, Nav, Container, Badge } from "react-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"

export const Header = () => {
    const { totalItems } = useSelector((state: any) => state.cart)
    console.log(totalItems)
    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Navbar</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Nav>
                        <LinkContainer to="/login">
                            <Nav.Link>
                                <FaUser></FaUser> Login
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
                <LinkContainer to="/cart">
                    <Nav.Link className="text-white d-flex justify-content-center align-items-center gap-1 position-relative">
                        <FaShoppingCart></FaShoppingCart> Cart
                        {
                            totalItems > 0 && (
                                <Badge pill bg="success" style={{
                                    position: "absolute",
                                    top: "-10px",
                                    right: "-35px"
                                }}>
                                    {totalItems}
                                </Badge>
                            )
                        }
                    </Nav.Link>
                </LinkContainer>
            </Container>
        </Navbar>
    )
}