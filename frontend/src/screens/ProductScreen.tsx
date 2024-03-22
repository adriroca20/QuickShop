import { PRODUCTS } from "../products"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Row,Col, Image,ListGroup,Card,Button } from "react-bootstrap"
import { Rating } from "../components/Rating"

export const ProductScreen = () => {
    const {id:productId} = useParams<{id:string}>()
    const product = PRODUCTS.find(product => product._id === productId)
    if(!product){
        return <h2>Product not found</h2>
    }
    return (
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
                            <Rating starsNumber={product.rating} reviews={`${product.numReviews} reviews`}></Rating>
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
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className="btn-block" type="button" disabled={product.countInStock === 0}>Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}