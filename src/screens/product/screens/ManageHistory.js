import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../user/UserContext';

import { ProductContext } from '../ProductContext';


export const ManageHistory = (props) => {


    const [data, setData] = useState([]);
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const { getHistoryCartByAdmin, updateStatusCartByAdmin } = useContext(ProductContext);

    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            async function fetchData() {
                setIsLoading(true);
                const res = await getHistoryCartByAdmin();
                setData(res);
                setIsLoading(false);
            }
            fetchData();
        })
        return unsubscribe;
    }, [props.navigation]);

    const displayDay = (day) => {
        switch (day) {
            case 0: return 'Chủ nhật';
            case 1: return 'Thứ hai';
            case 2: return 'Thứ ba';
            case 3: return 'Thứ tư';
            case 4: return 'Thứ năm';
            case 5: return 'Thứ sáu';
            case 6: return 'Thứ bảy';
            default:
                break;
        }
    }

    const displayTime = (time) => {
        time = new Date(time);
        const day = displayDay(time.getDay());
        const date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
        const month = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
        const year = time.getFullYear();
        return `${day}, ${date}/${month}/${year}`
    }



    const setUpStatusCart = async (data, id) => {
        if (data.status == true) {
            data.status = false;
        } else {
            data.status = true;
        }
        const res = await updateStatusCartByAdmin(data, id);
        if (res == true) {
            console.log("abc");
            props.navigation.navigate('Profile');
            props.navigation.navigate('ManageHistory');
        }

    }


    const renderItem = ({ item }) => {
        const { createAt, total, quantity, status, id } = item;

        let TT = "";
        if (status == false) {
            TT = "Đang chuẩn bị hàng"
        } else {
            TT = "Đã giao hàng"
        }
        return (
            <View style={styles.cartItemContainer}>
                <Text style={styles.date}>{displayTime(createAt)}</Text>
                <Text
                    style={[styles.status, status == false ? styles.status2 : null]}>
                    Trạng thái: {TT}
                </Text>
                <Text style={styles.products}>Tổng sản phẩm: {quantity}</Text>
                <Text style={styles.total}>Tổng tiền: {total}VND</Text>
                <Pressable
                    onPress={() => { setUpStatusCart(item, id) }}
                    style={styles.button} >
                    <Text style={{ color: "#FFFFFF" }}>Cập nhật trạng thái</Text>
                </Pressable>

            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.tittle}>Quản lý đơn hàng</Text>
            <FlatList
                data={data}
                keyExtractor={item => Math.random()}
                renderItem={renderItem}
            />
        </View>
    );
};



const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        height: 48,
        backgroundColor: "#0099FF",
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    total: {
        color: '#000',
        fontSize: 14,
    },
    products: {
        color: '#000',
        fontSize: 14,
    },
    status: {
        color: '#007537',
        fontSize: 16,
    },
    status2: {
        color: 'red',
        fontSize: 16,
    },
    date: {
        color: '#221F1F',
        fontSize: 16,
        borderBottomColor: '#7D7B7B',
        borderBottomWidth: 0.5,
    },
    cartItemContainer: {
        marginTop: 16,
    },
    tittle: {
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 32,
        paddingHorizontal: 32,
    }
});


