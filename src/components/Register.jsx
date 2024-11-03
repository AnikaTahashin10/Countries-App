import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../store/firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../store/authSlice";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail, displayName } = userCredential.user;
      dispatch(setUser({ uid, email: userEmail, displayName }));
      navigate("/");
    } catch (error) {
      setError("Registration failed: " + error.message);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
        <Button
          variant="link"
          onClick={() => navigate('/login')}
        >
          Already have an account? Log in
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
