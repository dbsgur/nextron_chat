import { HiOutlineEmojiHappy } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
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
      if (currentUserUid !== DataSnapshot.key) {
        let user = DataSnapshot.val();
        user["uid"] = DataSnapshot.key;
        user["status"] = "offline";
        usersArray.push(user);
        setUsers(usersArray);
      }
    });
  };

  const renderDirectMessages = (users) =>
    users.length > 0 &&
    users.map((user) => (
      <li
        key={user.uid}
        onClick={() => {
          changeChat(user);
        }}
        style={{
          backgroundColor: user.id === activeChatRoomId && "#ffffff45",
        }}
        className="direct-room"
      >
        # {user.name}
      </li>
    ));

  const changeChat = (user) => {
    const chatRoomId = getChatRoomId(user.uid);
    const chatRoomData = {
      id: chatRoomId,
      name: user.name,
    };
    dispatch(setCurrentChatRoom(chatRoomData));
    dispatch(setPrivateChatRoom(false));
    setActiveChatRoomId(user.uid);
  };

  const getChatRoomId = (userId) => {
    const currentId = user.id;
    return userId > currentId
      ? `${userId}/${currentId}`
      : `${currentId}/${userId}`;
  };
  return (
    <DirectMessageContainer>
      <div>
        <HiOutlineEmojiHappy />
        DirectMessage
      </div>
      <ul className="direct-list">{renderDirectMessages(users)}</ul>
    </DirectMessageContainer>
  );
};

const DirectMessageContainer = styled.div`
  .direct-list {
    list-style-type: none;
    padding: 0;
  }
  .direct-room {
    cursor: pointer;
  }
`;
export default DirectMessage;
