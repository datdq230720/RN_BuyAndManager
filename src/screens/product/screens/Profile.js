import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../../user/UserContext';
import { ProductContext } from '../ProductContext';

export const Profile = (props) => {
    const { navigation } = props;

    const { user, setIsLoggedIn } = useContext(UserContext);
    const { username, manage, image, id } = user[0];
    let manager;
    if (user[0].manage === true) {
        console.log("USER: " + image);
        manager = "Người quản lý";
    } else {
        manager = "Người dùng";
    }

    return (
        <View style={styles.container2}>
            <Text style={styles.title}>ProfFile</Text>
            <View style={styles.infoContainer}>
                <View style={styles.avatarContainer}>
                    {/* {
                        image.trim.length == 0 ?
                            <Ionicons name="person-circle" size={34} color="black" />
                            :
                            <Image source={{ uri: image }} resizeMode='cover'
                                style={styles.avatar} />

                    } */}
                    <Image source={{ uri: image }} resizeMode='cover'
                        style={styles.avatar} />
                </View>
                <View style={styles.nameContainer}>
                    <Text numberOfLines={1} style={styles.name}>{user[0].username}</Text>
                    <Text numberOfLines={1} style={styles.email}>{manager}</Text>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <Text style={styles.actionTitle}>Chung</Text>
                <Text onPress={() => navigation.navigate('EditProfile')}
                    style={styles.action}>Chỉnh sửa thông tin</Text>
                <Text onPress={() => navigation.navigate('CartHistory')}
                    style={styles.action}>Lịch sử giao dịch</Text>
                {
                    user[0].manage == true ?
                        <View>
                            <Text style={styles.actionTitle}>Admin</Text>
                            <Text onPress={() => navigation.navigate('ManageStack')}
                                style={styles.action}>Quản lý sản phẩm</Text>
                            <Text onPress={() => navigation.navigate('ManageHistory')}
                                style={styles.action}>Quản lý đơn hàng</Text>
                        </View> :
                        <View></View>
                }
                <Text style={styles.actionTitle}>Ứng dụng</Text>
                <Text onPress={() => setIsLoggedIn(false)}
                    style={[styles.action, styles.logout]}>Đăng xuất</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 32,
        paddingHorizontal: 48,
        borderColor: 'red',
        borderWidth: 1,
    },
    container2: {
        paddingTop: 32,
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 48,
    },
    title: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'uppercase',

    },
    infoContainer: {
        flexDirection: 'row',

        marginTop: 15,
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 39,
        height: 39,
        borderRadius: 20,
    },
    avatar: {
        width: "90%",
        height: "90%",
        borderRadius: 20,
    },
    nameContainer: {
        marginLeft: 26,
    },
    name: {
        fontSize: 16,
    },
    email: {
        fontSize: 14,
        color: '#7F7F7F'
    },
    actionTitle: {
        fontSize: 16,
        color: 'gray',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 15,
    },
    action: {
        marginTop: 10,
        color: 'black',
    },
    logout: {
        color: 'red',
    }
});

var data = {
    _id: "61ff47d2baa7f3001696e13f",
    name: "Dinh Quoc Dat",
    address: "Vung Tau, Viet Nam",
    phone: "0123123777",
    avatar: "",
    dob: "2022-02-06T04:00:18.820Z",
    email: "dinhquocdat2000@gmail.com",
    createdAt: "2022-02-06T04:00:18.847Z",
    updatedAt: "2022-02-06T04:00:18.847Z",
    __v: 0
}