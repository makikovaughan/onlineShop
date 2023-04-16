import { useRecoilState } from "recoil";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React from "react";
import { Navigate } from "react-router-dom";

import NavBar from "../Components/NavBar";
import { userState } from "../globalstate";
import PageFooter from "../Components/PageFooter";
import { createUser } from "../Services/api";

const initialError = {
  isError: false,
  message: "",
};

const User = () => {
  const [user, setUser] = useRecoilState(userState);
  const [tempUser, setTempUser] = useState({});
  const [error, setError] = useState(initialError);

  const createUserProfile = async (newUser) => {
    const result = await createUser(newUser);
    if (result.message != null) {
      setError({
        isError: true,
        message:
          "Duplicate username and/or email address. Please use different username or/and email address",
      });
      setUser(user);
    } else {
      if (!user.isAdmin) {
        setUser({
          id: result.id,
          isLoggedIn: true,
          isAdmin: result.isAdmin,
          username: result.username,
          password: result.password,
          email: result.profile.email,
          firstName: result.profile.firstName,
          lastName: result.profile.lastName,
          phone: result.profile.phone,
          street: result.profile.street,
          city: result.profile.city,
          state: result.profile.state,
          zipcode: result.profile.zipcode,
        });
      } else {
        setUser(user);
      }
      document.getElementById("formGridUserName").value = "";
      document.getElementById("formGridPassword").value = "";
      document.getElementById("formGridFirstName").value = "";
      document.getElementById("formGridLastName").value = "";
      document.getElementById("formGridEmail").value = "";
      document.getElementById("formGridPhone").value = "";
      document.getElementById("formGridAddress").value = "";
      document.getElementById("formGridCity").value = "";
      document.getElementById("formGridState").value = "Choose...";
      document.getElementById("formGridZip").value = "";
    }
  };

  const checkError = (temp) => {
    if (
      temp.username.length === 0 ||
      temp.password.length === 0 ||
      temp.email.length === 0 ||
      temp.firstName.length === 0 ||
      temp.lastName.length === 0 ||
      temp.lastName.length === 0 ||
      temp.street.length === 0 ||
      temp.city.length === 0 ||
      temp.state.length !== 2 ||
      temp.zipcode.length === 0
    ) {
      const errorReason = {
        isError: true,
        message: "Please fill out all required fields(*)",
      };
      setError(errorReason);
      setError(errorReason);
    } else {
      createUserProfile(temp);
      setError(initialError);
    }
  };

  const clickHandler = (event) => {
    event.preventDefault();
    const temp = {
      username: document.getElementById("formGridUserName").value,
      password: document.getElementById("formGridPassword").value,
      isAdmin: false,
      firstName: document.getElementById("formGridFirstName").value,
      lastName: document.getElementById("formGridLastName").value,
      email: document.getElementById("formGridEmail").value,
      phone: document.getElementById("formGridPhone").value,
      street: document.getElementById("formGridAddress").value,
      city: document.getElementById("formGridCity").value,
      state: document.getElementById("formGridState").value,
      zipcode: document.getElementById("formGridZip").value,
    };
    setTempUser(temp);
    setUser(tempUser);
    checkError(temp);
  };

  //   useEffect(() => {}, [error]);
  useEffect(() => {}, [user]);
  if (user.isLoggedIn && !user.isAdmin) {
    return <Navigate replace to="/"></Navigate>;
  } else {
    return (
      <div>
        <NavBar />
        <div className="ms-5 me-5" style={{ color: "#d282a6" }}>
          <Form>
            <Row className="mb-3" style={{ color: "#d282a6" }}>
              <Form.Group
                as={Col}
                controlId="formGridUserName"
                style={{ marginTop: "15%" }}
              >
                <Form.Label>User Name*</Form.Label>
                <Form.Control type="text" placeholder="Enter User Name" />
              </Form.Group>

              <Form.Group
                as={Col}
                controlId="formGridPassword"
                style={{ marginTop: "15%" }}
              >
                <Form.Label>Password*</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Row>

            <Row className="mb-3" style={{ color: "#d282a6" }}>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name*</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name*</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" />
              </Form.Group>
            </Row>

            <Row className="mb-3" style={{ color: "#d282a6" }}>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone Number(Digit Only)</Form.Label>
                <Form.Control type="text" placeholder="1234567890" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress">
              <Form.Label>Address*</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City*</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State*</Form.Label>
                <Form.Select style={{ color: "#d282a6" }} defaultValue="">
                  <option>Choose...</option>
                  <option key="1" value="AL">
                    AL
                  </option>
                  <option key="2" value="AK">
                    AK
                  </option>
                  <option key="3" value="AZ">
                    AZ
                  </option>
                  <option key="4" value="AR">
                    AR
                  </option>
                  <option key="5" value="CA">
                    CA
                  </option>
                  <option key="6" value="CO">
                    CO
                  </option>
                  <option key="7" value="CT">
                    CT
                  </option>
                  <option key="8" value="DE">
                    DE
                  </option>
                  <option key="51" value="DC">
                    DC
                  </option>
                  <option key="9" value="FL">
                    FL
                  </option>
                  <option key="10" value="GA">
                    GA
                  </option>
                  <option key="11" value="HI">
                    HI
                  </option>
                  <option key="12" value="ID">
                    ID
                  </option>
                  <option key="13" value="IL">
                    IL
                  </option>
                  <option key="14" value="IN">
                    IN
                  </option>
                  <option key="15" value="IA">
                    IA
                  </option>
                  <option key="16" value="KS">
                    KS
                  </option>
                  <option key="17" value="KY">
                    KY
                  </option>
                  <option key="18" value="LA">
                    LA
                  </option>
                  <option key="19" value="ME">
                    ME
                  </option>
                  <option key="20" value="MD">
                    MD
                  </option>
                  <option key="21" value="MA">
                    MA
                  </option>
                  <option key="22" value="MI">
                    MI
                  </option>
                  <option key="23" value="MN">
                    MN
                  </option>
                  <option key="24" value="MS">
                    MS
                  </option>
                  <option key="25" value="MO">
                    MO
                  </option>
                  <option key="26" value="MT">
                    MT
                  </option>
                  <option key="27" value="NE">
                    NE
                  </option>
                  <option key="28" value="NV">
                    NV
                  </option>
                  <option key="29" value="NH">
                    NH
                  </option>
                  <option key="30" value="NJ">
                    NJ
                  </option>
                  <option key="31" value="NM">
                    NM
                  </option>
                  <option key="32" value="NY">
                    NY
                  </option>
                  <option key="33" value="NC">
                    NC
                  </option>
                  <option key="34" value="ND">
                    ND
                  </option>
                  <option key="35" value="OH">
                    OH
                  </option>
                  <option key="36" value="OK">
                    OK
                  </option>
                  <option key="37" value="OR">
                    OR
                  </option>
                  <option key="38" value="PA">
                    PA
                  </option>
                  <option key="39" value="RI">
                    RI
                  </option>
                  <option key="40" value="SC">
                    SC
                  </option>
                  <option key="41" value="SD">
                    SD
                  </option>
                  <option key="42" value="TN">
                    TN
                  </option>
                  <option key="43" value="TX">
                    TX
                  </option>
                  <option key="44" value="UT">
                    UT
                  </option>
                  <option key="45" value="VT">
                    VT
                  </option>
                  <option key="46" value="VA">
                    VA
                  </option>
                  <option key="47" value="WA">
                    WA
                  </option>
                  <option key="48" value="WV">
                    WV
                  </option>
                  <option key="49" value="WI">
                    WI
                  </option>
                  <option key="50" value="WY">
                    WY
                  </option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip*</Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>

            <Button
              type="submit"
              style={{
                margin: "5%",
                background: "#d282a6",
                color: "#f7efef",
                border: "0.3rem solid #f7efef",
              }}
              onClick={clickHandler}
            >
              Submit
            </Button>
            <span>* required fields</span>
            {error.isError ? <h3>{error.message}</h3> : ""}
          </Form>
        </div>
        <PageFooter />
      </div>
    );
  }
};

export default User;
