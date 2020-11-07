import React from 'react';
import { useTheme } from '@react-navigation/native';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { wp } from '../../utils';
import { Font } from '../../constants/Design';

function Recipe({ id, image, title, ...props }) {
  const { colors } = useTheme();

  return (
    <View style={props.style}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={{
          backgroundColor: colors.card,
          flex: 1,
          padding: 8,
          borderRadius: 8,
          paddingBottom: 16
        }}>
          <Image source={{ uri: image }} style={{
            width: '100%',
            aspectRatio: 1,
            marginBottom: 10,
          }} />

          <Text numberOfLines={props.numberOfLines} style={{
            fontSize: props.fontSize,
            lineHeight: props.fontSize * 1.25,
            color: colors.text,
            fontFamily: Font.regular
          }}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

Recipe.defaultProps = {
  onPress: () => null,
  numberOfLines: 2,
  fontSize: wp(16),
}

export default Recipe;