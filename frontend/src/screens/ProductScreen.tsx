import { useParams } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom"
import { Form, Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap"
import { Rating } from "../components/Rating"
import { useGetProductQuery } from "../state/slices/productsApiSlice"
import { Loader } from "../components/Loader"
import { useState } from "react"
import { addToCart } from "../state/slices/cartSlice"
import { useDispatch } from "react-redux"

export const ProductScreen = () => {
    const [cuantity, setCuantity] = useState(1)
    const { id } = useParams<{ id: string }>();
    const { data: product, error, isLoading } = useGetProductQuery(id!);
    const dispatch = useDispatch()
    const addToCartHandler = () => {
        dispatch(addToCart({ product, quantity: Number(cuantity) }))
    }
    return <>
        {
            isLoading ? (
                <Loader />
            ) : error ? (
                <h2>An error happened</h2>
            ) : (
                <div>
                    <Link to="/" className="btn btn-light my-3">Go back</Link>
                    <Row>
                        <Col lg={5}>
                            <Image src={product.image} alt={product.name} fluid></Image>
                        </Col>
                        <Col lg={4}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating starsNumber={product.rating} reviews={`${product.numReviews}`}></Rating>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col lg={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price:
                                            </Col>
                                            <Col className="text-center">
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status:
                                            </Col>
                                            <Col className="text-center">
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 &&
                                        < ListGroup.Item >
                                            <Row>
                                                <Col className="d-flex align-items-center">
                                                    Cuantity
                                                </Col>
                                                <Col>
                                                    <Form.Control as="select" className="text-center" value={cuantity} onChange={(e: any) => setCuantity(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    }
                                    <ListGroup.Item>
                                        <Button onClick={addToCartHandler} className="btn-block w-100" type="button" disabled={product.countInStock === 0}>Add to Cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </div >
            )
        }
    </>
}