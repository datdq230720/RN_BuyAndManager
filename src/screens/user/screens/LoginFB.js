import React, { useContext, useState, useEffect } from 'react'
import {
    StyleSheet, Text, View, Image, TextInput, Pressable,
    KeyboardAvoidingView, ScrollView, ToastAndroid
} from 'react-native'
import { UserContext } from '../UserContext';
import { Entypo, AntDesign } from '@expo/vector-icons';
import * as AuthSession from 'expo-auth-session';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const LoginFB = () => {

    const { onLogin } = useContext(UserContext);
    const { user, onLoginFB } = useContext(UserContext);

    const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: "3434239696820158",
    });
    console.log("req: " + request + " res: " + response);
    if (request) {
        console.log(
            "You need to add this url to your authorized redirect urls on your Facebook app: " +
            request.redirectUri
        );
    }
    const loginApiFB = async () => {
        const result = await promptAsync();
        if (result.type !== "success") {
            alert("Uh oh, something went wrong");
            return;
        }
    }
    useEffect(() => {
        if (response && response.type === "success" && response.authentication) {
            (async () => {
                const userInfoResponse = await fetch(
                    `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
                );
                const userInfo = await userInfoResponse.json();
                await onLoginFB(userInfo.id, userInfo.picture.data.url)
            })();
        }
    }, [response]);
    return (
        <View style={styles.iconLogin}>
            <Pressable
                onPress={loginApiFB}
                style={styles.buttonLogin}>
                <Text style={{ color: "black" }}>Đăng nhập bằng Facebook</Text>
            </Pressable>
            <Entypo style={styles.icon} name="facebook" size={24} color="black" />
        </View>
    )
}

export default LoginFB

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