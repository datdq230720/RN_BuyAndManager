import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export const EditProfile = (props) => {
    const { navigation } = props;
    const { _id, name, address, phone, avatar, dob, email } = data;
    const [fullName, setFullNam] = useState(name);
    const [location, setLocation] = useState(address);
    const [mobile, setMobile] = useState(phone);
    const [birthday, setBirthday] = useState(dob);
    const [showDateTimePicker, setShowDateTimePicker] = useState(false)

    const displayTime = (time) => {
        time = new Date(time);
        return time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear();
    }
    const onChangeDateTime = (event, selectedDate) => {
        const currentDate = selectedDate || birthday;
        setShowDateTimePicker(false);
        setBirthday(currentDate);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chỉnh sửa thông tin</Text>
            <Text style={styles.instruction}>Thông tin sẽ được lưu cho lần mua kế tiếp</Text>
            <Text style={styles.instruction}>Bấm vào thông tin chi tiết để chỉnh sửa</Text>
            <View style={styles.formContainer}>
                <TextInput value={fullName} onChangeText={setFullNam} style={styles.inputText} />
                <TextInput value={location} onChangeText={setLocation} style={styles.inputText} />
                <TextInput value={mobile} onChangeText={setMobile} style={styles.inputText} />
                <TextInput value={displayTime(birthday)}
                    onPressIn={() => setShowDateTimePicker(true)} style={styles.inputText} />
            </View>
            <Pressable style={styles.buttonContainer}>
                <Text style={styles.save}>Lưu thông tin</Text>
            </Pressable>
            {showDateTimePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(birthday)}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDateTime}
                />
            )}
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        paddingTop: 32,
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 48,
        position: 'relative',
        alignItems: 'center',
    },
    title: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 16,
    },
    instruction: {
        color: 'black',
        fontSize: 12,
    },
    formContainer: {
        marginTop: 60,
        width: '100%',
    },
    inputText: {
        height: 40,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ABABAB',
        fontSize: 14,
        color: 'gray',

    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: '80%',
        borderRadius: 8,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    save: {
        textTransform: 'uppercase',
        color: 'white',
    },
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
