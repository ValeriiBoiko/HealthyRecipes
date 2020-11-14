import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TextInput as RNInput } from 'react-native';
import { Font } from '../../constants/Design';
import { wp } from '../../utils';

function TextInput(props) {
  const { colors } = useTheme();

  return (
    <RNInput
      {...props}
      placeholderTextColor={colors.secondary}
      style={[
        props.style,
        {
          paddingHorizontal: wp(20),
          height: wp(46),
          fontSize: wp(14),
          lineHeight: wp(18),
          fontFamily: Font.regular,
          backgroundColor: colors.card,
          borderRadius: wp(8),
        }
      ]}
    />
  )
}

export default TextInput;