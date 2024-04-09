import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { useLogoutMutation } from "../state/slices/usersApiSlice"
import {removeCredentials} from "../state/slices/authSlice"
import { UseSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const Header = () => {
    const { totalItems } = useSelector((state: any) => state.cart)
    const { userInfo } = useSelector((state: any) => state.auth)
    const [logoutApiCall] = useLogoutMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            await logoutApiCall("").unwrap()
            dispatch(removeCredentials())
            navigate("/login")
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Quickshop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Nav>
                        {
                            userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <FaUser></FaUser> Login
                                    </Nav.Link>
                                </LinkContainer>
                            )
                        }
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