import axios from "axios";

export const req = axios.create({
    baseURL: process.env.API_KEY,
    headers: {
        Accept: 'application/json'
    },

})