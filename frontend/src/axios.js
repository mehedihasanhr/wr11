import axios from 'axios';



export default axios.create({
    baseURL: "https://wr11.vercel.app",
    // baseURL: "http://localhost:5000",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    withCredentials: true,
});