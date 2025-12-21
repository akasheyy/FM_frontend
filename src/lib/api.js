import axios from "axios";

const API = axios.create({
  baseURL: "https://fm-backend-099e.onrender.com/api",
});

export default API;
