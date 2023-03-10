import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Pressable, ToastAndroid } from 'react-native'
import { UserContext } from '../UserContext';
import { Entypo, AntDesign } from '@expo/vector-icons';


export const Register = (props) => {
    const { navigation } = (props);

    const { onRegister } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [entry, setEntry] = useState(true);
    const [nameEntry, setNameEntry] = useState('eye');

    const register = async () => {
        if (email == '' || password == '' || confirmPassword == '') {
            ToastAndroid.show('Không được phép để trống', ToastAndroid.BOTTOM);
        } else {
            if (confirmPassword == password) {
                const res = await onRegister(email, password);
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
                    <View style={styles.fromPass}>
                        <TextInput
                            value={confirmPassword} 
                            onChangeText={setConfirmPassword}
                            placeholder='Confirm Password' style={styles.textInput} />
                        <Pressable
                            onPress={setPassEntry}
                            style={styles.eye}>
                            <Entypo name={nameEntry} size={24} color="black" />
                        </Pressable>
                    </View>
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
