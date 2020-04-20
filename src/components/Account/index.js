import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdbreact";
import { withAuthorization, withEmailVerification } from "../Session";
import { withFirebase } from "../Firebase";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";

const SIGN_IN_METHODS = [
  {
    id: "password",
    provider: null,
  },
  {
    id: "google.com",
    provider: "googleProvider",
  },
  {
    id: "facebook.com",
    provider: "facebookProvider",
  },
  {
    id: "twitter.com",
    provider: "twitterProvider",
  },
];

const AccountPage = ({ authUser }) => (
  <div>
    <h1 className="text-center my-5 font-weight-bold">
      Account: {authUser.email}
    </h1>
    <MDBContainer>
      <MDBRow>
        <MDBCol md="1"></MDBCol>
        <MDBCol md="5" style={{ paddingBottom: 30, paddingTop: 30 }}>
          <PasswordChangeForm />
        </MDBCol>
        <MDBCol md="1"></MDBCol>
        <MDBCol md="5" style={{ paddingBottom: 30, paddingTop: 30 }}>
          <PasswordForgetForm account="true" />
        </MDBCol>
      </MDBRow>
      <div>
        <h1 className="text-center my-5 font-weight-bold">Sign In Methods:</h1>
      </div>
      <LoginManagement authUser={authUser} />
    </MDBContainer>
  </div>
);

class LoginManagementBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSignInMethods: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchSignInMethods();
  }

  fetchSignInMethods = () => {
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then((activeSignInMethods) =>
        this.setState({ activeSignInMethods, error: null })
      )
      .catch((error) => this.setState({ error }));
  };

  onSocialLoginLink = (provider) => {
    this.props.firebase.auth.currentUser
      .linkWithPopup(this.props.firebase[provider])
      .then(this.fetchSignInMethods)
      .catch((error) => this.setState({ error }));
  };

  onDefaultLoginLink = (password) => {
    const credential = this.props.firebase.emailAuthProvider.credential(
      this.props.authUser.email,
      password
    );

    this.props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch((error) => this.setState({ error }));
  };

  onUnlink = (providerId) => {
    this.props.firebase.auth.currentUser
      .unlink(providerId)
      .then(this.fetchSignInMethods)
      .catch((error) => this.setState({ error }));
  };

  render() {
    const { activeSignInMethods, error } = this.state;

    return (
      <MDBRow style={{ paddingBottom: 30 }}>
        {SIGN_IN_METHODS.map((signInMethod) => {
          const onlyOneLeft = activeSignInMethods.length === 1;
          const isEnabled = activeSignInMethods.includes(signInMethod.id);

          return signInMethod.id === "password" ? (
            <MDBCol md="3" style={{ paddingBottom: 30 }}>
              <DefaultLoginToggle
                onlyOneLeft={onlyOneLeft}
                isEnabled={isEnabled}
                signInMethod={signInMethod}
                onLink={this.onDefaultLoginLink}
                onUnlink={this.onUnlink}
              />
            </MDBCol>
          ) : (
            <MDBCol md="3" style={{ paddingBottom: 30 }}>
              <SocialLoginToggle
                onlyOneLeft={onlyOneLeft}
                isEnabled={isEnabled}
                signInMethod={signInMethod}
                onLink={this.onSocialLoginLink}
                onUnlink={this.onUnlink}
              />
            </MDBCol>
          );
        })}
        {error && error.message}
      </MDBRow>
    );
  }
}

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink,
}) =>
  isEnabled ? (
    <MDBBtn
      block
      type="button"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Deactivate {signInMethod.id}
    </MDBBtn>
  ) : (
    <MDBBtn block type="button" onClick={() => onLink(signInMethod.provider)}>
      Link {signInMethod.id}
    </MDBBtn>
  );

class DefaultLoginToggle extends Component {
  constructor(props) {
    super(props);

    this.state = { passwordOne: "", passwordTwo: "" };
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.props.onLink(this.state.passwordOne);
    this.setState({ passwordOne: "", passwordTwo: "" });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { onlyOneLeft, isEnabled, signInMethod, onUnlink } = this.props;

    const { passwordOne, passwordTwo } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return isEnabled ? (
      <MDBBtn
        block
        type="button"
        onClick={() => onUnlink(signInMethod.id)}
        disabled={onlyOneLeft}
      >
        Deactivate {signInMethod.id}
      </MDBBtn>
    ) : (
      <form onSubmit={this.onSubmit}>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />

        <MDBBtn block disabled={isInvalid} type="submit">
          Link {signInMethod.id}
        </MDBBtn>
      </form>
    );
  }
}

const LoginManagement = withFirebase(LoginManagementBase);

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const condition = (authUser) => !!authUser;

export default compose(
  connect(mapStateToProps),
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
