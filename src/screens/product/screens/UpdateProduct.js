import React, { useContext, useState, useEffect } from 'react'
import {
    StyleSheet, Text, View, Image,
    FlatList, Dimensions, Pressable, TextInput,
    Button, ToastAndroid, ScrollView
} from 'react-native'
import { ProductContext } from '../ProductContext';
import { AntDesign, Feather, Ionicons, FontAwesome } from '@expo/vector-icons';


export const UpdateProduct = (props) => {

    const { navigation, route: { params: { _id } } } = props;
    const { OnGetProductDetail, updateProductById } = useContext(ProductContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [discount, setDiscount] = useState(0)
    const [quantity, setQuantity] = useState(0)
    

    const Validate = () => {
        let status = true;
        if (title == '' || description == '' || price == '' ||
            image == '' || category == '' || discount == '' || quantity == '') {
            ToastAndroid.show('Không được để trống dữ liệu', ToastAndroid.TOP);
            return status = false;
        } else {
            if (Number.isFinite(price) == false) {
                ToastAndroid.show('Price phải là dạng số', ToastAndroid.TOP);
                return status = false;
            }
            if (Number.isFinite(discount) == false) {
                ToastAndroid.show('Discount phải là dạng số', ToastAndroid.TOP);
                return status = false;
            }
            if (Number.isFinite(quantity) == false) {
                ToastAndroid.show('Quantity phải là dạng số', ToastAndroid.TOP);
                return status = false;
            }
        }
        return status = true;
    }


    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            async function fetchData() {
                setIsLoading(true);
                const res = await OnGetProductDetail(_id);
                setId(res.id)
                setTitle(res.title)
                setDescription(res.description)
                setPrice(res.price)
                setImage(res.image)
                setCategory(res.category)
                setDiscount(res.discount)
                setQuantity(res.quantity)
                setData(res);
                setIsLoading(false);
            }
            fetchData();
        })
        return unsubscribe;
    }, [props.navigation]);


    const updateProduct = async () => {
        let status = Validate();
        
        if (status == true) {
            let data = { title, description, price, image, category, discount, quantity }
            const res = await updateProductById(data, id);
            if (res == true) {
                navigation.navigate('ManageProduct');
            } else {
                ToastAndroid.show('Thêm sản phẩm thất bại', ToastAndroid.TOP);
            }
           
        }

    }

    return (
        <View style={styles.container}>
            {
                isLoading == true ?
                    <Text style={{ textAlign: 'center', marginTop: 50 }}>Đang tải dữ liêu</Text> :
                    <View>
                        <Text style={styles.title}>Thêm sản phẩm</Text>
                        <ScrollView>
                            <Text style={styles.text}>Name:</Text>
                            <TextInput style={styles.textInput}
                                value={title}
                                onChangeText={setTitle} />

                            <Text style={styles.text}>Category:</Text>
                            <TextInput style={styles.textInput}
                                value={category}
                                onChangeText={setCategory} />

                            <Text style={styles.text}>Price:</Text>
                            <TextInput style={styles.textInput}
                                value={price.toString()} keyboardType={'numeric'}
                                onChangeText={(e)=>setPrice(Number(e))} />

                            <Text style={styles.text}>Quantity:</Text>
                            <TextInput style={styles.textInput}
                                value={quantity.toString()} keyboardType={'numeric'}
                                onChangeText={(e)=>setQuantity(Number(e))} />
                            
                            <Text style={styles.text}>Discount:</Text>
                            <TextInput style={styles.textInput}
                                value={discount.toString()} keyboardType={'numeric'}
                                onChangeText={(e)=>setDiscount(Number(e))} />

                            <Text style={styles.text}>Description:</Text>
                            <TextInput style={styles.textInput}
                                value={description}
                                onChangeText={setDescription} />

                            <Text style={styles.text}>Url Img:</Text>
                            <TextInput style={styles.textInput}
                                value={image}
                                onChangeText={setImage} />

                            <View style={[styles.viewButton, { justifyContent: "space-evenly" }]}>
                                <Pressable
                                    onPress={() => navigation.navigate('ManageProduct')}
                                    style={styles.button}>
                                    <Ionicons name="exit" size={24} color="black" />
                                    <Text style={{ color: "#FFFFFF" }}>Exit</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => { updateProduct() }}
                                    style={styles.button} >
                                    <FontAwesome name="save" size={24} color="black" />
                                    <Text style={{ color: "#FFFFFF" }}>Save</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
            }

        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 40,

    },
    text: {
        marginLeft: 10,
        fontStyle: "italic",
    },

    textInput: {
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        margin: 4,
        padding: 5,
    },

    viewButton: {
        marginTop: 10,
        flexDirection: "row",
    },
    button: {
        flexDirection: "row",
        width: 100,
        height: 48,
        backgroundColor: "#0099FF",
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 5,
    },
})
