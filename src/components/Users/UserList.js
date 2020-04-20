import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { MDBContainer, MDBRow, MDBBtn, MDBDataTable } from "mdbreact";

import { withFirebase } from "../Firebase";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    if (!this.props.users.length) {
      this.setState({ loading: true });
    }

    this.props.firebase.users().on("value", (snapshot) => {
      this.props.onSetUsers(snapshot.val());

      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users } = this.props;
    const { loading } = this.state;
    // console.log(users);
    var arrayLength = users.length;
    for (var i = 0; i < arrayLength; i++) {
      users[i].details = (
        <Link to={`${ROUTES.ADMIN}/${users[i].uid}`}>
          <MDBBtn size="sm">Details</MDBBtn>
        </Link>
      );
    }
    const data = {
      columns: [
        {
          label: "E-mail",
          field: "email",
          sort: "asc",
          width: 270,
        },
        {
          label: "Username",
          field: "username",
          sort: "asc",
          width: 200,
        },
        {
          label: "UserId",
          field: "uid",
          sort: "asc",
          width: 150,
        },
        {
          label: "Details",
          field: "details",
          sort: "asc",
          width: 100,
        },
      ],
      rows: this.props.users,
    };

    return (
      <div>
        <MDBContainer>
          <MDBRow>
            <h1 className="my-5 ml-2 font-weight-bold">Users</h1>
          </MDBRow>
          {loading ? (
            <div>Loading ...</div>
          ) : (
            <MDBRow>
              <MDBDataTable autoWidth responsiveMd striped bordered hover data={data} />
            </MDBRow>
          )}
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: Object.keys(state.userState.users || {}).map((key) => ({
    ...state.userState.users[key],
    uid: key,
  })),
});

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: "USERS_SET", users }),
});

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(UserList);
