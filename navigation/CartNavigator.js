import React from 'react';
import Cart from '../screens/Cart';
import Recipe from '../screens/Recipe';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

const Stack = createNativeStackNavigator();

function CartNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Cart'} component={Cart} />
      <Stack.Screen name={'Recipe'} component={Recipe} />
    </Stack.Navigator>
  )
}

export default CartNavigator;