import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../screens/Search';
import Favorites from '../screens/Favorites';
import Cart from '../screens/Cart';
import { DarkTheme, Font, LightTheme } from '../constants/Design';
import Icon from '../components/Icon';
import RecipesNavigator from './RecipesNavigator';
import { StatusBar } from 'react-native';
import { wp } from '../utils';

const Tab = createBottomTabNavigator();

StatusBar.setHidden(true);

function RootNavigator(props) {
  const theme = LightTheme;
  // const theme = DarkTheme;

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';

            switch (route.name) {
              case 'Recipes':
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

            return <Icon name={iconName} color={color} size={wp(18)} />
          }
        })}
        tabBarOptions={{
          labelStyle: {
            fontSize: wp(11),
            fontFamily: Font.regular
          },
          tabStyle: {
            paddingVertical: wp(4)
          },
          style: {
            height: wp(50),
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.border,
            borderTopWidth: 1,
          },
        }}
      >
        <Tab.Screen name={'Recipes'} component={RecipesNavigator} />
        <Tab.Screen name={'Search'} component={Search} />
        <Tab.Screen name={'Favorites'} component={Favorites} />
        <Tab.Screen name={'Cart'} component={Cart} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator;