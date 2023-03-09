import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { Profile } from './Profile';
import { EditProfile } from './EditProfile';
import { CartHistory } from './CartHistory';
import { ManageStack } from './ManageStack';
import { ManageHistory } from './ManageHistory';
import { Login } from '../../user/screens/Login';


const Stack = createStackNavigator();

export const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="CartHistory" component={CartHistory} />
            <Stack.Screen name="ManageStack" component={ManageStack} />
            <Stack.Screen name="ManageHistory" component={ManageHistory} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}