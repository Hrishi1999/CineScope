/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
export class SessionManager {
  static isLoggedIn() {
    return !!localStorage.getItem("userID");
  }

  static logout() {
    window.location.replace("/");
    localStorage.removeItem("userID");
  }

  static login(userID: string) {
    localStorage.setItem("userID", userID);
  }

  static getUserID() {
    return localStorage.getItem("userID");
  }
}
