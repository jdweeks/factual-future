import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import logo from './logo.svg';
import './Menu.css';


export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Navbar className="customNav" color="dark" dark>
          <img height="50px" width="50px" src={logo} alt="logo"/>&nbsp;&nbsp;&nbsp;
          <NavbarBrand href="/" className="mr-auto">factual future</NavbarBrand>
        </Navbar>
      </div>
    );
  }
}
