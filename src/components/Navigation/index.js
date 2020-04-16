import React from "react";
import { connect } from "react-redux";

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBContainer,
} from "mdbreact";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

const Navigation = ({ authUser }) =>
  authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />;

class NavigationAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    return (
      <MDBNavbar color="blue" dark expand="md">
        <MDBContainer>
          <MDBNavbarBrand href="/">
            <strong>Fisheries</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.onClick} />
          <MDBCollapse isOpen={this.state.collapse} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink /*onClick={this.onClick}*/ to={ROUTES.HOME}>Home</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink /*onClick={this.onClick}*/ to={ROUTES.ACCOUNT}>Account</MDBNavLink>
              </MDBNavItem>
              {!!this.props.authUser.roles[ROLES.ADMIN] && (
                <MDBNavItem >
                  <MDBNavLink /*onClick={this.onClick}*/ to={ROUTES.ADMIN}>Admin</MDBNavLink>
                </MDBNavItem>
              )}
              <MDBNavItem>
                <SignOutButton />
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    );
  }
}

class NavigationNonAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    return (
      <MDBNavbar color="blue" dark expand="md">
        <MDBContainer>
          <MDBNavbarBrand href="/">
            <strong>Fisheries</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.onClick} />
          <MDBCollapse isOpen={this.state.collapse} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink /*onClick={this.onClick}*/ to={ROUTES.LANDING}>Home</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink /*onClick={this.onClick}*/ to={ROUTES.SIGN_IN}>Sign In</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink /*onClick={this.onClick}*/ to={ROUTES.SIGN_UP}>Sign Up</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
