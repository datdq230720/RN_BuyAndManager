import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../ProductContext';
import { StyleSheet, Text, View, FlatList, Image, TextInput, Pressable } from 'react-native'

export const Search = (props) => {

    const { OnGetProductSearch } = useContext(ProductContext);
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([])


    const { navigation } = (props);

    const renderItem = ({ item }) => {
        const { createdAt, title, description, price, image, category, discount, quantity, id } = item;
        return (
            <Pressable onPress={() => navigation.navigate('Detail', { id: id })} style={styles.productContainer} key={Math.random}>
                <View style={styles.productList}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.images} resizeMode='cover' source={{ uri: image }} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1} style={styles.name}>{title}</Text>
                        <Text style={styles.price}>{price}VND</Text>
                        <Text style={styles.sold}>Còn lại: {quantity}</Text>
                    </View>
                </View>
            </Pressable>
        )
    }

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            async function fetchData() {
                setIsLoading(true);
                const res = await OnGetProductSearch(searchValue);
                setData(res);
                setIsLoading(false);
            }
            fetchData();
        })
        return unsubscribe;
    }, [props.navigation, onSearch]);

    const onSearch = async () => {
        const res = await OnGetProductSearch(searchValue);
        setData(res);
        console.log("Search: " + searchValue);
    }

    return (
        <View style={styles.container}>
            <View style={styles.textSearchContainer}>
                <Text style={styles.textSearch}>Tìm kiếm</Text>
            </View>
            <View style={styles.textInputContainer}
            >
                <TextInput
                    style={styles.textInput} placeholder='Từ khóa tìm kiếm'
                    onChangeText={setSearchValue} />
                <Pressable style={styles.searchIcon}
                onPress={() => onSearch()}>
                    <Image source={require('../../../assets/images/search.png')} />
                </Pressable>
            </View>
            {
                isLoading == true ?
                    <Text>Đăng tải dữ liệu</Text> :
                    <FlatList data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item._id} />
            }

        </View>
    )
}
const styles = StyleSheet.create({
    sold: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
    },
    price: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '500',
        color: 'red',
    },
    name: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '500',
    },
    textContainer: {
        marginLeft: 140,
        width: 187,
        height: 77,
    },
    images: {
        borderRadius: 8,
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        borderRadius: 8,
        backgroundColor: '#F6F6F6',
        marginLeft: 48,
        width: 77,
        height: 77,
        position: 'absolute',
    },
    productList: {
        position: 'relative',
    },
    productContainer: {
        backgroundColor: 'white',
        marginVertical: 15,
    },
    searchIcon: {
        position: 'absolute',
        right: 48,
        top: 8,
    },
    textInput: {
        width: '100%',
        height: '100%',
        borderBottomColor: '#221F1F',
        borderBottomWidth: 1.5,
        paddingRight: 25,
    },
    textInputContainer: {
        paddingHorizontal: 48,
        height: 40,
        position: 'relative',
    },
    textSearch: {
        fontSize: 16,
        fontWeight: '500',
        textTransform: 'uppercase',
        lineHeight: 55,
    },
    textSearchContainer: {
        alignItems: 'center',
    },
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        paddingTop: 32,
        paddingBottom: 80
    }
})
