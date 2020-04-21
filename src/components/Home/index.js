import React, { Component } from "react";
import { compose } from "recompose";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
} from "mdbreact";

import { withAuthorization, withEmailVerification } from "../Session";
import Messages from "../Messages";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room: "spearfishing",
    };
  }

  onListSpearfishing = () => {
    this.setState({ room: "spearfishing" });
  };

  onListFences = () => {
    this.setState({ room: "fences" });
  };

  onListBoat = () => {
    this.setState({ room: "boat" });
  };

  render() {
    const { room } = this.state;
    return (
      <div>
        <h1 className="ml-3 font-weight-bold">Rooms</h1>
        <MDBContainer className="m-1">
          <MDBRow>
            <MDBCol md="4" className="d-flex">
              <MDBListGroup style={{ width: "22rem" }}>
                <p onClick={this.onListSpearfishing}>
                  <MDBListGroupItem
                    href="#spearfishing"
                    active={room === "spearfishing"}
                  >
                    Spearfishing
                  </MDBListGroupItem>
                </p>
                <p onClick={this.onListFences}>
                  <MDBListGroupItem
                    href="#fences"
                    active={room === "fences"}
                  >
                    Fences
                  </MDBListGroupItem>
                </p>
                <p onClick={this.onListBoat}>
                  <MDBListGroupItem
                    href="#boat"
                    active={room === "boat"}
                  >
                    Boat
                  </MDBListGroupItem>
                </p>
              </MDBListGroup>
            </MDBCol>
            <MDBCol md="8">
              <Messages room={room} />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
