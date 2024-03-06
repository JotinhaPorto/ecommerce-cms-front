import axios from "axios";

export const req = axios.create({
    baseURL: "https://ecommerce-backend-api-planetscale.onrender.com",
    headers: {
        Accept: 'application/json'
    },

})