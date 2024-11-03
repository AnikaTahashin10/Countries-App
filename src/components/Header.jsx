// src/components/Header.jsx
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Countries App</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="me-auto">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/countries" className="nav-link">Countries</Link>
          <Link to="/favourites" className="nav-link">Favourites</Link>
        </Nav>
        <Nav>
          {user ? (
            <>
              <Navbar.Text className="me-2">Welcome, {user.email}</Navbar.Text>
              <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline-light">Login</Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
