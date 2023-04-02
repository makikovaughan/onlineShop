import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { inventoryState, errorState } from "../globalstate";
import { updateInventory } from "../Services/api";

const initialInventory = {
  id: 0,
  name: "",
  qty: 0,
  price: 0.0,
  picture: "",
};

const InventoryList = () => {
  const [inventories, setInventories] = useRecoilState(inventoryState);
  const [error, setError] = useRecoilState(errorState);

  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  const [inventory, setInventory] = useState(initialInventory);

  useEffect(() => {}, [index]);

  useEffect(() => {}, [inventory]);

  const handleClose = () => setShow(false);
  const handleShow = (idx) => {
    setIndex(idx);
    setInventory(inventories[idx]);
    setShow(true);
  };

  const handleClick = async (temp) => {
    console.log(temp);
    console.log(inventory);

    const newInventories = await updateInventory(inventory);
    if (newInventories.message != null) {
      setError({
        isError: true,
        message: newInventories.message,
      });
    } else {
      setInventories(newInventories);
    }
    setError({ isError: false, message: "" });
    handleClose();
    window.location.reload(false);
  };

  return (
    <div style={{ color: "#d282a6" }}>
      <h1>Inventory List</h1>
      <Table striped style={{ marginTop: "5%" }}>
        <thead>
          <tr>
            <th style={{ color: "#d282a6" }}>ID</th>
            <th style={{ color: "#d282a6" }}>Item</th>
            <th style={{ color: "#d282a6" }}>Price</th>
            <th style={{ color: "#d282a6" }}>Qty</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((item, idx) => (
            <tr key={item.id}>
              <td style={{ color: "#d282a6" }}>{item.id}</td>
              <td style={{ width: "40%", color: "#d282a6" }}>
                <img
                  src={item.picture}
                  alt="soap"
                  style={{ width: "30%", height: "30%" }}
                />
                {item.name}
              </td>
              <td style={{ color: "#d282a6" }}>${item.price}</td>
              <td style={{ color: "#d282a6" }}>{item.qty}</td>
              <td>
                <Button
                  className="mt-3"
                  key={item.id}
                  id={"button" + item.id}
                  style={{
                    background: "#d282a6",
                    color: "#f7efef",
                    border: "0.3rem solid #f7efef",
                  }}
                  onClick={() => handleShow(idx)}
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        show={show}
        onHide={handleClose}
        style={{
          color: "#d282a6",
          backgroundColor: "#EAE3E3",
          opacity: "0.5 !important",
        }}
        backdrop="static"
      >
        <Modal.Header closeButton style={{ backgroundColor: "#f7efef" }}>
          <Modal.Title>Inventory Update</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f7efef" }}>
          <Form>
            <Form.Group className="mb-3" controlId="item-name">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={inventories[index].name}
                onChange={(e) =>
                  setInventory({ ...inventory, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="item-picture">
              <Form.Label>Item Picture Url</Form.Label>
              <br />
              <img
                src={inventories[index].picture}
                alt="soap"
                style={{ width: "30%", height: "30%", margin: "5%" }}
              />
              <Form.Control
                type="text"
                placeholder={inventories[index].picture}
                onChange={(e) =>
                  setInventory({ ...inventory, picture: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="item-price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder={inventories[index].price}
                onChange={(e) =>
                  setInventory({ ...inventory, price: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="item-qty">
              <Form.Label>Qty</Form.Label>
              <Form.Control
                type="number"
                placeholder={inventories[index].qty}
                onChange={(e) => {
                  setInventory({ ...inventory, qty: e.target.value });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f7efef" }}>
          <Button
            className="mt-3"
            style={{
              background: "#d282a6",
              color: "#f7efef",
              border: "0.3rem solid #f7efef",
            }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            className="mt-3"
            style={{
              background: "#d282a6",
              color: "#f7efef",
              border: "0.3rem solid #f7efef",
            }}
            onClick={() => handleClick(inventories[index])}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InventoryList;
