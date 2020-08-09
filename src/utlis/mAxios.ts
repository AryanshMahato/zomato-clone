import axios from "axios";

const baseURL =
  process.env.STAGE === "LOCAL"
    ? "http://localhost:8000"
    : "https://zomato-clone-aryansh.herokuapp.com/";

const mAxios = axios.create({
  baseURL,
});

export default mAxios;
