import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Font } from '../../constants/Design';
import { wp } from '../../utils';
import Icon from '../Icon';

function EmptyListMessage({ message, iconName, ...props }) {
  const { colors } = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors])
  const screenWidth = Dimensions.get('window').width;

  return (
    <View {...props} style={styles.emptyCartMessage}>
      {iconName && <Icon name={iconName} color={colors.border} size={screenWidth * .3} />}
      <View>
        <Text style={[
          styles.emptyCartMessageText,
          { marginTop: wp(20) }
        ]}>{message}</Text>
      </View>
    </View>
  )
}

const getStyles = (colors) => StyleSheet.create({
  emptyCartMessage: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartMessageText: {
    color: colors.secondary,
    fontFamily: Font.regular,
    fontSize: wp(18),
    lineHeight: wp(24),
    textAlign: 'center',
  }
})

export default EmptyListMessage;
