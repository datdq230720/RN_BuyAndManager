import React, { useContext, useState } from 'react'
import {
    StyleSheet, Text, View, Image, TextInput, Pressable,
    KeyboardAvoidingView, ScrollView, ToastAndroid
} from 'react-native'
import { UserContext } from '../UserContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

// "email": "dinhquocdat2000@gmail.com",
// "password": "1234567890"

export const Login = (props) => {
    const { navigation } = props;
    const { onLogin } = useContext(UserContext);
    const { user } = useContext(UserContext);

    const [email, setEmail] = useState('admin');
    const [password, setPassword] = useState('123456');



    const onLoginPress = async () => {
        if (email == '' || password == '') {
            ToastAndroid.show('Không được để trống', ToastAndroid.TOP);
        } else {
            const _status = await onLogin(email, password);
            ToastAndroid.show('' + _status, ToastAndroid.TOP);
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
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        placeholder='Password' style={styles.textInput} />
                    <Pressable
                        onPress={onLoginPress}
                        style={styles.button}>
                        <Text style={styles.login}>Đăng nhập</Text>
                    </Pressable>
                </View>
                <View style={styles.registerContainer}>
                    <Text onPress={() => navigation.navigate('Register')} style={styles.register}>Đăng ký</Text>
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
        width: '100%',
        height: 390,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    plantaContainer: {
        alignItems: 'center',
        marginTop: 28,
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
        borderRadius: 8,
        backgroundColor: '#ABABAB',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 33,
        lineHeight: 20,
        borderBottomColor: '#7D7B7B',
        borderBottomWidth: 1.5,
        marginVertical: 4,
    },
    formContainer: {
        paddingHorizontal: 32,
        marginTop: 10,
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
        marginBottom: 20,
    },
})
