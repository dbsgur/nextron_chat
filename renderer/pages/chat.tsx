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
  width: 200px;
  height: 100vh;
  width: 25%;
`;

const BodyContainer = styled(Body)`
  width: 75%;
  height: 100vh;
`;

const UserListContainer = styled.div`
  display: flex;
`;
export default userlist;
