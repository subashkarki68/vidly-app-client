import axios, { setJwt } from "./axiosSetup";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

const authApi = {
  login: async (email, password) => {
    const { data: jwt } = await axios.post(`/auth`, {
      email,
      password,
    });
    localStorage.setItem(tokenKey, jwt);
  },
  loginWithJwt: (jwt) => {
    localStorage.setItem(tokenKey, jwt);
  },
  logout: () => {
    localStorage.removeItem(tokenKey);
  },
  getCurrentUser: () => {
    try {
      return jwtDecode(localStorage.getItem(tokenKey));
    } catch (error) {
      return null;
    }
  },
  getJwt: () => {
    return localStorage.getItem(tokenKey);
  },
};

//set JWT token
setJwt(authApi.getJwt());

export default authApi;
