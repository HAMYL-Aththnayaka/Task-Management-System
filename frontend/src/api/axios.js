import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000/api",
})

//bearer tokem not passing fix (header issue)
api.interceptors.request.use(
    (config)=>{

        const token = localStorage.getItem("token");

        console.log("TOKEN:", token);

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error)=>{
        return Promise.reject(error);
    }
);


export default api;

//Email:
//admin@test.com

//Password:
//123456