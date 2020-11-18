import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Recipe from '../screens/Recipe';
import Recipes from '../screens/Recipes';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator();

function SearchNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Search'} component={Search} />
      <Stack.Screen name={'Recipes'} component={Recipes} />
      <Stack.Screen name={'Recipe'} component={Recipe} />
    </Stack.Navigator >
  )
}

export default SearchNavigator;