import { Message } from "../components/Message";
import { ICart } from "@/interfaces/ICart";
import { removeFromCart, updateCartItem } from "../state/slices/cartSlice";
import { Row, Col, ListGroup, Button, Card, Image, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { ICartItem } from "@/interfaces/ICartItem";

export const CartScreen = () => {
    const cart: ICart = useSelector((state: any) => state.cart);
    const { cartItems, totalItems, totalPrice, shippingPrice, taxPrice} = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const removeFromCartHandler = (id: string) => {
        dispatch(removeFromCart(id));
    };
    const updateFromCartHandler = (item:ICartItem) => {
        dispatch(updateCartItem(item));
    }
    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    };

    return (
        <Row className="d-flex justify-content-center align-items-center h-100">
            <Col lg={7}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant="info" >
                        Your cart is empty <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product._id}>
                                <Row>
                                    <Col lg={2}>
                                        <Image src={item.product.image} alt={item.product.name} fluid rounded />
                                    </Col>
                                    <Col lg={6} className="d-flex justify-content-start align-items-center" style={{textWrap:"pretty"}}>
                                        <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                                    </Col>
                                    <Col lg={1} className="d-flex justify-content-center align-items-center">${item.product.price}</Col>
                                    <Col lg={2} className="d-flex justify-content-center align-items-center">
                                        <Form.Control
                                            as="select"
                                            value={item.quantity}
                                            onChange={(e)=>updateFromCartHandler({product:item.product, quantity:Number(e.target.value)})}
                                        >
                                            {[...Array(item.product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col lg={1} className="d-flex justify-content-center align-items-center">
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() => removeFromCartHandler(item.product._id)}
                                        >
                                            <FaTrash></FaTrash>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                         <ListGroup.Item key="shipping-price">
                            <Row>
                                <Col lg={10}>
                                    <h2 className="fs-5 m-0">Shipping</h2>
                                </Col>
                                <Col lg={2} className="d-flex justify-content-end align-items-center">
                                    ${shippingPrice}
                                </Col>
                            </Row>
                         </ListGroup.Item>
                            <ListGroup.Item key="tax-price">
                                <Row >
                                    <Col lg={10}>
                                        <h2 className="fs-5 m-0">Tax</h2>
                                    </Col>
                                    <Col lg={2} className="d-flex justify-content-end align-items-center">
                                        ${taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                    </ListGroup>
                )}
            </Col>
            <Col lg={1}></Col>
            <Col lg={4}>
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