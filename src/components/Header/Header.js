import React,{Component} from 'react';
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Header.css';
class Header extends Component {
  render(){
    return(
      <Navbar bsStyle="inverse">
        <Navbar.Header>
          <Navbar.Brand>
            BIED
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#"><Link to='/'>Home</Link></NavItem>
            <NavDropdown eventKey={3} title="Surveys" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>মূল্যবোধ জরিপ (তরুণদের জন্য)</MenuItem>
              <MenuItem eventKey={3.2}>Another Survey</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#"><Link to='/Dashboard'>Admin Dashboard</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
