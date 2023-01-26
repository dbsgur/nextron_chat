import styled from "styled-components";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentChatRoom,
  setPrivateChatRoom,
} from "../../redux/actions/chat_action";
import { onChildAdded, ref } from "firebase/database";
import { dataBase } from "../../../models/firebase_auth";

const DirectMessage: NextPage = () => {
  const dispatch = useDispatch();
  const usersRef = ref(dataBase, "user");
  const user = useSelector((state: any) => state.user.currentUser);
  const [users, setUsers] = useState([]);
  const [activeChatRoomId, setActiveChatRoomId] = useState("");

  useEffect(() => {
    if (user) {
      addUsersListeners(user.uid);
    }
  }, [user]);

  const addUsersListeners = (currentUserUid) => {
    let usersArray = [];
    onChildAdded(usersRef, (DataSnapshot) => {
      let user = DataSnapshot.val();
      user["uid"] = DataSnapshot.key;
      user["status"] = "offline";
      usersArray.push(user);
      setUsers(usersArray);
    });
  };

  const renderDirectMessages = (users) =>
    users.length > 0 &&
    users.map((user) => <li key={user.uid}>{user.name}</li>);

  return (
    <DirectMessageContainer>
      <span>USER LIST</span>
      <ul className="direct-list">{renderDirectMessages(users)}</ul>
    </DirectMessageContainer>
  );
};

const DirectMessageContainer = styled.div`
  span {
    font-weight: 800;
    font-size: 20px;
  }
  .direct-list {
    list-style-type: none;
    padding: 0;
  }
`;
export default DirectMessage;
