import React, { useContext, useState, useEffect, } from 'react'
import {
    StyleSheet, Text, View, Image,
    FlatList, Dimensions, Pressable, SafeAreaView
} from 'react-native'
import { ProductContext } from '../ProductContext';


export const Home = (props) => {

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


    const renderItem = ({ item }) => {
        const { createdAt, title, description, price, image, category, discount, quantity, id } = item;

        return (
            <View style={styles.categoryContainer}>
                <Pressable onPress={() => navigation.navigate('Detail', { id: id })} style={styles.product} key={id}>
                    <View style={styles.productImageContainer}>
                        <Image style={styles.productImage} resizeMode='cover'
                            source={{ uri: image }} />
                    </View>
                    <View style={styles.inforProduct}>
                        <View style={styles.productNameContainer}>
                            <Text numberOfLines={1} style={styles.productName}>Name: {title}</Text>
                        </View>
                        <View style={styles.productNameContainer}>
                            <Text numberOfLines={1} style={styles.productNomal}>Category: {category}</Text>
                        </View>
                        <View style={styles.productNameContainer}>
                            <Text style={styles.productPrice}>Price: {price}VND</Text>
                        </View>
                        <View style={styles.productNameContainer}>
                            <Text style={styles.productNomal}>Quantity: {quantity}</Text>
                        </View>
                    </View>

                </Pressable>
            </View>
        )
    }

    const renderHeader = () => {
        return (
            <View>
                <Image style={{ height: 200, width: "100%", resizeMode: "cover" }} source={require('../../../assets/images/banner_manage_store2.jpg')} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {
                isLoading == true ?
                    <Text style = {{textAlign: 'center', marginTop: 50}}>Đang tải dữ liêu</Text> :
                    <FlatList
                        ListHeaderComponent={renderHeader}  
                        numColumns={2}
                        data={data} renderItem={
                            renderItem
                        } //hiển thị 1 item
                        keyExtractor={item => Math.random()} />
            }
        </View>

    )
}


const styles = StyleSheet.create({
    inforProduct: {
        padding: 5,
        marginLeft: 5,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    productPrice: {
        color: '#009245',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 5,
    },
    productPriceContainer: {},
    productNomal: {

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
        width: '100%',
    },
    product: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
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
    },
    categoryContainer: {
        padding: 10,
        flex: 0.5,
        
    },

    // container: {
    //     // width: '100%',
    //     // height: '100%',
    //     backgroundColor: 'white',
    // },
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
    },

})
