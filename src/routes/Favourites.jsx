import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import { fetchFavourites } from "../store/favouritesSlice";
import './Favourites.css'; // Import your CSS file for styles

const Favourites = () => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.favourites);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavourites(user.uid)); // Fetch favorites from Firestore
    }
  }, [dispatch, user]);

  return (
    <Container fluid>
      <h1 className="text-center mt-5">Your Favorite Countries</h1>
      {favourites.length === 0 ? (
        <p className="text-center">No favorites found.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4 mt-4">
          {favourites.map((country) => (
            <Col key={country.name.official}>
              <Card className="favourite-card h-100">
                <Card.Img
                  variant="top"
                  src={country.flags.svg}
                  className="country-flag"
                />
                <Card.Body>
                  <Card.Title className="country-title">{country.name.common}</Card.Title>
                  <Card.Subtitle className="country-subtitle text-muted">
                    {country.name.official}
                  </Card.Subtitle>
                  <ListGroup variant="flush" className="mt-3">
                    <ListGroup.Item>
                      <i className="bi bi-translate me-2"></i>
                      {Object.values(country.languages ?? {}).join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-cash-coin me-2"></i>
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-people me-2"></i>
                      {country.population.toLocaleString()}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favourites;
