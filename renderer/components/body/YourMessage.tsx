import React from "react";
import Card from "react-bootstrap/Card";

function YourMessage(props) {
  return (
    <Card
      bg="secondary"
      text="white"
      style={{ width: "40%", maxWidth: "700px" }}
      className="mb-2"
    >
      <Card.Header>{props.name}</Card.Header>
      <Card.Body>
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default YourMessage;
