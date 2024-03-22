import { Row, Col } from "react-bootstrap"
import {PRODUCTS} from "../products"
import { Product } from "../components/Product.tsx"

export const HomeScreen = () => {
    return (
        <section>
            <h1>Latest Products</h1>
            <Row className="gap-3 align-items-center justify-content-center">
                {PRODUCTS.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}></Product>
                    </Col>
                ))}
            </Row>
        </section>
    )
}