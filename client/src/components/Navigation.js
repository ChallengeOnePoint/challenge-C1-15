import React from 'react';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';

export default class Navigation extends React.Component {
  constructor(props) {
        super(props);
        this.state = {};
    }

  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps() {}
  shouldComponentUpdate() {}
  componentWillUpdate() {}
  componentWillUnmount() {}

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">El Contactor</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Link</NavItem>
          <NavItem eventKey={2} href="#">Link</NavItem>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}
Navigation.displayName = 'Navigation';
Navigation.propTypes = {};
Navigation.defaultProps = {};
