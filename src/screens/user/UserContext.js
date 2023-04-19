import React, { useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, register } from './UserService';


export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const { children } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [state, setstate] = useState(false);
    const [user, setUser] = useState([]);
    let _user;
    const status = [
        'Đăng nhập thành công',//0
        'Tài khoản không tồn tại',//1
        'Tài khoản đã tồn tại',//2
        'Sai mật khẩu',//3
        'Lỗi không xác định'//4
    ]

    const checkUserName = async (username) => {
        try {
            const res = await login(username);
            if (res.length == 0) {
                return status[1];
            } else {
                setUser(res);
                _user = res[0];
                return status[2];
            }
        } catch (error) {
            console.log('checkUserName error: ', error);
        }
        return status[4];
    }
    const checkPassWord = async (username, password) => {
        try {
            const _status = await checkUserName(username);
            if (_status == status[2]) {
                console.log(user[0]);

                if (_user.password == password) {
                    return status[0];
                } else {
                    return status[3];
                }
            } else {
                return status[1];
            }

        } catch (error) {
            console.log('checkPassWord error: ', error);
        }
        return status[4];
    }

    const onLogin = async (username, password) => {

        try {
            const _status = await checkPassWord(username, password);
            if (_status == status[0]) {
                setIsLoggedIn(true);
                return _status;
            } else {
                return _status
            }
        } catch (error) {
            console.log('onLogin error: ', error);
        }
        return status[4];
    }

    const onRegister = async (username, password) => {
        try {
            const res = await checkUserName(username);
            if (res == status[1]) {
                await register(username, password, "https://ionicframework.com/docs/img/demos/avatar.svg");
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.log('UserContext : 33, err: ', error);
        }
        return false;
    }

    const onLoginFB = async (username, image) => {

        try {
            console.log(">>>>>>>>"+username);
            const res = await login(username);
            if (res.length == 0) {
                let res2 = await register(username, '0ahjsfdjhabjhascja', image);
                if (res2.length != 0) {
                    const res = await login(username);
                    setUser(res);
                    setIsLoggedIn(true);
                    return true;
                } else {
                    setIsLoggedIn(false)
                    return false
                }
            } else {
                setUser(res);
                setIsLoggedIn(true);
                return true;
            }
        } catch (error) {
            console.log("loginbFB err:" + error);

        }
        return false;
    }

    const [token, setToken] = useState("");
    return (
        <UserContext.Provider
            value={{
                isLoggedIn, onLogin, onRegister, user, setIsLoggedIn, onLoginFB
            }}
        >
            {children}
        </UserContext.Provider>
    );
};


