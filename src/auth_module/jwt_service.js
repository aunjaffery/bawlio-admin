import axios from "axios";
import jwtDecode from "jwt-decode";
import Utils from "./event_emitter";
import Domain from "../lib/Config";

class jwtService extends Utils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response &&
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    let access_token = this.getAccessToken();

    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  signInAdmin = (username, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${Domain}/api/login`, { username, password })
        .then((response) => {
          console.log(response);
          if (response.data.result.user) {
            this.setSession(response.data.result.access_token);
            resolve(response.data.result.user);
          } else {
            return reject(response);
          }
        })
        .catch((error) => {
          return error.response
            ? reject(error.response.data.msg)
            : reject("Network Error");
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Domain}/api/validation`)
        .then((response) => {
          if (response.data.result.user) {
            this.setSession(response.data.result.access_token);
            resolve(response.data.result.user);
          } else {
            reject(response.data.result.error);
          }
        })
        .catch(() => reject("Validation Failed"));
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    } else {
      localStorage.removeItem("jwt_access_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    } else {
      return true;
    }
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };
}

const instance = new jwtService();

export default instance;
