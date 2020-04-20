import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import {
  MDBEdgeHeader,
  MDBBtn,
  MDBFreeBird,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBIcon,
  MDBCard,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
  MDBNavLink,
  MDBFooter,
} from "mdbreact";
import "./index.css";

const Landing = () => {
  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <>
      <MDBEdgeHeader color="blue" className="sectionPage" />
      <div className="mt-3 mb-5">
        <MDBFreeBird>
          <MDBRow>
            <MDBCol
              md="10"
              className="mx-auto float-none white z-depth-1 py-2 px-2"
            >
              <MDBCardBody className="text-center">
                <h2 className="h2-responsive mb-4">
                  <strong className="font-weight-bold">
                    Fisheries Web
                  </strong>
                </h2>
                <MDBRow />
                <p>Short Description</p>
                <p className="pb-4">
                  This application shows the actual use of Fisheries Mobile App.
                </p>
                <MDBRow className="d-flex flex-row justify-content-center row">
                  <Link
                    className="border nav-link border-light rounded mr-1 mx-2 mb-2 font-weight-bold"
                    to={ROUTES.USER_GUIDE}
                  >
                    <MDBIcon icon="graduation-cap" className="mr-2" />
                    User Guide
                  </Link>

                  <Link
                    className="border nav-link border-light rounded mx-2 mb-2 font-weight-bold"
                    to={ROUTES.SIGN_UP}
                  >
                    <MDBIcon icon="fish" className="mr-2" />
                    Register Now
                  </Link>
                </MDBRow>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBFreeBird>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="12" className="mt-4">
              <h2 className="text-center my-5 font-weight-bold">
                What we offer?
              </h2>
              <p className="text-center text-muted mb-1">
                A small paragraph of what we offer
              </p>
              <p className="text-center text-muted mb-1">Line 2</p>
              <p className="text-center text-muted">Line 3</p>
              <hr className="my-5" />
              <MDBRow id="categories">
                <MDBCol md="4">
                    <MDBCard cascade className="my-3 grey lighten-4">
                      <MDBCardImage
                        cascade
                        className="images"
                        src="https://upload.wikimedia.org/wikipedia/commons/2/23/Global_tropical_cyclone_tracks-edit2.jpg"
                      />
                      <MDBCardBody cascade className="text-center">
                        <MDBCardTitle>
                          <MDBIcon
                            icon="cloud-sun-rain"
                            className="blue-text pr-2"
                          />
                          <strong>WEATHER</strong>
                        </MDBCardTitle>
                        <MDBCardText>About Weather...</MDBCardText>
                        <MDBNavLink
                          tag="button"
                          to="/weather"
                          color="mdb-color"
                          className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
                          onClick={scrollToTop}
                        >
                          More
                        </MDBNavLink>
                      </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                    <MDBCard cascade className="my-3 grey lighten-4">
                      <MDBCardImage
                        cascade
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Redear_sunfish_FWS_1.jpg"
                        className="images"
                      />
                      <MDBCardBody cascade className="text-center">
                        <MDBCardTitle>
                          <MDBIcon icon="copy" className="blue-text pr-2" />
                          <strong>REPORTS</strong>
                        </MDBCardTitle>
                        <MDBCardText>About catch reporting...</MDBCardText>
                        <MDBNavLink
                          tag="button"
                          to="/reports"
                          color="mdb-color"
                          className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
                          onClick={scrollToTop}
                        >
                          More
                        </MDBNavLink>
                      </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                    <MDBCard cascade className="my-3 grey lighten-4">
                      <MDBCardImage
                        cascade
                        className="images"
                        src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Eucalyp-Deus_Books.png"
                      />
                      <MDBCardBody cascade className="text-center">
                        <MDBCardTitle>
                          <MDBIcon
                            icon="book-open"
                            className="green-text pr-2"
                          />
                          <strong>LIBRARY</strong>
                        </MDBCardTitle>
                        <MDBCardText>About Library...</MDBCardText>

                        <MDBNavLink
                          tag="button"
                          to="/library"
                          color="mdb-color"
                          className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
                          onClick={scrollToTop}
                        >
                          More
                        </MDBNavLink>
                      </MDBCardBody>
                    </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <MDBFooter color="blue">
        <p className="footer-copyright mb-0 py-3 text-center">
          &copy; {new Date().getFullYear()} Copyright:&nbsp;
          <MDBBtn size="sm" onClick={scrollToTop}>
            fisheries-2c0cb.web.app
          </MDBBtn>
        </p>
      </MDBFooter>
    </>
  );
};

export default Landing;
