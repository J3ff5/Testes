import axios from "axios";

const api = axios.create({
    baseURL: "http://servicosflex.rpinfo.com.br:9000/",
})

export default api;