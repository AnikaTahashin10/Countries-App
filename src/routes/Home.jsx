import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import your custom CSS for styles

const Home = () => {
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (loading) {
    return <div className="loading">Loading...</div>; // Show loading state
  }

  return (
    <Container className="home-container text-center">
      <Row className="align-items-center">
        <Col>
          <h1 className="display-4 mb-4">
            {user ? `Welcome, ${user.email}` : 'Hello There, Stranger!'}
          </h1>
          <h2 className="mb-4">
            {user ? 'Ready to explore the world?' : 'Wanna create an account?'}
          </h2>
          {user ? (
            <Button variant="primary" className="btn-home" onClick={() => navigate('/countries')}>
              View Countries
            </Button>
          ) : (
            <Button variant="success" className="btn-home" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </Col>
      </Row>
      {error && <div className="error">{error}</div>} {/* Display error if exists */}
    </Container>
  );
};

export default Home;
