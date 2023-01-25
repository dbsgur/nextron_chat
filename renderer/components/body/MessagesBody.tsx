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
    onChildAdded(messagesRef, (DataSnapshot) => {
      const data = DataSnapshot.key;
      if (data === chatRoomId) {
        messagesDB.push(DataSnapshot.val());
        setMsgRender([]);
        let tmp = [];
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
      }
    });
  };

  return (
    <>
      {msgRender.map((msg, idx) =>
        user?.uid === msg[1] ? (
          <MyMessage key={idx} text={msg[0]} id={msg[1]} name={msg[2]} />
        ) : (
          <YourMessage key={idx} text={msg[0]} id={msg[1]} name={msg[2]} />
        )
      )}
    </>
  );
};

export default MessagesBody;
