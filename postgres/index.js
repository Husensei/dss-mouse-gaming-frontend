import axios from "axios";

// const BASE_URL = "https://backend-dss-mouse.up.railway.app";
const BASE_URL = "http://localhost:8080";

const Axios = axios.create({
  baseURL: BASE_URL,
});

export default Axios;
