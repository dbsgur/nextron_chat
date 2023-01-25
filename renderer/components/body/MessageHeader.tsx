import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ImUnlocked } from "react-icons/im";
import { AiOutlineHeart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Accordion from "react-bootstrap/Accordion";

const MessageHeader = () => {
  return (
    <MessageHeaderContainer>
      <Container>
        <Row>
          <Col>
            <h3>
              <ImUnlocked /> chatRoom <AiOutlineHeart />
            </h3>
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <BiUserCircle />
              </InputGroup.Text>
              <Form.Control
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="open-talk">
                  대화창
                </Accordion.Header>
                <Accordion.Body>야야</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>message</Accordion.Header>
                <Accordion.Body>Lasd</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </MessageHeaderContainer>
  );
};

const MessageHeaderContainer = styled.div`
  width: 100%;

  border: 2px solid #ececec;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
`;
export default MessageHeader;
