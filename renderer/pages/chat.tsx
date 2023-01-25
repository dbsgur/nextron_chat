import { NextPage } from "next";
import styled from "styled-components";
import SideBar from "../components/sideBar/SideBar";
import Body from "../components/body/Body";

const userlist: NextPage = () => {
  return (
    <UserListContainer>
      <SideBarContainer />
      <BodyContainer />
    </UserListContainer>
  );
};

const SideBarContainer = styled(SideBar)`
  width: 300px;
  height: 100vh;
`;

const BodyContainer = styled(Body)`
  width: 100%;
  height: 100vh;
`;

const UserListContainer = styled.div`
  display: flex;
`;
export default userlist;
