import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../user/UserContext';

import { ProductContext } from '../ProductContext';


export const CartHistory = (props) => {

    const [data, setData] = useState([]);
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const { getHistoryCartByUser } = useContext(ProductContext);

    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            async function fetchData() {
                setIsLoading(true);
                const res = await getHistoryCartByUser(user[0].id);
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

    


    

    const renderItem = ({ item }) => {
        const { createAt, total, quantity, status } = item;
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
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.tittle}>Lịch sử giao dịch</Text>
            <FlatList
                data={data}
                keyExtractor={item => Math.random()}
                renderItem={renderItem}
            />
        </View>
    );
};



const styles = StyleSheet.create({
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


