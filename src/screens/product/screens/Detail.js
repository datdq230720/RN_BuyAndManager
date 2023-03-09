import { StyleSheet, Text, View, Image, Pressable, ToastAndroid, ScrollView } from 'react-native';
import PagerView from 'react-native-pager-view';
import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../ProductContext';
import { UserContext } from '../../user/UserContext';


const PartialView = (props) => {
    const { product } = props;
    const { navigation } = props;
    const { createdAt, title, description, price, image, category, discount, quantity, id } = product;

    const { user } = useContext(UserContext);
    const { AddMyCar } = useContext(ProductContext);


    const [number, setNumber] = useState(0);

    const onNumberChange = (isAdd) => {
        if (isAdd == true && number < quantity) {
            setNumber(number + 1);
        } else if (isAdd == false && number >= 1) {
            setNumber(number - 1);
        }
    }

    const onUpdateCart = async () => {
        // updateCart(product, price, number, true);
        let data = {
            isCart: true,
            product: {
                title: title,
                price: price,
                quantity: number,
                image: image,
                id: id
            },
            id_user: user[0].id,
            
        }
        const status = await AddMyCar(id, user[0].id, data);
        if (status == 201 || status == 200) {
            ToastAndroid.show('Thêm thành công', ToastAndroid.BOTTOM);
            navigation.navigate('Home')
        }
        
    }
    return (
        <>
            <View style={styles.productInfoContainer}>
                <Text style={styles.productPrice}>{price}$</Text>
                <Text style={styles.productTitle}>Chi tiết sản phẩm</Text>
                <View style={styles.productDetail}>
                    <Text style={styles.productDetailText}>Loại</Text>
                    <Text style={styles.productDetailText}>{category}</Text>
                </View>
                <View style={styles.productDetail}>
                    <Text style={styles.productDetailText}>Chi tiết</Text>
                    <Text style={styles.productDetailText}>{description}</Text>
                </View>
                <View style={styles.productDetail}>
                    <Text style={styles.productDetailText}>Tình trạng</Text>
                    <Text style={styles.productDetailText}>Còn {quantity} sp</Text>
                </View>
            </View>
            <View style={styles.cartProcessContainer}>
                <View style={styles.processQuantity}>
                    <Text style={styles.quantityText}>Đã chọn {number} sản phẩm</Text>
                    <View style={styles.quantityAction}>
                        <Text onPress={() => onNumberChange(false)}
                            style={[styles.removeQuantity, number < 1 ? styles.checkColorRemove : null]}>-</Text>
                        <Text style={styles.quantity}>{number}</Text>
                        <Text onPress={() => onNumberChange(true)}
                            style={[styles.addQuantity, number == quantity ? styles.checkColorRemove : null]}>+</Text>
                    </View>
                </View>
                <View style={styles.processTotal}>
                    <Text style={styles.tatolText}>Tạm tính</Text>
                    <Text style={styles.total}>{number * price}$</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={onUpdateCart}
                    style={[styles.button, number > 0 ? styles.checkColor : null]}>
                    <Text style={styles.buttonText}>Chọn mua</Text>
                </Pressable>
            </View>
        </>
    )
}

export const Detail = (props) => {
    const { navigation, route: { params: { id } } } = props;

    const { user } = useContext(UserContext);

    const { OnGetProductDetail } = useContext(ProductContext);
    const [product, setProduct] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            async function fetchData() {
                setIsLoading(true);
                const res = await OnGetProductDetail(id);
                setProduct(res);
                setIsLoading(false);
            }
            fetchData();
        })
        return unsubscribe;
    }, [props.navigation]);

    if (!product) {
        return (<></>)
    };
    const { createdAt, title, description, price, image, category, discount, quantity } = product;


    return (
        <View style={styles.container}>

            <ScrollView >
                <View style={styles.productNameContainer}>
                    <Text style={styles.productName}>{title}</Text>
                </View>
                <View style={styles.productImagesContainer}>
                    <PagerView style={styles.productImagesPager} initialPage={0} orientation='horizontal'>
                        <Image key={Math.random()}
                            source={{ uri: image }}
                            style={styles.ProductImage}
                            resizeMode='cover' />
                    </PagerView>
                </View>
                <PartialView product={product} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
    },
    productNameContainer: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
    },
    productName: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    productImagesContainer: {
        height: 270,
        width: '100%',
    },
    productImagesPager: {
        flex: 1,
    },
    ProductImage: {
        height: '100%',
        width: '100%',
    },
    productInfoContainer: {
        paddingHorizontal: 48,
        paddingVertical: 48,
    },
    productPrice: {
        fontSize: 24,
        fontWeight: '500',
        color: 'green',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#3A3A3A',
        marginTop: 15,
        borderBottomWidth: 0.5,

    },
    productDetail: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#221F1F',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    productDetailText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#3A3A3A',
    },
    cartProcessContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    processQuantity: {

    },
    quantityText: {
        fontSize: 14,
        color: 'gray',
        opacity: 0.6,
    },
    quantityAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
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
    processTotal: {

    },
    tatolText: {
        fontSize: 14,
        color: 'gray',
        opacity: 0.6,
    },
    total: {
        marginTop: 4,
        textAlign: 'right',
        fontSize: 24,
        fontWeight: '500',
    },
    buttonContainer: {
        paddingHorizontal: 24,
        marginTop: 15,
        height: 50,
    },
    button: {
        borderRadius: 8,
        backgroundColor: '#ABABAB',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        textTransform: 'uppercase',
    },
    checkColor: {
        backgroundColor: '#007537'
    },
});

