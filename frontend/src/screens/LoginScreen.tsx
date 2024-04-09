import { useState, useEffect} from "react";
import { Link , useLocation, useNavigate} from "react-router-dom";
import { Form, Button, Row, Col} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../state/slices/usersApiSlice";
import { setCredentials } from "../state/slices/authSlice";
import {toast} from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";

export const LoginScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, {isLoading}] = useLoginMutation();

    const {userInfo} = useSelector((state: any) => state.auth);
    const {search} = useLocation();
    const searchParams = new URLSearchParams(search);
    const redirect = searchParams.get("redirect") || "/";
    useEffect(() => {
        if(userInfo){
            // navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate(redirect);
        }
        catch(err: any){
            toast.error(err?.data?.message || err.error?.message || err.error || "An error occured");
        }
    }

    return (
        <FormContainer>

            <h1>Sign In</h1>
            <Form onSubmit={submitHandler} className="d-flex flex-column justify-content-center align-items-start gap-3 w-100">
                <Form.Group controlId="email" className="w-100">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="w-100">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="sw-25" disabled= {isLoading}>Sign In</Button>
                {isLoading && <Loader></Loader>}
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer? <Link to={"/register"}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}