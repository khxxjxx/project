import { Navbar, Container, Nav } from 'react-bootstrap';
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';

const NavBar = props => {
  const clickHandler = () => {
    props.setNow(moment());
  };

  return (
    <Navbar bg="dark" variant="dark" className="header">
      <Container>
        <Link to="/todo/today">
          <Navbar.Brand className="todo" onClick={clickHandler}>
            TO DO
          </Navbar.Brand>
        </Link>
        <Nav onClick={clickHandler} className="justify-content-end">
          <NavLink
            as={Link}
            to="/todo/today"
            className="nav__today"
            activeClassName="active">
            Today
          </NavLink>
          <NavLink
            as={Link}
            to="/todo/month"
            className="nav__month"
            activeClassName="active">
            Month
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
