import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({children}: {children:any})=>{
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={11} lg={8}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer;