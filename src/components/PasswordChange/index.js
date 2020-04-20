import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
} from "mdbreact";
import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5">
                    <strong>PasswordReset</strong>
                  </h3>
                </div>
                <MDBInput
                  label="Enter your new password"
                  name="passwordOne"
                  group
                  type="password"
                  validate
                  value={passwordOne}
                  onChange={this.onChange}
                />
                <MDBInput
                  label="Re-enter your new password"
                  name="passwordTwo"
                  group
                  type="password"
                  value={passwordTwo}
                  onChange={this.onChange}
                  validate
                  containerClass="mb-0"
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
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default withFirebase(PasswordChangeForm);
