import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";

const TotalPrice = ({ totalPrice }) => {
  return (
    <div>
      <ListGroup>
        <ListGroup.Item style={{ background: "#ffe5ec" }}>
          Merchandise Subtotal: ${Number.parseFloat(totalPrice).toFixed(2)}
        </ListGroup.Item>
        <ListGroup.Item style={{ background: "#ffe5ec" }}>
          Estimated Shipping & Handling - Standard: $5.00
        </ListGroup.Item>
        <ListGroup.Item style={{ background: "#ffe5ec" }}>
          Sales Tax: ${(totalPrice * 0.1).toFixed(2)}
        </ListGroup.Item>
        <ListGroup.Item style={{ background: "#ffe5ec" }}>
          Order Total: ${(totalPrice + totalPrice * 0.1 + 5).toFixed(2)}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default TotalPrice;
