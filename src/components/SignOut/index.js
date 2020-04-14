import React from 'react';
import { MDBBtn } from "mdbreact";
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <MDBBtn size="sm" onClick={firebase.doSignOut}>
    Sign Out
  </MDBBtn>
);

export default withFirebase(SignOutButton);
