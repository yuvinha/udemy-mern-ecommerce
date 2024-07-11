import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/",
  proxy: {
    host: "localhost",
    port: 3001,
  },
});

export default axiosInstance;

/*
Reference
https://www.dhiwise.com/post/troubleshooting-guide-react-proxy-not-working-here-why
 */
