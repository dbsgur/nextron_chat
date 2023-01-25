import * as t from "../types";

export function setUser(user) {
  return {
    type: t.SET_USER,
    payload: user,
  };
}
export function clearUser() {
  return {
    type: t.CLEAR_USER,
  };
}
