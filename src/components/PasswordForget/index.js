import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBModalFooter,
} from "mdbreact";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const PasswordForgetPage = () => (
  <div style={{ paddingBottom: 30, paddingTop: 30 }}>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";
    if (this.props.account === "true") {
      return (
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <MDBCard>
                <MDBCardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text">
                      <strong>PasswordForget</strong>
                    </h3>
                  </div>
                  <MDBInput
                    name="email"
                    label="Enter your email"
                    value={email}
                    onChange={this.onChange}
                    group
                    type="email"
                    validate
                  />
                  <div className="text-center">
                    <MDBBtn
                      rounded
                      onClick={this.onSubmit}
                      disabled={isInvalid}
                      outline
                      color="info"
                    >
                      Send me reset email
                      <MDBIcon far icon="paper-plane" className="ml-2" />
                    </MDBBtn>
                  </div>
                  <div className="text-center">
                    {error && <p>{error.message}</p>}
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      );
    }

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="4"></MDBCol>
          <MDBCol md="4">
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5">
                    <strong>PasswordForget</strong>
                  </h3>
                </div>
                <MDBInput
                  name="email"
                  label="Enter your email"
                  value={email}
                  onChange={this.onChange}
                  group
                  type="email"
                  validate
                />
                <div className="text-center py-3 mt-3">
                  <MDBBtn
                    rounded
                    onClick={this.onSubmit}
                    disabled={isInvalid}
                    outline
                    color="info"
                  >
                    Reset My Password
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                  </MDBBtn>
                </div>
                <div className="text-center">
                  {error && <p>{error.message}</p>}
                </div>
              </MDBCardBody>
              <MDBModalFooter className="mx-4 pt-3 mb-1">
                <p className="font-small grey-text d-flex justify-content-end">
                  Try sign in?
                  <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                </p>
              </MDBModalFooter>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4"></MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
