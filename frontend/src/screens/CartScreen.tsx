import { Message } from "../components/Message";
import { ICart } from "@/interfaces/ICart";
import { removeFromCart, addToCart } from "../state/slices/cartSlice";
import { Row, Col, ListGroup, Button, Card, Image, Form} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const CartScreen = () => {
    const cart:ICart = useSelector((state:any) => state.cart);
    const { cartItems, totalItems, totalPrice } = cart;
    const dispatch = useDispatch();
    
    const removeFromCartHandler = (id: string) => {
        dispatch(removeFromCart(id));
    };
    
    const checkoutHandler = () => {
        // Redirect to the login page if not logged in
        // history.push('/login?redirect=shipping');
    };
    
    return (
        <Row className="d-flex justify-content-center align-items-center h-100">
        <Col md={7}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
            <Message variant="warning" >
                Your cart is empty <Link to="/">Go Back</Link>
            </Message>
            ) : (
            <ListGroup variant="flush">
                {cartItems.map((item) => (
                <ListGroup.Item key={item.product._id}>
                    <Row>
                    <Col md={2}>
                        <Image src={item.product.image} alt={item.product.name} fluid rounded />
                    </Col>
                    <Col md={7} className="d-flex justify-content-start align-items-center">
                        <Link to={`/product/${item.product}`}>{item.product.name}</Link>
                    </Col>
                    <Col md={1} className="d-flex justify-content-center align-items-center">${item.product.price}</Col>
                    <Col md={1} className="d-flex justify-content-center align-items-center">
                        <Form.Control
                        as="select"
                        value={item.quantity}
                        onChange={(e) =>
                            dispatch(
                            addToCart(item.product)
                            )
                        }
                        >
                        {[...Array(item.product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                            {x + 1}
                            </option>
                        ))}
                        </Form.Control>
                    </Col>
                    <Col md={1} className="d-flex justify-content-center align-items-center">
                        <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product._id)}
                        >
                        <i className="fas fa-trash"></i>
                        </Button>
                    </Col>
                    </Row>
                </ListGroup.Item>
                ))}
            </ListGroup>
            )}
        </Col>
        <Col md={1}></Col>
        <Col md={4}>
            <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                <h2 className="fs-4 text-center">
                    Subtotal <span className="text-muted">{totalPrice}€</span>
                </h2>
                </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
                <Button
                type="button"
                className="btn-block w-100 rounded-bottom rounded-top-0"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                >
                Proceed To Checkout - {totalItems} items
                </Button>
            </ListGroup.Item>
            </Card>
        </Col>
        </Row>
    );
}