import React, { useContext, useState, useEffect } from 'react'
import {
    StyleSheet, Text, View, Image, TextInput, Pressable,
    KeyboardAvoidingView, ScrollView, ToastAndroid
} from 'react-native'
import { UserContext } from '../UserContext';
import { Entypo, AntDesign } from '@expo/vector-icons';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
WebBrowser.maybeCompleteAuthSession();
const LoginGG = () => {
    const [token, setToken] = useState("");
    const { onLogin } = useContext(UserContext);
    const { user, onLoginFB } = useContext(UserContext);

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "295955904584-55kkus18ahaq434q2tpk1o7prvv276p2.apps.googleusercontent.com",
        iosClientId: "295955904584-tc8bderlv92v94g8km3t55u2p45r5mov.apps.googleusercontent.com",
        clientId: "295955904584-2371uvn8e1lskciekafno52t50sb5dc4.apps.googleusercontent.com"
    });

    useEffect(() => {
        if (response?.type === "success") {
            setToken(response.authentication.accessToken);
            getUserInfo();
        }
    }, [response, token]);

    const getUserInfo = async () => {
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const user = await response.json();
            console.log("user GG: " + JSON.stringify(user));
            await onLoginFB(user.id, user.picture)
        } catch (error) {
            // Add your own error handler here
        }
    };

    return (
        <View style={styles.iconLogin}>
            <Pressable
                disabled={!request}
                onPress={() => {
                    promptAsync();
                }}
                style={styles.buttonLogin}>
                <Text style={{ color: "black" }}>Đăng nhập bằng Google</Text>
            </Pressable>
            <AntDesign style={styles.icon} name="google" size={24} color="black" />
        </View>
    )
}

export default LoginGG

const styles = StyleSheet.create({
    iconLogin: {
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        right: 20,
        marginVertical: 30
    },
    buttonLogin: {
        width: '100%',
        height: 50,
        borderRadius: 45,
        backgroundColor: 'white',
        borderWidth: 0.5,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
})