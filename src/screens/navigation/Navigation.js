import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { ProductNavigation } from '../product/ProductNavigation';
import { UserNavigation } from '../user/UserNavigation';
import { UserContext } from '../user/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const Navigation = () => {
    // const isLoggedIn = true;
    const { isLoggedIn } = useContext(UserContext);
    const { user } = useContext(UserContext);
    console.log("Login: " + isLoggedIn);
    console.log("User: " + JSON.stringify(user));

    return (
        <NavigationContainer>
            {
                isLoggedIn == true ?
                    <ProductNavigation  /> :
                    <UserNavigation />
            }
        </NavigationContainer>
    )
}

