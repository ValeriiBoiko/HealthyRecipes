import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Touchable from '../../components/Touchable';
import { Font } from '../../constants/Design';
import { wp } from '../../utils';
import Icon from '../Icon';

function NavigationHeader(props) {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const showBackButton = navigation.canGoBack();
  const { colors } = useTheme();

  return (
    <View style={[
      styles.header,
      {
        paddingTop: insets.top,
        height: wp(50) + insets.top,
        backgroundColor: colors.background,
      }
    ]}>
      {
        showBackButton && (
          <Touchable style={styles.backButton} onPress={navigation.goBack}>
            <Icon name={'left-open-big'} size={wp(20)} color={colors.primary} />
            <Text style={[styles.backButtonTitle, { color: colors.primary }]}>
              Back
            </Text>
          </Touchable>
        )
      }
      <Text style={[styles.routeName, {
        marginRight: showBackButton ? wp(55) : wp(20),
        color: colors.text,
      }]}>{props.title || route.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: wp(20),
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  backButton: {
    flexDirection: 'row',
    width: wp(75),
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingLeft: wp(20),
    marginLeft: wp(-20)
  },
  backButtonTitle: {
    marginLeft: wp(8),
    fontFamily: Font.bold,
    fontSize: wp(16),
    lineHeight: wp(21),
  },
  routeName: {
    flex: 1,
    fontFamily: Font.bold,
    fontSize: wp(18),
    lineHeight: wp(24),
    textAlign: 'center',
  }
});

export default NavigationHeader;