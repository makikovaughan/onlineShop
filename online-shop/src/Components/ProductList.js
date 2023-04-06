import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { orderState } from "../globalstate";

const initialError = {
  isError: false,
  message: "",
};

function ProductList({ inventories }) {
  const [customerOrder, setCustomerOrder] = useState([]);
  const [order, setOrder] = useRecoilState(orderState);
  const [error, setError] = useState(initialError);

  useEffect(() => {}, [order]);
  useEffect(() => {}, [customerOrder]);

  useEffect(() => {
    setCustomerOrder(order);
    console.log(order);
    console.log(customerOrder);
  }, []);

  const handleClick = (e) => {
    if (e.target.qty === 0) {
      setError({ isError: true, message: "Please select quantity" });
      console.log(error);
      return;
    }
    console.log(e.target.id);
    setOrder(customerOrder);
    console.log(order);
    document.getElementsByTagName("option").value = "QTY";
    setError(false);
    window.location.reload(false);
  };

  return (
    <Container>
      <Row>
        {inventories.map((inventory, idx) => (
          <Col
            className="mb-5 justify-content-around"
            key={inventory.name + idx}
          >
            <Card
              key={inventory.name + idx}
              id={inventory.id}
              className="justify-content-md-center"
              style={{ width: "18rem" }}
            >
              <Card.Img variant="top" src={inventory.picture} />
              <Card.Body
                key={inventory.name + idx}
                style={{
                  color: "#d282a6",
                }}
              >
                <Card.Title>{inventory.name}</Card.Title>
                <Card.Text>
                  Price: ${Number.parseFloat(inventory.price).toFixed(2)}
                </Card.Text>
                <Container>
                  <Row>
                    <Col>
                      <Form.Select
                        style={{
                          color: "#d282a6",
                          background: "#f7efef",
                          border: "0.3rem solid #f7efef",
                        }}
                        defaultValue={"QTY"}
                        onChange={({ target }) => {
                          setCustomerOrder([
                            ...customerOrder,
                            {
                              id: inventory.id,
                              name: inventory.name,
                              picture: inventory.picture,
                              qty: target.value,
                              price: inventory.price,
                            },
                          ]);
                        }}
                      >
                        <option value="0">Qty</option>
                        <option key="1" value="1">
                          1
                        </option>
                        <option key="2" value="2">
                          2
                        </option>
                        <option key="3" value="3">
                          3
                        </option>
                        <option key="4" value="4">
                          4
                        </option>
                        <option key="5" value="5">
                          5
                        </option>
                        <option key="6" value="6">
                          6
                        </option>
                        <option key="7" value="7">
                          7
                        </option>
                        <option key="8" value="8">
                          8
                        </option>
                        <option key="9" value="9">
                          9
                        </option>
                        <option key="10" value="10">
                          10
                        </option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        key={inventory.name + idx}
                        id={inventory.id}
                        className="mt-3"
                        style={{
                          background: "#f7efef",
                          color: "#d282a6",
                          border: "0.3rem solid #f7efef",
                        }}
                        onClick={handleClick}
                      >
                        ADD TO BAG
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
