import { AnyAction } from "redux";
import * as t from "../types";

const initialChatState = {
  currentChatRoom: "",
  isPrivateChatRoom: false,
};
export default function (state = initialChatState, action: AnyAction) {
  switch (action.type) {
    case t.SET_CURRENT_CHAT_ROOM:
      return {
        ...state,
        currentChatRoom: action.payload,
      };
    case t.SET_PRIVATE_CHAT_ROOM:
      return {
        ...state,
        isPrivateChatRoom: action.payload,
      };

    default:
      return { ...state };
  }
}
