import * as t from "../types";

export function setCurrentChatRoom(chatRoom) {
  return {
    type: t.SET_CURRENT_CHAT_ROOM,
    payload: chatRoom,
  };
}
export function setPrivateChatRoom(isPrivate) {
  return {
    type: t.SET_PRIVATE_CHAT_ROOM,
    payload: isPrivate,
  };
}
