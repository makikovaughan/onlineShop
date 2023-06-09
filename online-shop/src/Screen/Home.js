import React from "react";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

import NavBar from "../Components/NavBar";
import soap from "../Assets/mainPage2.jpg";
import ProductList from "../Components/ProductList";
import { inventoryState } from "../globalstate";
import cart from "../Assets/shopping-cart.png";
import Popup from "../Components/Popup";
import { orderState, userState } from "../globalstate";
import TotalPrice from "../Components/TotalPrice";
import { createOrder } from "../Services/api";
import PageFooter from "../Components/PageFooter";

const Home = () => {
  const [inventories, setInventories] = useRecoilState(inventoryState);
  const [order, setOrder] = useRecoilState(orderState);
  const [isOpen, setIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user] = useRecoilState(userState);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getInventory();
  });

  useEffect(() => {}, [order]);

  const getInventory = async () => {
    try {
      const response = await fetch("http://localhost:8080/inventory");
      if (response.ok) {
        const jsonResponse = await response.json();
        setInventories(jsonResponse);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setTotalPrice(0);
    let total = 0;
    console.log(order);
    if (!isOpen && order.length >= 1) {
      order.map((item) => {
        total += item.qty * item.price;
      });
      setTotalPrice(total);
    }
  };

  const handleClick = () => {
    const newOrder = [];
    for (let i = 0; i < order.length; i++) {
      newOrder.push({
        qty: order[i].qty,
        item: {
          id: order[i].id,
        },
      });
    }
    createOrder(newOrder, user.username);
    setOrder([]);
    setTotalPrice(0);
    setShow(true);
    togglePopup();
    setTimeout(() => {
      window.location.reload(false);
    }, 6000);
  };

  const handleDelete = (idx, itemId, target) => {
    setOrder(order.filter((item) => item.id !== itemId && idx !== target.id));
    window.location.reload(false);
  };

  return (
    <div>
      <NavBar />
      <div className="jumbotron">
        <Container
          style={{
            width: "100%",
            height: "45rem",
            color: "#d282a6",
            backgroundImage: `linear-gradient(
              rgba(251, 194, 209, 1), rgba(196, 196, 196, 0), rgba(251, 194, 209, 1)
            ),url(${soap})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "grid",
          }}
        >
          <Row style={{ marginTop: "10%" }}>
            <Col
              xs={10}
              md={11}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1
                style={{
                  color: "#fb6f92",
                  fontSize: "5rem",
                  marginBottom: "10%",
                }}
              >
                Organic Soap Shop
              </h1>
            </Col>
            <Col xs={2} md={1}>
              <img
                src={cart}
                alt="cart"
                style={{ width: "60%", height: "3rem" }}
                onClick={togglePopup}
              />
            </Col>
          </Row>
        </Container>
        {isOpen && (
          <Popup
            handleClose={togglePopup}
            content={
              <div>
                <Table striped style={{ marginTop: "5%" }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td style={{ width: "70%" }}>
                          <Container>
                            <Row className="d-flex justify-content-start align-items-center">
                              <Col xs={4}>
                                <img
                                  src={item.picture}
                                  alt="soap"
                                  style={{ width: "90%", height: "100%" }}
                                />
                              </Col>
                              <Col xs={8}>
                                <Row>
                                  <Col>{item.name}</Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <Button
                                      id={idx}
                                      className="mt-3"
                                      style={{
                                        background: "#d282a6",
                                        color: "#f7efef",
                                        border: "0.3rem solid #f7efef",
                                      }}
                                      onClick={(e) =>
                                        handleDelete(idx, item.id, e.target)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Container>
                        </td>
                        <td>${item.price}</td>
                        <td>{item.qty}</td>
                        <td>${item.price * item.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {order.length > 0 ? <TotalPrice totalPrice={totalPrice} /> : ""}
                {order.length > 0 && user.isLoggedIn ? (
                  <Button
                    className="mt-3"
                    style={{
                      background: "#d282a6",
                      color: "#f7efef",
                      border: "0.3rem solid #f7efef",
                    }}
                    onClick={handleClick}
                  >
                    Place an Order
                  </Button>
                ) : !user.isLoggedIn ? (
                  <p style={{ marginTop: "5%" }}>
                    Please log into your user account for your order.
                  </p>
                ) : (
                  ""
                )}
              </div>
            }
          />
        )}
      </div>
      <ToastContainer
        position="middle-center"
        className="p-3"
        style={{
          color: "#f7efef",
        }}
      >
        <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
          <Toast.Header
            style={{
              background: "#f7efef",
              color: "#d282a6",
              border: "0.1rem solid #f7efef",
            }}
          >
            <strong className="me-auto">Orders Have Been Placed</strong>
          </Toast.Header>
          <Toast.Body
            style={{
              background: "#f7efef",
              color: "#d282a6",
              border: "0.1rem solid #f7efef",
            }}
          >
            {user.username} : Order has been placed
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <ProductList inventories={inventories} />
      <PageFooter />
    </div>
  );
};

export default Home;
