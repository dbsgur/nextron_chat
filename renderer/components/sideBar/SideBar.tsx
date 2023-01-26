import styled from "styled-components";
import ChatRoom from "./ChatRoom";
import DirectMessage from "./DirectMessage";
import MyAccount from "./MyAccount";

const SideBar = () => {
  return (
    <SidePanelContainer>
      <MyAccount />
      <ChatRoom />
      <DirectMessage />
    </SidePanelContainer>
  );
};

const SidePanelContainer = styled.div`
  background-color: #566270;
  padding: 2rem;
  height: 100vh;
  color: white;
  font-weight: 600;
  min-width: 185px;
`;
export default SideBar;
