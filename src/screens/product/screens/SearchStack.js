import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Search } from './Search';
import { Detail } from './Detail';

const Stack = createStackNavigator();

export const SearchStack = (props) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
    )
}