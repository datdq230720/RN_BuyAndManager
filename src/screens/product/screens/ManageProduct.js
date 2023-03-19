import React, { useContext, useState, useEffect } from 'react'
import {
    StyleSheet, Text, View, Image,
    FlatList, Dimensions, Pressable
} from 'react-native'
import { AntDesign,Feather } from '@expo/vector-icons';

import { ProductContext } from '../ProductContext';


export const ManageProduct = (props) => { 

    const { navigation } = props;
    const { OnGetProductForHomePage } = useContext(ProductContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            async function fetchData() {
                setIsLoading(true);
                const res = await OnGetProductForHomePage();
                setData(res);
                setIsLoading(false);
            }
            fetchData();
        })
        return unsubscribe;
    }, [props.navigation]);


    const loadScreen = () => {
        navigation.navigate('CreateProduct');
        navigation.navigate('ManageProduct');
    }


    const { deleteProductById } = useContext(ProductContext);

    const deleteOneItem = async (id) => {
        const res = await deleteProductById(id);
        loadScreen();
    }

    const renderItem = ({ item }) => {
        const { createdAt, title, description, price, image, category, discount, quantity, id } = item;

        return (
            <View style={styles.categoryContainer}>
                    <View style={styles.productImageContainer}>
                        <Image style={styles.productImage} resizeMode='cover'
                            source={{ uri: image }} />
                    </View>
                    <View style={styles.inforProduct}>
                        <View style={styles.productNameContainer}>
                            <Text numberOfLines={1} style={styles.productName}>Name: {title}</Text>
                        </View>
                        <View style={styles.productNameContainer}>
                            <Text numberOfLines={1} style={styles.productNomal}>category: {category}</Text>
                        </View>
                        <View style={styles.productNameContainer}>
                            <Text style={styles.productPrice}>Price: {price}đ</Text>
                        </View>
                        <View style={styles.productNameContainer}>
                            <Text style={styles.productNomal}>Quantity: {quantity}</Text>
                        </View>
                    </View>
                    <View style={{display: 'flex', flexDirection:'column', justifyContent: 'flex-end'}}>
                    <AntDesign onPress={() => navigation.navigate('UpdateProduct', { _id: id })} key={Math.random}
                    name="edit" size={24} color="black"/>
                    <Feather
                    onPress={() => deleteOneItem(id)}
                    name="trash-2" size={24} color="black" style = {{marginTop: 10, marginBottom: 10}} />
                    </View>

            </View>
        )
    }



    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <AntDesign onPress={() => {navigation.goBack()}} name="left" size={24} color="black" />
                <Text style={styles.title}>Quản lý sản phẩm</Text>
                <AntDesign onPress={() => navigation.navigate('CreateProduct')} key={Math.random}
                name="pluscircleo" size={24} color="black" />
            </View>
            {
                isLoading == true ?
                    <Text style = {{textAlign: 'center', marginTop: 50}}>Đang tải dữ liêu</Text> :
                    <FlatList
                        
                        data={data} renderItem={renderItem} //hiển thị 1 item
                        keyExtractor={item => Math.random()} />
            }

        </View>
    )
}


const styles = StyleSheet.create({
    inforProduct: {
        // padding: 5,
        flex: 1,
        marginLeft: 10
    },
    productPrice: {
        color: '#009245',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 5,
    },
    productPriceContainer: {},
    productNomal:{

    },
    productName: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    productNameContainer: {},
    productImage: {
        width: 100,
        height: 100,
    },
    productImageContainer: {
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginRight: 3,
    },
    product: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryName: {
        color: '#221F1F',
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 16,
    },
    categoryContainer: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    titleContainer: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 10,
    },
    container: {
        // width: '100%',
        // height: '100%',
        flexGrow: 1,
        backgroundColor: 'white',
        marginBottom: 30,
    }
})
