import { Row, Col } from "react-bootstrap"
import { Product } from "../components/Product.tsx"
import { useGetProductsQuery } from "../state/slices/productsApiSlice.ts"
import { IProduct } from "../interfaces/IProduct.ts";
import { Loader } from "../components/Loader.tsx";
import { Message } from "../components/Message.tsx";

export const HomeScreen = () => {
    const { data, error, isLoading } = useGetProductsQuery({
        pageNumber: "1"
    });
    const products:IProduct[] = data?.products || [];
    return (
        <section>
            {
                isLoading ? (
                    <Loader/>
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <>
                        <h1>Latest Products</h1>
                        <Row className="align-items-center justify-content-between row-gap-3">
                            {products.length>0 && products.map((product: IProduct) => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product}></Product>
                                </Col>
                            ))}
                        </Row>
                    </>
                )
            }

        </section>
    )
}