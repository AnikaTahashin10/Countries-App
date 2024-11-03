import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import { addFavourite, removeFavourite, saveFavourites } from "../store/favouritesSlice";
import CountryModal from "./CountriesSingle"; // Import the modal component
import './Countries.css'; // Import your CSS file for styles

const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const favourites = useSelector((state) => state.favourites.favourites);
  const user = useSelector((state) => state.auth.user);

  const [favourited, setFavourited] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null); // Track selected country

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  useEffect(() => {
    const favouritedCountries = {};
    favourites.forEach((country) => {
      favouritedCountries[country.name.official] = true;
    });
    setFavourited(favouritedCountries);
  }, [favourites]);

  const handleAddFavourite = (country) => {
    dispatch(addFavourite(country));
    const updatedFavourites = [...favourites, country];

    if (user) {
      dispatch(saveFavourites(user.uid, updatedFavourites));
    }

    setFavourited((prev) => ({ ...prev, [country.name.official]: true }));
  };

  const handleRemoveFavourite = (country) => {
    dispatch(removeFavourite(country));
    const updatedFavourites = favourites.filter(fav => fav.name.official !== country.name.official);

    if (user) {
      dispatch(saveFavourites(user.uid, updatedFavourites));
    }

    setFavourited((prev) => ({ ...prev, [country.name.official]: false }));
  };

  const handleShowModal = (country) => {
    setSelectedCountry(country);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCountry(null);
  };

  const sortedCountries = [...countriesList].sort((a, b) => {
    const aFavorited = favourited[a.name.official] ? -1 : 1;
    const bFavorited = favourited[b.name.official] ? -1 : 1;
    return aFavorited - bFavorited;
  });

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner animation="border" role="status" variant="info">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <Container fluid className="my-4"> {/* Add margins to the container */}
      <h1 className="text-center mb-4">Countries of the World</h1> {/* Title for the page */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {sortedCountries.map((country) => (
          <Col key={country.name.official}>
            <Card className={`country-card h-100 ${favourited[country.name.official] ? 'favourited' : ''}`}>
              <div className="favorite-icon-container">
                <FavoriteIcon
                  className={`favorite-icon ${favourited[country.name.official] ? 'active' : ''}`}
                  onClick={() => {
                    if (favourited[country.name.official]) {
                      handleRemoveFavourite(country);
                    } else {
                      handleAddFavourite(country);
                    }
                  }}
                />
              </div>
              <Card.Img
                variant="top"
                src={country.flags.svg}
                className="country-flag"
                onClick={() => handleShowModal(country)} // Open modal on click
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="country-title" onClick={() => handleShowModal(country)}>
                  {country.name.common}
                </Card.Title>
                <Card.Subtitle className="country-subtitle text-muted">
                  {country.name.official}
                </Card.Subtitle>
                <ListGroup variant="flush" className="flex-grow-1">
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
                    Population: {country.population.toLocaleString()}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* Modal for displaying country details */}
      <CountryModal show={showModal} handleClose={handleCloseModal} country={selectedCountry} />
    </Container>
  );
};

export default Countries;
