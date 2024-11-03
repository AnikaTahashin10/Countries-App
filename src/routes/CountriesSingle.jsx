import { Modal, Button, Row, Col } from "react-bootstrap";
import { Globe2, Cash, People, Map, Clock } from "react-bootstrap-icons";
import PropTypes from 'prop-types'; 

export default function CountryModal({ show, handleClose, country }) {
  if (!country) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="text-primary">{country.name.common}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6} className="mb-4 mb-md-0">
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="img-fluid rounded shadow-sm"
            />
          </Col>
          <Col md={6}>
            <h6 className="text-muted mb-3">{country.name.official}</h6>
            <div className="country-info">
              <InfoItem icon={<Globe2 />} label="Capital" value={country.capital?.join(", ") || "N/A"} />
              <InfoItem
                icon={<People />}
                label="Population"
                value={country.population.toLocaleString()}
              />
              <InfoItem icon={<Map />} label="Region" value={country.region} />
              <InfoItem icon={<Map />} label="Subregion" value={country.subregion || "N/A"} />
              <InfoItem
                icon={<Map />}
                label="Area"
                value={country.area ? `${country.area.toLocaleString()} km²` : "N/A"}
              />
              <InfoItem
                icon={<Globe2 />}
                label="Languages"
                value={Object.values(country.languages || {}).join(", ")}
              />
              <InfoItem
                icon={<Cash />}
                label="Currencies"
                value={Object.values(country.currencies || {})
                  .map((currency) => currency.name)
                  .join(", ")}
              />
              <InfoItem icon={<Clock />} label="Time Zones" value={country.timezones.join(", ")} />
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

CountryModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  country: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string.isRequired,
      official: PropTypes.string.isRequired,
    }).isRequired,
    flags: PropTypes.shape({
      svg: PropTypes.string.isRequired,
    }).isRequired,
    capital: PropTypes.arrayOf(PropTypes.string),
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    subregion: PropTypes.string,
    area: PropTypes.number,
    languages: PropTypes.object,
    currencies: PropTypes.object,
    timezones: PropTypes.arrayOf(PropTypes.string),
  }),
};

function InfoItem({ icon, label, value }) {
  return (
    <div className="d-flex align-items-center mb-2">
      <div className="text-primary me-2">{icon}</div>
      <div>
        <strong>{label}:</strong> {value}
      </div>
    </div>
  );
}

InfoItem.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
