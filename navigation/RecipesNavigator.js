import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Recipe from '../screens/Recipe';
import Recipes from '../screens/Recipes';
import RecipesCategories from '../screens/RecipesCategories';

const Stack = createNativeStackNavigator();

function RecipesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'RecipesCategories'} component={RecipesCategories} />
      <Stack.Screen name={'Recipes'} component={Recipes} />
      <Stack.Screen name={'Recipe'} component={Recipe} />
    </Stack.Navigator >
  )
}

export default RecipesNavigator;