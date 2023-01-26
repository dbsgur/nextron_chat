import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { child, ref, push, set } from "firebase/database";
import { dataBase } from "../../../models/firebase_auth";

const MessageForm = () => {
  const chatRoom = useSelector((state: any) => state.chatRoom.currentChatRoom);
  const user = useSelector((state: any) => state.user.currentUser);
  const messageRef = ref(dataBase, "messages");
  const typingRef = ref(dataBase, "typing");
  const [text, setText] = useState("");
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const createMessage = (fileUrl = null) => {
    const message = {
      timestamp: new Date(),
      user: {
        id: user.uid,
        name: user.displayName,
        image: user.photoURL,
      },
    };
    if (fileUrl !== null) {
      message["image"] = fileUrl;
    } else {
      message["text"] = text;
    }
    return message;
  };

  const handleMessage = async (e) => {
    if (!text) {
      setError((pre) => pre.concat("Type text First"));
      return;
    }
    setLoading(true);

    try {
      await set(push(child(messageRef, chatRoom.id)), createMessage());
      setLoading(false);
      setText("");
      setError([]);
    } catch (error) {
      e.preventDefault();
      setLoading(false);
      setTimeout(() => {
        setError([]);
      }, 5000);
    }
  };
  return (
    <MessageFormContainer>
      <Container>
        <div>
          {error.map((errorMsg) => (
            <p className="error" key={errorMsg}>
              {errorMsg}
            </p>
          ))}
        </div>

        <Row>
          <Col md={10}>
            <Form onSubmit={handleMessage}>
              <Form.Control
                value={text}
                onChange={handleChange}
                type="text"
                className="text-form"
              />
            </Form>
          </Col>
          <Col md={2}>
            <button onClick={handleMessage}>send</button>
          </Col>
        </Row>
      </Container>
    </MessageFormContainer>
  );
};

const MessageFormContainer = styled.div`
  width: 90%;

  button {
    width: 100%;
    color: white;
    background-color: #566270;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 8px;
    margin-bottom: 10px;
  }

  button:hover {
    background: #111111;
  }
  .error {
    color: red;
  }
`;
export default MessageForm;
