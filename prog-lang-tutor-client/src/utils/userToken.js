import * as CONSTS from "./consts";

export function getUserToken() {
  return localStorage.getItem(CONSTS.ACCESS_TOKEN);
}
export function setUserToken(value) {
  return localStorage.setItem(CONSTS.ACCESS_TOKEN, JSON.stringify(value));
}
export function removeUserToken() {
  return localStorage.removeItem(CONSTS.ACCESS_TOKEN);
}
const userHelpers = {
  getUserToken: getUserToken,
  setUserToken,
  removeUserToken,
};
export default userHelpers;
