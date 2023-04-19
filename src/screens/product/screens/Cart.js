import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Pressable, FlatList, Dimensions, Modal, ToastAndroid } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { UserContext } from '../../user/UserContext';
import { ProductContext } from '../ProductContext';
import AsyncStorage from '@react-native-async-storage/async-storage';







export const Cart = (props) => {

    const { navigation } = props;

    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

    const { OnGetCartBy } = useContext(ProductContext);
    
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [user, setUser] = useState();

    const { user } = useContext(UserContext);


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            async function fetchData() {
                // console.log("user: " + JSON.stringify(user));
                setIsLoading(true);
                const res = await OnGetCartBy(true, user[0].id);
                setData(res);
                setIsLoading(false);
            }
            fetchData();
        })
        return unsubscribe;
    });


    const isShowCheckedOut = () => {
        const items = data;
        // console.log("ItemS: " + JSON.stringify(items));
        let total = 0;
        let count = 0;
        for (let index = 0; index < items.length; index++) {
            const element = items[index].product;
            total += element.quantity * element.price;
            count += element.quantity;
        }
        return { isShow: items.length > 0, total: total, count: count };
    }

    const deleteOneProduct = async (id) => {
        const status = await deleteMyCar(id);
        if (status == 200) {
            ToastAndroid.show('Xóa thành công', ToastAndroid.BOTTOM);
            loadScreen();

        }

    }
    const loadScreen = () => {
        navigation.navigate('Home');
        navigation.navigate('Cart');
    }
    const CartItems = (props) => {

        const renderItem = ({ item }) => {
            const { product, id } = item;

            return (
                <View style={styles.itemsContainer}>
                    {/* <View style={styles.checkedContainer}>
                        {
                            checked == true ?
                                <Pressable onPress={checked = false}>
                                    <FontAwesome name="check-square-o" size={24} color="black" />
                                </Pressable>
                                :
                                <Pressable onPress={checked = true}>
                                    <Feather name="square" size={24} color="black" />
                                </Pressable>
                                
                        }

                    </View> */}
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} resizeMode='cover'
                            source={{ uri: product.image }} />
                    </View>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.nameProduct}>Name: {product.title}</Text>
                        </View>
                        <View>
                            <Text style={styles.priceText}>Price: {product.price}VND</Text>
                        </View>
                        <View style={styles.quantityAction}>
                            <Text style={styles.quantity}>Quantity: {product.quantity}</Text>
                            <AntDesign onPress={() => deleteOneProduct(id)}
                                name="delete" size={24} color="black" />
                        </View>
                    </View>

                </View>
            )
        }
        return (
            <FlatList
                data={data}
                renderItem={renderItem}
                style={styles.flastlistContainer}
                keyExtractor={item => Math.random()}
                showsVerticalScrollIndicator={false}
            />
        )
    }
    const { deleteAllCartUser2 } = useContext(ProductContext);
    const { deleteMyCar } = useContext(ProductContext);

    const deleteAllCartUser = async (isUpdate) => {
        // console.log("DATA: "+data);
        // for (let index = 0; index < data.length; index++) {
        //     const element = await deleteMyCar(data[index].id);
        // }
        await deleteAllCartUser2(data, isUpdate);
        
        setIsShowDeleteModal(false);
        loadScreen();
        
    }

    const { setPayCart } = useContext(ProductContext);
    const payCart = async () => {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var today = new Date();
        let data = {
            createAt: today,
            status: false,
            quantity: isShowCheckedOut().count,
            total: isShowCheckedOut().total,
            id_user: user[0].id
        }
        const result = await setPayCart(data);
        if (result == true) {
            setIsShowModal(false);
            deleteAllCartUser(true);
            ToastAndroid.show('Đặt hàng thành công', ToastAndroid.BOTTOM);
        }
        
        
        console.log("DATA: " + JSON.stringify(data));

    }
    const CheckOutModel = (props) => {
        const { isShowModal, setIsShowModal, data } = props;
        
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isShowModal}
            // onRequestClose={() => {
            //     Alert.alert('Modal has been closed.');
            //     setModalVisible(!modalVisible);
            // }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.checkout}>Xác nhận thanh toán</Text>
                        <Pressable
                            onPress={() => {
                                payCart(data);
                            }}
                            style={styles.checkoutButton}>
                            <Text style={styles.checkoutText}>Đồng ý</Text>
                        </Pressable>

                        <Text onPress={() => setIsShowModal(false)} style={styles.cancel}>Hủy bỏ</Text>

                    </View>
                </View>
            </Modal>
        )
    }
    const DeleteModel = (props) => {
        const { isShowDeleteModal, setIsShowDeleteModal } = props;
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isShowDeleteModal}

            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.checkout}>Xác nhận xóa tất cả các đơn hàng</Text>
                        <Pressable style={styles.checkoutButton}
                        onPress={() => deleteAllCartUser(false)}>
                            <Text style={styles.checkoutText}>Đồng ý</Text>
                        </Pressable>

                        <Text onPress={() => setIsShowDeleteModal(false)} style={styles.cancel}>Hủy bỏ</Text>

                    </View>
                </View>
            </Modal>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <AntDesign name="left" size={24} color="black" />
                <Text style={styles.title}>Giỏ hàng</Text>
                <AntDesign onPress={() => setIsShowDeleteModal(true)} name="delete" size={24} color="black" />
            </View>
            <View>
                {
                    data.length == 0 ?
                        <View style={styles.titleContainer}>
                            <Text>Giỏ hàng của bạn đang trống</Text>
                        </View> : <CartItems />
                }
            </View>
            <View style={styles.checkoutContainer}>
                {
                    isShowCheckedOut().isShow == true ?
                        <>
                            <View style={styles.totalContainer}>

                                <Text style={styles.totalText}>Tạm tính: </Text>
                                <Text>{isShowCheckedOut().total}$</Text>
                            </View>
                            <Pressable onPress={() => setIsShowModal(true)} style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>Thanh toán</Text>
                                <AntDesign name="right" size={24} color="white" />
                            </Pressable>
                        </> : <></>
                }

            </View>
            <CheckOutModel isShowModal={isShowModal} setIsShowModal={setIsShowModal} data= {data} />
            <DeleteModel isShowDeleteModal={isShowDeleteModal} setIsShowDeleteModal={setIsShowDeleteModal} />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
    },
    titleContainer: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    title: {
        fontSize: 16,
        textTransform: 'uppercase',
    },
    itemsContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        
    },
    checkedContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 17,
    },
    imageContainer: {
        width: 77,
        height: 77,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        marginLeft: 15,
    },
    priceText: {
        color: 'green',
        fontSize: 16,
    },
    quantityAction: {
        width: '65%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    removeQuantity: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        width: 27.5,
        height: 27.5,
        textAlign: 'center',
        lineHeight: 20.5,
        color: 'black',
    },
    checkColorRemove: {
        borderColor: 'gray',
        color: 'gray',
        opacity: 0.5,
    },
    nameProduct:{
      fontSize: 20,
      color: 'black',  
      fontWeight: 'bold',
    },
    quantity: {

    },
    addQuantity: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        width: 27.5,
        height: 27.5,
        textAlign: 'center',
        lineHeight: 20.5,
    },
    checkColorRemove: {
        borderColor: 'gray',
        color: 'gray',
        opacity: 0.5,
    },
    delete: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    checkoutContainer: {
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 3,
        width: '100%',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,


    },
    totalText: {
        opacity: 0.5,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        backgroundColor: 'green',
        borderRadius: 8,
        paddingHorizontal: 30,
        marginTop: 16,

    },
    buttonText: {
        color: 'white',
    },
    flastlistContainer: {
        maxHeight: Dimensions.get('window').height - 200,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
        width: '90%',
        height: 200,
    },
    checkout: {
        color: 'black',
        fontSize: 16,
    },
    checkoutButton: {
        backgroundColor: 'green',
        height: 50,
        borderRadius: 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    checkoutText: {
        color: 'white',
        fontSize: 16,
    },
    cancel: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: 8,
        color: 'black'
    }
})

// var data = [
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d1",
//             "name": "Ambrosia ambrosioides (Cav.) Payne",
//             "price": 10,
//             "madein": "Indonesia",
//             "quantity": 1547072381,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 94,
//             "size": "XS",
//             "createdAt": "2021-05-20T00:40:04.000Z",
//             "updatedAt": "2021-02-15T15:54:50.000Z"
//         },
//         quantity: 1,
//         price: 10,
//         checked: true,
//     },
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d2",
//             "name": "Ambrosia ambrosioides (Cav.) Payne",
//             "price": 1,
//             "madein": "Indonesia",
//             "quantity": 1547072381,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 94,
//             "size": "XS",
//             "createdAt": "2021-05-20T00:40:04.000Z",
//             "updatedAt": "2021-02-15T15:54:50.000Z"
//         },
//         quantity: 5,
//         price: 1,
//         checked: false,
//     },
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d3",
//             "name": "Ambrosia ambrosioides (Cav.) Payne",
//             "price": 7,
//             "madein": "Indonesia",
//             "quantity": 1547072381,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 94,
//             "size": "XS",
//             "createdAt": "2021-05-20T00:40:04.000Z",
//             "updatedAt": "2021-02-15T15:54:50.000Z"
//         },
//         quantity: 3,
//         price: 7,
//         checked: false,
//     },
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d4",
//             "name": "Ambrosia ambrosioides (Cav.) Payne",
//             "price": 7,
//             "madein": "Indonesia",
//             "quantity": 1547072381,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 94,
//             "size": "XS",
//             "createdAt": "2021-05-20T00:40:04.000Z",
//             "updatedAt": "2021-02-15T15:54:50.000Z"
//         },
//         quantity: 3,
//         price: 7,
//         checked: false,
//     },
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d5",
//             "name": "Ambrosia ambrosioides (Cav.) Payne",
//             "price": 7,
//             "madein": "Indonesia",
//             "quantity": 1547072381,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 94,
//             "size": "XS",
//             "createdAt": "2021-05-20T00:40:04.000Z",
//             "updatedAt": "2021-02-15T15:54:50.000Z"
//         },
//         quantity: 3,
//         price: 7,
//         checked: false,
//     },
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d6",
//             "name": "Ambrosia ambrosioides (Cav.) Payne",
//             "price": 7,
//             "madein": "Indonesia",
//             "quantity": 1547072381,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 94,
//             "size": "XS",
//             "createdAt": "2021-05-20T00:40:04.000Z",
//             "updatedAt": "2021-02-15T15:54:50.000Z"
//         },
//         quantity: 3,
//         price: 7,
//         checked: false,
//     },
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d7",
//             "name": "Ambrosia ambrosioides (Cav.) Payne",
//             "price": 7,
//             "madein": "Indonesia",
//             "quantity": 1547072381,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 94,
//             "size": "XS",
//             "createdAt": "2021-05-20T00:40:04.000Z",
//             "updatedAt": "2021-02-15T15:54:50.000Z"
//         },
//         quantity: 3,
//         price: 7,
//         checked: false,
//     },
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d8",
//             "name": "Ambrosia ambrosioides (Cav.) Payne",
//             "price": 7,
//             "madein": "Indonesia",
//             "quantity": 1547072381,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 94,
//             "size": "XS",
//             "createdAt": "2021-05-20T00:40:04.000Z",
//             "updatedAt": "2021-02-15T15:54:50.000Z"
//         },
//         quantity: 3,
//         price: 7,
//         checked: false,
//     },
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d9",
//             "name": "Ambrosia ambrosioides (Cav.) Payne",
//             "price": 7,
//             "madein": "Indonesia",
//             "quantity": 1547072381,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 94,
//             "size": "XS",
//             "createdAt": "2021-05-20T00:40:04.000Z",
//             "updatedAt": "2021-02-15T15:54:50.000Z"
//         },
//         quantity: 3,
//         price: 7,
//         checked: false,
//     },
// ]