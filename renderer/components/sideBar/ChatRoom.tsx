import { useState, useEffect } from "react";
import styled from "styled-components";
// import { HiOutlineEmojiHappy } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentChatRoom,
  setPrivateChatRoom,
} from "../../redux/actions/chat_action";
import {
  getDatabase,
  ref,
  push,
  child,
  update,
  off,
  onChildAdded,
} from "firebase/database";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.currentUser);
  const chatRoomId = useSelector(
    (state: any) => state.chatRoom.currentChatRoom.id
  );

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [chatRooms, setChatRooms] = useState([]);
  const [activeChatRoomId, setActiveChatRoomId] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);
  const chatRoomsRef = ref(getDatabase(), "chatRooms");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(name, description)) {
      addChatRoom();
    }
  };
  const isFormValid = (name, description) => name && description;
  // 방추가
  const addChatRoom = async () => {
    const key = push(chatRoomsRef).key;
    const newChatRoom = {
      id: key,
      name,
      description,
      createdBy: {
        name: user.displayName,
        // image: user.photoURL,
      },
    };
    try {
      await update(child(chatRoomsRef, key), newChatRoom);
      setName("");
      setDescription("");
      setShow(false);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    addChatRoomsListeners();
    console.log("activeChatRoomId ", activeChatRoomId);

    return () => {
      off(chatRoomsRef);
    };
  }, [chatRoomId]);

  // 방읽기
  const addChatRoomsListeners = () => {
    let chatRoomsArray = [];
    onChildAdded(chatRoomsRef, (DataSnapshot) => {
      chatRoomsArray.push(DataSnapshot.val());
      setChatRooms(chatRoomsArray);

      // , () => setFirstChatRoom();
    });
    setFirstChatRoom();
  };

  const setFirstChatRoom = () => {
    const firstChatRoom = chatRooms[0];
    if (firstLoad && chatRooms.length > 0) {
      dispatch(setCurrentChatRoom(firstChatRoom));
      setActiveChatRoomId(firstChatRoom.id);
    }
    setFirstLoad(false);
  };

  const renderChatRooms = (chatRooms) =>
    chatRooms.length > 0 &&
    chatRooms.map((room) => (
      <li
        key={room.id}
        onClick={() => changeChatRoom(room)}
        style={{
          backgroundColor: room.id === activeChatRoomId && "#ffffff45",
        }}
        className="current-room"
      >
        # {room.name}
      </li>
    ));

  const changeChatRoom = (room) => {
    dispatch(setCurrentChatRoom(room));
    dispatch(setPrivateChatRoom(false));
    // console.log(`room : ${room}`);
    // console.log(`room ID: ${room.id}`);
    // console.log(`user :${JSON.stringify(user)}`);
    // console.log(`chatRoomId :${JSON.stringify(chatRoomId)}`);

    setActiveChatRoomId(room.id);
  };
  return (
    <ChatRoomContainer>
      <div className="chatroom-wrap">
        {/* <div>
          <HiOutlineEmojiHappy /> */}
        채팅방 목록{activeChatRoomId}
        {/* </div> */}
        <div onClick={handleShow} className="pluse-button">
          <AiOutlinePlus />
        </div>
      </div>
      <ul className="rooms-list">{renderChatRooms(chatRooms)}</ul>

      {/* 방 생성 모달 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>create chatRoom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>방 제목</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="방 제목을 입력해주세요"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>방 설명</Form.Label>
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="방 설명을 적어주세요"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            create
          </Button>
        </Modal.Footer>
      </Modal>
    </ChatRoomContainer>
  );
};

const ChatRoomContainer = styled.div`
  .chatroom-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .pluse-button {
      cursor: pointer;
      font-size: 26px;
    }
  }
  .rooms-list {
    list-style-type: none;
    margin-top: 5px;
    cursor: pointer;
    .current-room {
      border-radius: 5px;
      padding: 5px;
      font-size: 12px;
    }
  }
`;

export default ChatRoom;
