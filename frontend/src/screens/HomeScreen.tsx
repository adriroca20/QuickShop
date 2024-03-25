import { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import { Product } from "../components/Product.tsx"
import { IProduct } from "../interfaces/IProduct"
import axios from "axios"
export const HomeScreen = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get("http://localhost:5000/api/products")
            setProducts(data)
        }
        fetchProducts()
    }, [])
    return (
        <section>
            <h1>Latest Products</h1>
            <Row className="gap-3 align-items-center justify-content-center">
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}></Product>
                    </Col>
                ))}
            </Row>
        </section>
    )
}