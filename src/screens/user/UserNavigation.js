import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './screens/Login';
import { Register } from './screens/Register';
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
        </Stack.Navigator>
    )
}


