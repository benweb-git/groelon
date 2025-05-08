import axios from "axios";
const local = process.env.REACT_APP_BACKEND_HOST;
//const production = ''
const api = axios.create({
    baseURL : `${local}/api`
})

export default api