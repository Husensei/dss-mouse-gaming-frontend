import axios from "axios";

const BASE_URL = "https://dss-mouse-gaming.up.railway.app";

const Axios = axios.create({
  baseURL: BASE_URL,
});

export default Axios;
