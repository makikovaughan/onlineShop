import React from "react";
import { useRecoilState } from "recoil";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";

import { userState, errorState } from "../globalstate";
import NavBar from "../Components/NavBar";
import { getLogin } from "../Services/api";

const Login = () => {
  const [user, setUser] = useRecoilState(userState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useRecoilState(errorState);

  const changeUser = async (event) => {
    setUsername(event.target.value);
  };

  useEffect(() => {}, [username]);

  useEffect(() => {}, [password]);

  const handleClick = async () => {
    if (username === "" || password === "") {
      setError({ isError: true, message: "Please fill out all fields" });
      return;
    }
    const credentials = {
      username: username,
      password: password,
    };
    console.log(credentials);
    const temp = await getLogin(credentials);
    if (temp.message != null) {
      setError({
        isError: true,
        message: temp.message,
      });
    } else {
      setUser({
        id: temp.id,
        isLoggedIn: true,
        isAdmin: temp.isAdmin,
        username: username,
        password: password,
        email: temp.profile.email,
        firstName: temp.profile.firstName,
        lastName: temp.profile.lastName,
        phone: temp.profile.phone,
        street: temp.profile.street,
        city: temp.profile.city,
        state: temp.profile.state,
        zipcode: temp.profile.zipcode,
      });
      setError({ isError: false, message: "" });
    }
  };
  if (user.isLoggedIn && user.isAdmin) {
    return <Navigate replace to="/Inventory" />;
  } else if (user.isLoggedIn) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div>
        <NavBar />
        <div
          style={{
            width: "35%",
            height: "100%",
            justifyContent: "center",
            margin: "5% 5% 10% 30%",
            color: "#d282a6",
          }}
        >
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                  changeUser(e);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              style={{
                background: "#d282a6",
                color: "#f7efef",
                border: "0.3rem solid #f7efef",
              }}
              // type="submit"
              onClick={() => handleClick()}
            >
              Login
            </Button>
            {error.isError ? (
              <p style={{ color: "red" }}>{error.message}</p>
            ) : null}
          </Form>
        </div>
        <footer>
          <p style={{ color: "#d282a6" }}>&copy;2023 Makiko Vaughan</p>
        </footer>
      </div>
    );
  }
};

export default Login;
