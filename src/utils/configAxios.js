import axios from "axios";

const configedAxios = axios.create({
  // .. where we make our configurations
  baseURL: "https://test-server1709.herokuapp.com",
});

export default configedAxios;