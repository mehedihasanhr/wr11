import * as React from 'react';
import axios from '../axios';


export const useAuth = () => {
    const [auth, setAuth] = React.useState("");


    // login 
    const login = async () => {
        axios.post("/user/login", {}).then(res => {
            setAuth(res.data);
            // seve session
            console.log(res)
        })
    }

    // logout
    const logout = async () => {
        axios.get("/user/logout").then(res => {
            setAuth("");
            console.log(res.data);
        })
    }

    return { auth, login, logout };

}