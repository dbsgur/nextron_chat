import React from "react";
import Card from "react-bootstrap/Card";

function MyMessage(props) {
  return (
    <Card
      bg="light"
      text="dark"
      style={{ width: "40%", maxWidth: "700px", marginLeft: "auto" }}
      className="mb-2"
    >
      <Card.Header>{props.name}</Card.Header>
      <Card.Body>
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MyMessage;
