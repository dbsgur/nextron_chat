import { useRef } from "react";
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import { fbAuth } from "../../../models/firebase_auth";
import { signOut } from "firebase/auth";

const MyAccount = () => {
  const user = useSelector((state: any) => state.user.currentUser);
  const handleLogout = () => {
    signOut(fbAuth);
  };

  return (
    <MyAccountContainer>
      <h3>마음의 소리</h3>
      <div className="user-wrap">
        <Dropdown>
          <Dropdown.Toggle className="dropdown" id="dropdown-basic">
            {user?.displayName}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </MyAccountContainer>
  );
};

const MyAccountContainer = styled.div`
  .user-wrap {
    display: flex;
    margin-bottom: 1rem;
  }
  .dropdown {
    background-color: transparent;
    border: none;
  }
`;
export default MyAccount;
