import React from 'react';
import Recipe from '../screens/Recipe';
import Favorites from '../screens/Favorites';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

const Stack = createNativeStackNavigator();

function FavoritesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Favorites'} component={Favorites} />
      <Stack.Screen name={'Recipe'} component={Recipe} />
    </Stack.Navigator>
  )
}

export default FavoritesNavigator;