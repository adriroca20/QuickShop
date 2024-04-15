import { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../state/slices/cartSlice";
import { ICart } from "../interfaces/ICart";

export const PaymentScreen = () => {
    const cart:ICart = useSelector((state: any) => state.cart);
    const { shippingAddress, paymentMethod } = cart;

    const [selectedPaymentMethod, setPaymentMethod] = useState(paymentMethod || "");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(savePaymentMethod(selectedPaymentMethod));
        navigate('/placeorder');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3={true} step4={false} />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler} className="d-flex flex-column gap-2">
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked={selectedPaymentMethod == "PayPal"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check
                            type='radio'
                            label='Stripe'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            checked={selectedPaymentMethod == "Stripe"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary' disabled={selectedPaymentMethod == ""}>Continue</Button>
            </Form>
        </FormContainer>
    );
}