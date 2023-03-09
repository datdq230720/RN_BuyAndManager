import constact from "../../utils/constants";
import axios from "axios";

export const login = async (username) => {

    const res = await axios.get(constact.HOSTING + 'users?username='+username);
    
    return res.data;
}
export const register = async (username, password) => {
    const data = {
        username: username,
        password : password,
        manage: false,
    }
    const res = await axios.post(constact.HOSTING + 'users', data);
    return res.data;
}