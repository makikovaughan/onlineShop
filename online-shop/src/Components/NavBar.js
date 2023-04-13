import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../Assets/OrganicSoapShop.png";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { userState } from "../globalstate";

const StyledImg = styled.img`
  width: 8%;
  height: 6%;
  margin-right: 5%;
`;

const NavBar = () => {
  const [user, setUser] = useRecoilState(userState);

  return (
    <Navbar
      expand="lg"
      style={{ background: "#F7EFEF", position: "fixed", zIndex: "100" }}
    >
      <Container fluid style={{ marginLeft: "1%" }}>
        <StyledImg src={logo} alt="Logo" />
        <Navbar.Brand href="/" style={{ color: "#d282a6" }}>
          Organic Soap Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/" style={{ color: "#d282a6" }}>
              Home
            </Nav.Link>
            <Nav.Link href="/Products" style={{ color: "#d282a6" }}>
              Products
            </Nav.Link>
            {user.isAdmin ? (
              <Nav.Link href="/Inventory" style={{ color: "#d282a6" }}>
                Inventory List
              </Nav.Link>
            ) : (
              ""
            )}
          </Nav>
          <Nav className="justify-content-end flex-grow-1 pe-5 me-5">
            {!user.isLoggedIn ? (
              <Nav.Link href="/Login" style={{ color: "#d282a6" }}>
                Login
              </Nav.Link>
            ) : (
              <p className="mt-5 me-3 pt-4" style={{ color: "#d282a6" }}>
                Username: {user.username}
              </p>
            )}
            {user.isLoggedIn ? (
              <Nav.Link
                className="m-5 pt-4"
                href="/Login"
                onClick={() => {
                  setUser({});
                  localStorage.clear();
                }}
                style={{ color: "#d282a6" }}
              >
                Logout
              </Nav.Link>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
