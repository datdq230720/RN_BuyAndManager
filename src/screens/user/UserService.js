import constact from "../../utils/constants";
import axios from "axios";
import * as AuthSession from 'expo-auth-session';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';


export const login = async (username) => {

    const res = await axios.get(constact.HOSTING + 'users?username=' + username);

    return res.data;
}
export const register = async (username, password, image) => {
    const data = {
        username: username,
        password: password,
        manage: false,
        image: image,
    }
    const res = await axios.post(constact.HOSTING + 'users', data);
    return res.data;
}

