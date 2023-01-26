import {
  getDatabase,
  ref,
  push,
  child,
  update,
  off,
  onChildAdded,
  DataSnapshot,
} from "firebase/database";
import { stringify } from "querystring";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MyMessage from "./MyMessage";
import YourMessage from "./YourMessage";
import { uid } from "react-uid";

const MessagesBody = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.currentUser);
  const chatRoomId = useSelector(
    (state: any) => state.chatRoom.currentChatRoom.id
  );

  const [msgRender, setMsgRender] = useState([]);

  const messagesRef = ref(getDatabase(), "messages");

  useEffect(() => {
    getMessages();

    return () => {
      off(messagesRef);
    };
  }, [chatRoomId]);

  const getMessages = () => {
    let messagesDB = [];
    let flag = false;
    onChildAdded(messagesRef, (DataSnapshot) => {
      const data = DataSnapshot.key;

      if (data === chatRoomId) {
        messagesDB.push(DataSnapshot.val());
        let tmp = [];
        setMsgRender([]);
        messagesDB?.map((message) => {
          for (let key in message) {
            tmp.push([
              message[key].text,
              message[key].user.id,
              message[key].user.name,
            ]);
          }
        });
        setMsgRender(tmp);
        flag = true;
      }
    });
    if (!flag) setMsgRender([]);
  };

  return (
    <>
      {msgRender.map((msg, idx) =>
        user?.uid === msg[1] ? (
          <MyMessage key={uid(idx)} text={msg[0]} id={msg[1]} name={msg[2]} />
        ) : (
          <YourMessage key={uid(idx)} text={msg[0]} id={msg[1]} name={msg[2]} />
        )
      )}
    </>
  );
};

export default MessagesBody;
