import axios from "../services/axiosSetup";

export const getGenres = () => {
  return axios.get(`/genres`);
};
