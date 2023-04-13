import React from "react";
import { useRecoilState } from "recoil";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

import ProductList from "../Components/ProductList";
import cart from "../Assets/shopping-cart.png";
import Popup from "../Components/Popup";
import { orderState, userState, inventoryState } from "../globalstate";
import TotalPrice from "../Components/TotalPrice";
import { createOrder } from "../Services/api";
import PageFooter from "../Components/PageFooter";

const Products = () => {
  const [inventories, setInventories] = useRecoilState(inventoryState);
  const [order, setOrder] = useRecoilState(orderState);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useRecoilState(userState);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getInventory();
  });

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
    if (!isOpen) {
      order.map((item) => {
        console.log(item.name);
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
    let temp = order.filter((item) => item.id !== itemId && idx !== target.id);
    setOrder(temp);
    window.location.reload(false);
  };

  useEffect(() => {}, [order]);

  return (
    <div>
      <NavBar />
      <Container>
        <Row>
          <Col style={{ marginTop: "20%" }} xs={11}>
            <h1 style={{ color: "#d282a6", marginBottom: "4%" }}>SOAPS</h1>
          </Col>
          <Col style={{ marginTop: "20%" }} xs={1}>
            <img
              src={cart}
              alt="cart"
              style={{ width: "50%", height: "3rem", marginTop: "20%" }}
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

export default Products;
