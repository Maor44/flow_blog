import axios, {Axios} from "axios";

const api = axios.create({
    baseURL: "http://rest.flowsec.xyz"
});

export {api};