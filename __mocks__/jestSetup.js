import React from 'react';
import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.useFakeTimers();

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.call = () => { };

  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  useNavigationState: () => jest.fn(),
  useTheme: () => ({
    dark: true,
    colors: {
      primary: '#E75839',
      background: '#323337',
      dim: 'rgba(50, 51, 55, .85)',
      card: '#404146',
      text: '#f5f5f5',
      mutedText: '#757B81',
      lighterText: '#8E8E8E',
      border: 'gold',
      notification: '#E75839',
    }
  })
}));

jest.mock('react-native-safe-area-context', () => ({
  ...jest.requireActual('react-native-safe-area-context'),
  useSafeAreaInsets: () => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })
}));

jest.mock('react-redux', () => (
  {
    connect: (mapStateToProps) => (Component) => {
      const initState = {
        recipes: {
          searchRecipes: [],
          categoryRecipes: []
        },
        favorites: [],
        cart: {},
        recipe: {
          cart: {},
          favorites: {},
          searchRecipes: {},
          categoryRecipes: {},
        },
      };

      const extendedProps = mapStateToProps(initState);
      const Wrapper = (props) => {
        return <Component {...extendedProps} {...props} />
      }

      return Wrapper;
    },
  }
));
