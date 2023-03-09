import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Pressable, ToastAndroid } from 'react-native'
import { UserContext } from '../UserContext';


export const Register = (props) => {
    const { navigation } = (props);

    const { onRegister } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const register = async () => {
        if (username == '' || password == '' || confirmPassword == '') {
            ToastAndroid.show('Không được phép để trống', ToastAndroid.BOTTOM);
        }else{
            if (confirmPassword == password) {
                const res = await onRegister(username, password);
                if (res == true) {
                    ToastAndroid.show('Đã đăng kí thành công bạn có thể đăng nhập', ToastAndroid.BOTTOM);
                    navigation.goBack();
                } else {
                    ToastAndroid.show('Tài khoản đã tồn tại', ToastAndroid.BOTTOM);
                }
            } else {
                ToastAndroid.show('Mật khẩu ko trùng khớp', ToastAndroid.BOTTOM);
            }
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.plantaContainer}>
                    <Text style={styles.planta}>Phone Store</Text>
                </View>
                <View style={styles.sloganContainer}>
                    <Text style={styles.slogan}>Mua sắm và trải nghiệm sản phẩm cùng phụ kiện độc đáo duy nhất tại Việt Nam</Text>
                </View>
                <View style={styles.formContainer}>
                    <TextInput 
                    value={username} onChangeText={setUsername}
                    placeholder='Username' style={styles.textInput} />
                    <TextInput 
                    value={password} onChangeText={setPassword}
                    placeholder='Password' style={styles.textInput} />
                    <TextInput 
                    value={confirmPassword} onChangeText={setConfirmPassword}
                    placeholder='Confirm Password' style={styles.textInput} />
                    <Pressable onPress={register} style={styles.button}>
                        <Text style={styles.login}>Đăng ký</Text>
                    </Pressable>
                </View>
                <View style={styles.registerContainer}>
                    <Text onPress={() => navigation.goBack()} style={styles.register}>Đăng nhập</Text>
                </View>
            </View>
        </ScrollView>
    )
}




const styles = StyleSheet.create({
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
        backgroundColor: '#221F1F',
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
        marginTop: 30,
    },
    sloganContainer: {
        fontSize: 12,
        lineHeight: 24,
        alignItems: 'center',
    },
    slogan: {
        paddingHorizontal: 46,
        marginTop: 16,
    },
    planta: {
        color: 'red',
        fontSize: 35,
        fontWeight: 'bold',
    },
    plantaContainer: {
        alignItems: 'center',
        marginTop: 70,
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: '100%',
        height: 390,
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    }
})
