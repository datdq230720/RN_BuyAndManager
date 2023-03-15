import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './screens/Login';
import { Register } from './screens/Register';
import  LoginFB  from './screens/LoginFB';
import  LoginGG  from './screens/LoginGG';
import { Detail } from '../product/screens/Detail';
import { Cart } from '../product/screens/Cart';
import { Profile } from '../product/screens/Profile';

const Stack = createStackNavigator();

export const UserNavigation = (props) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="LoginFB" component={LoginFB} />
            <Stack.Screen name="LoginGG" component={LoginGG} />
        </Stack.Navigator>
    )
}


