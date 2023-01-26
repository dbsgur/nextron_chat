import styled from "styled-components";
import MessageForm from "./MessageForm";
import MessageHeader from "./MessageHeader";
import MessagesBody from "./MessagesBody";
import { NextPage } from "next";

const MainPanel: NextPage = () => {
  return (
    <MainPanelContainer>
      <MessageHeader />
      <div className="chat-body-wrap">
        <MessagesBody />
      </div>

      <MessageForm />
    </MainPanelContainer>
  );
};

const MainPanelContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .chat-body-wrap {
    width: 98%;
    height: 50%;
    border: 0.2rem solid #eee;
    padding: 0.1rem;
    margin-bottom: 1rem;
    scroll: hidden;
    overflow-y: auto;
    -ms-overflow-style: none;
  }

  .chat-body-wrap::-webkit-scrollbar {
    display: none;
  }
`;

export default MainPanel;
