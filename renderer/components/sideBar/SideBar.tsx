import styled from "styled-components";
import ChatRoom from "./ChatRoom";
import DirectMessage from "./DirectMessage";
import UserPanel from "./MyAccount";

const SideBar = () => {
  return (
    <SidePanelContainer>
      <UserPanel />
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
  min-width: 150px;
`;
export default SideBar;
