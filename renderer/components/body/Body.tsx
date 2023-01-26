import { useEffect, useState } from "react";
import styled from "styled-components";
import MessageForm from "./MessageForm";
import MessageHeader from "./MessageHeader";
import MessagesBody from "./MessagesBody";
import { useSelector } from "react-redux";
import { getDatabase, ref } from "firebase/database";
import { NextPage } from "next";

const MainPanel: NextPage = () => {
  return (
    <MainPanelContainer>
      <MessageHeader />
      {/* 메시지 보여주는 부분 */}
      <div className='chat-body-wrap'>
      <MessagesBody />
      </div>
      
      <MessageForm />
    </MainPanelContainer>
  );
};

const MainPanelContainer = styled.div`
  // padding: 2rem 2rem 0 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .chat-body-wrap {
    width: 98%;
    height: 300px;
    border: 0.2rem solid #eee;
    // border-radius: 5px;
    padding: 0.1rem;
    margin-bottom: 1rem;
    scroll: hidden;
    overflow-y: auto;
    -ms-overflow-style: none;
  }
  .chat-body-wrap::-webkit-scrollbar{
    display:none;
  }
`;

export default MainPanel;
