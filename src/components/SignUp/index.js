import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBModalFooter,
  MDBBtn,
} from "mdbreact";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

const SignUpPage = () => (
  <div style={{ paddingBottom: 30, paddingTop: 30 }}>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
  acceptTerms: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      acceptTerms,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "" ||
      acceptTerms === false;

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="3"></MDBCol>
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5">
                    <strong>Sign up</strong>
                  </h3>
                </div>
                <MDBInput
                  name="username"
                  label="Enter your username"
                  value={username}
                  onChange={this.onChange}
                  group
                  type="text"
                  validate
                />
                <MDBInput
                  name="email"
                  label="Enter your email"
                  value={email}
                  onChange={this.onChange}
                  group
                  type="email"
                  validate
                />
                <MDBInput
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  label="Enter your password"
                  group
                  type="password"
                  validate
                />
                <MDBInput
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  label="Confirm your password"
                  group
                  type="password"
                  validate
                />
                <div className="custom-control custom-checkbox pl-3 m-3">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    name="isAdmin"
                    onChange={this.onChangeCheckbox}
                    value={isAdmin}
                    id="invalidCheck1"
                    required
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="invalidCheck1"
                  >
                    Check for an admin account
                  </label>
                </div>
                <div className="custom-control custom-checkbox pl-3 m-3">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    name="acceptTerms"
                    onChange={this.onChangeCheckbox}
                    value={acceptTerms}
                    id="invalidCheck2"
                    required
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="invalidCheck2"
                  >
                    <>
                        Accept&nbsp;
                        <Link to={ROUTES.TAC}>the terms and conditions</Link>
                      </>
                  </label>
                </div>
                <MDBRow className="d-flex align-items-center mb-4">
                  <MDBCol md="12" className="text-center">
                    <MDBBtn
                      type="button"
                      gradient="blue"
                      rounded
                      disabled={isInvalid}
                      onClick={this.onSubmit}
                      className="btn-block z-depth-1a"
                    >
                      Sgin Up
                    </MDBBtn>
                    {error && <p>{error.message}</p>}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
              <MDBModalFooter className="mx-5 pt-3 mb-1">
                <p className="font-small grey-text d-flex justify-content-end">
                  Have an account?
                  <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                </p>
              </MDBModalFooter>
            </MDBCard>
          </MDBCol>
          <MDBCol md="3"></MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
