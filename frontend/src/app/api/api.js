import axios from "axios";

const api = axios.create({
    baseURL: "https://dog-behaviour-ai.onrender.com",
});

export default api;