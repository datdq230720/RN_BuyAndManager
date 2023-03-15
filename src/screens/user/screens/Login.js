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


export const Login = (props) => {
    const { navigation } = props;
    const { onLogin } = useContext(UserContext);
    const { user, onLoginFB } = useContext(UserContext);

    const [email, setEmail] = useState('admin');
    const [password, setPassword] = useState('123456');
    const [entry, setEntry] = useState(true);
    const [nameEntry, setNameEntry] = useState('eye');



    const onLoginPress = async () => {
        if (email == '' || password == '') {
            ToastAndroid.show('Không được để trống', ToastAndroid.TOP);
        } else {
            const _status = await onLogin(email, password);
            ToastAndroid.show('' + _status, ToastAndroid.TOP);
        }

    }
    const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: "3434239696820158",
    });
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
                console.log("><>><------------------1"+JSON.stringify(userInfo)); 
                await onLoginFB(userInfo.id, userInfo.picture.data.url)
                console.log("><>><------------------2"); 
            })();
        }
    }, [response]);

    const setPassEntry = async () => {
        if (entry === true) {
            setEntry(false);
            setNameEntry('eye-with-line');
        } else {
            setEntry(true);
            setNameEntry('eye');
        }
    }

    return (
        // <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image}
                        source={require('../../../assets/images/banner_manage_store.jpg')} />
                </View>
                <View style={styles.plantaContainer}>
                    <Text style={styles.planta}>Phone Store</Text>
                </View>
                <View style={styles.sloganContainer}>
                    <Text style={styles.slogan}>Mua sắm và trải nghiệm sản phẩm cùng phụ kiện độc đáo duy nhất tại Việt Nam</Text>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder='Email'
                        style={styles.textInput} />
                    <View style={styles.fromPass}>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={entry}
                            placeholder='Password' style={styles.textInput} />
                        <Pressable
                            onPress={setPassEntry}
                            style={styles.eye}>
                            <Entypo name={nameEntry} size={24} color="black" />
                        </Pressable>
                    </View>
                    <Pressable
                        onPress={onLoginPress}
                        style={styles.button}>
                        <Text style={styles.login}>Đăng nhập</Text>
                    </Pressable>
                </View>
                <View style={styles.registerContainer}>
                    <Text onPress={() => navigation.navigate('Register')} style={styles.register}>Đăng ký</Text>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.iconLogin}>
                        <Pressable
                            onPress={onLoginPress}
                            style={styles.buttonLogin}>
                            <Text style={{ color: "black" }}>Đăng nhập bằng Google</Text>
                        </Pressable>
                        <AntDesign style={styles.icon} name="google" size={24} color="black" />
                    </View>
                    <View style={styles.iconLogin}>
                        <Pressable
                            onPress={loginApiFB}
                            style={styles.buttonLogin}>
                            <Text style={{ color: "black" }}>Đăng nhập bằng Facebook</Text>
                        </Pressable>
                        <Entypo style={styles.icon} name="facebook" size={24} color="black" />
                    </View>
                </View>
            </View>
        </ScrollView>
        /* </KeyboardAvoidingView> */
    )
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    imageContainer: {

    },
    image: {
        height: 300,
        width: '100%',
        // height: '100%',
        resizeMode: "cover",
    },
    plantaContainer: {
        alignItems: 'center',
        marginTop: 12,
    },
    planta: {
        color: 'red',
        fontSize: 35,
        fontWeight: 'bold',
    },
    sloganContainer: {
        paddingHorizontal: 64,
        marginTop: 16,
    },
    slogan: {
        fontSize: 12,
        lineHeight: 26,
        color: 'rgba(207, 207, 207, 1)',
        fontWeight: 'bold',
    },
    login: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22,
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 45,
        backgroundColor: 'red',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 44,
        lineHeight: 20,
        backgroundColor: "rgba(242, 242, 242, 1)",
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingRight: 35,
        borderRadius: 5,
    },
    fromPass: {
        position: "relative"
    },
    eye: {
        position: "absolute",
        right: 7,
        marginVertical: 20,
    },
    formContainer: {
        paddingHorizontal: 32,
        marginTop: 10,
        marginBottom: 10,
    },
    register: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    registerContainer: {
        marginTop: 11,
        alignItems: 'center',
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
    iconLogin: {
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        right: 20,
        marginVertical: 30
    },
})
