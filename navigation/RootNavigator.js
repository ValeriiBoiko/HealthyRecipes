import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Recipes from '../screens/Recipes';
import Search from '../screens/Search';
import Favorites from '../screens/Favorites';
import Cart from '../screens/Cart';
import { Colors } from '../constants/Design';
import Icon from '../components/Icon';
import RecipesNavigator from './RecipesNavigator';
import { StatusBar } from 'react-native';

const Tab = createBottomTabNavigator();

StatusBar.setHidden(true);

function RootNavigator(props) {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...Colors
    }
  }

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';

            switch (route.name) {
              case 'RecipesCategories':
                iconName = 'food';
                break;
              case 'Search':
                iconName = 'search';
                break;
              case 'Favorites':
                iconName = 'heart';
                break;
              case 'Cart':
                iconName = 'basket';
                break;
            }

            return <Icon name={iconName} color={color} size={18} />
          }
        })}
        tabBarOptions={{
          tabStyle: {
            height: 50,
            paddingBottom: 8,
            justifyContent: 'center'
          },
          style: {
            backgroundColor: Colors.background,
            borderTopColor: Colors.border,
            borderTopWidth: 1,
          },
        }}
      >
        <Tab.Screen name={'RecipesCategories'} component={RecipesNavigator} />
        <Tab.Screen name={'Search'} component={Search} />
        <Tab.Screen name={'Favorites'} component={Favorites} />
        <Tab.Screen name={'Cart'} component={Cart} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator;