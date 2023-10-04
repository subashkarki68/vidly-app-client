import axios from "../services/axiosSetup";

export const registerUser = (user) => {
  return axios.post(`/users`, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
};
