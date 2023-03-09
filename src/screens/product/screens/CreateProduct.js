import React, { useContext, useState, useEffect } from 'react'
import {
    StyleSheet, Text, View, Image,
    FlatList, Dimensions, Pressable, TextInput,
    Button, ToastAndroid
} from 'react-native'
import { ProductContext } from '../ProductContext';
import { AntDesign, Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';



export const CreateProduct = (props) => {

    const { navigation } = props;
    const { createProductByAdmin } = useContext(ProductContext);
    const [data, setData] = useState([]);


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [discount, setDiscount] = useState('')
    const [quantity, setQuantity] = useState('')

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

    const createProduct = async () => {
        let status = Validate();

        if (status == true) {
            let data = { title, description, price, image, category, discount, quantity }
            const res = await createProductByAdmin(data);
            if (res == 201 || res == 200) {
                navigation.navigate('ManageProduct');
            } else {
                ToastAndroid.show('Thêm sản phẩm thất bại', ToastAndroid.TOP);
            }

        }

    }

    return (
        <View style={styles.container}>
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
                    onChangeText={(e) => setPrice(Number(e))} />

                <Text style={styles.text}>Quantity:</Text>
                <TextInput style={styles.textInput}
                    value={quantity.toString()} keyboardType={'numeric'}
                    onChangeText={(e) => setQuantity(Number(e))} />

                <Text style={styles.text}>Discount:</Text>
                <TextInput style={styles.textInput}
                    value={discount.toString()} keyboardType={'numeric'}
                    onChangeText={(e) => setDiscount(Number(e))} />

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
                        onPress={() => { createProduct() }}
                        style={styles.button} >
                        <FontAwesome name="save" size={24} color="black" />
                        <Text style={{ color: "#FFFFFF" }}>Save</Text>
                    </Pressable>

                </View>
            </ScrollView>
        </View>
    )


}


const styles = StyleSheet.create({

    container: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 30,

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
