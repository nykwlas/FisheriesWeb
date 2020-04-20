import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBCardHeader,
  MDBCardTitle,
  MDBCardText,
} from "mdbreact";
import { withFirebase } from "../Firebase";

class UserItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    if (!this.props.user) {
      this.setState({ loading: true });
    }

    this.props.firebase
      .user(this.props.match.params.id)
      .on("value", (snapshot) => {
        this.props.onSetUser(snapshot.val(), this.props.match.params.id);
        this.setState({ loading: false });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.props.user.email);
  };

  render() {
    const { user } = this.props;
    const { loading } = this.state;

    return (
      <div>
        {/* <h2>User ({this.props.match.params.id})</h2> */}
        {loading ? (
          <div>Loading ...</div>
        ) : (
          user && (
            <MDBContainer>
              <MDBRow>
                <MDBCol md="4"></MDBCol>
                <MDBCol md="4">
                  <MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
                    <MDBCardHeader color="primary-color" tag="h3">
                      User Details
                    </MDBCardHeader>
                    <MDBCardBody>
                      <MDBCardTitle>{user.username}</MDBCardTitle>
                      <MDBCardText>
                        E-mail: {user.email}
                      </MDBCardText>
                      <MDBCardText>
                      User Id: {this.props.match.params.id}
                      </MDBCardText>
                      <MDBBtn onClick={this.onSendPasswordResetEmail} color="primary">Reset Password</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="4"></MDBCol>
              </MDBRow>
            </MDBContainer>
          )
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: (state.userState.users || {})[props.match.params.id],
});

const mapDispatchToProps = (dispatch) => ({
  onSetUser: (user, uid) => dispatch({ type: "USER_SET", user, uid }),
});

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(UserItem);
