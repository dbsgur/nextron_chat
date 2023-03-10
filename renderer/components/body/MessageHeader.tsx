import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";

const MessageHeader = () => {
  const chatRoomName = useSelector(
    (state: any) => state.chatRoom.currentChatRoom.name
  );

  return (
    <MessageHeaderContainer>
      <Container>
        <Row>
          <Col>
            <h4>현재 채팅방</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <span>{chatRoomName}</span>
          </Col>
        </Row>
      </Container>
    </MessageHeaderContainer>
  );
};

const MessageHeaderContainer = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  h4 {
    font-weight: 600;
  }
  span {
    font-weight: 900;
    font-size: 30px;
  }
`;
export default MessageHeader;
