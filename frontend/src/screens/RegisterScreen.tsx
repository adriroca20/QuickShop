import { useRegisterMutation } from "../state/slices/usersApiSlice";
import { Loader } from "../components/Loader";
import { register } from "module";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import { setCredentials } from "../state/slices/authSlice";

export const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const [register, { isLoading }] = useRegisterMutation();
    const redirect = location.search ? location.search.split('=')[1] : '/';

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
            }
            catch (err: any) {
                toast.error(err?.data?.message || err.error?.message || err.error || "An error occured");
            }
        };
    }
        return (
            <FormContainer>
                <h1>Sign Up</h1>
                {isLoading && <Loader></Loader>}
                <Form onSubmit={submitHandler} className="d-flex flex-column gap-2">
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' disabled={isLoading}>Register</Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                        Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                    </Col>
                </Row>
            </FormContainer>
        );
    }