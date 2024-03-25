import { IProduct } from "@/interfaces/IProduct"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Rating } from "./Rating"

export const Product = ({ product }: { product: IProduct }) => {
    return (
        <Card className="rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} alt={product.name} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="h3"  className="fs-5 text-nowrap text-truncate">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Footer className="pt-2">
                    <Rating starsNumber={product.rating} reviews={`${product.numReviews} reviews`} />
                    <h4 className="fs-3 mt-2">{product.price}€</h4>
                </Card.Footer>
            </Card.Body>
        </Card>

    )
}