import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { ManageProduct } from './ManageProduct';
import { UpdateProduct } from './UpdateProduct';
import { CreateProduct } from './CreateProduct';


const Stack = createStackNavigator();

export const ManageStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ManageProduct" component={ManageProduct} />
            <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
            <Stack.Screen name="CreateProduct" component={CreateProduct} />
        </Stack.Navigator>
    )
}