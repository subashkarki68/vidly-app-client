import authApi from "../services/authService";

const Logout = () => {
  authApi.logout();
  window.location = "/";
  return null;
};

export default Logout;
