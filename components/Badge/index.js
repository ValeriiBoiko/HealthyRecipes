import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '../Icon';
import { wp } from '../../utils';
import { Font } from '../../constants/Design';

function Badge({ label, icon, isActive, ...props }) {
  const { colors } = useTheme();
  const animated = useRef(new Animated.Value(0)).current;

  function runAnimation(targetValue) {
    Animated.timing(
      animated,
      {
        useNativeDriver: true,
        toValue: targetValue,
        easing: Easing.ease,
        duration: 200,
      }
    ).start();
  }

  function onPress() {
    if (props.onPress) {
      props.onPress(label);
    }
  }

  useEffect(() => {
    if (icon) {
      runAnimation(isActive ? 1 : 0);
    }
  }, [isActive, icon])

  const iconRotation = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  })

  const renderIcon = icon && (
    <Animated.View style={{
      marginLeft: wp(8),
      transform: [
        { rotate: iconRotation }
      ]
    }}>
      <Icon name={icon} size={wp(16)} color={isActive ? '#f2f1f6' : colors.secondary} />
    </Animated.View>
  )

  return (

    <Pressable onPress={onPress}>
      <View {...props} style={[styles.badge, {
        borderColor: isActive ? colors.primary : colors.secondary,
        backgroundColor: isActive ? colors.primary : 'transparent',
      }, props.style]}>
        <Text style={[styles.label, {
          color: isActive ? '#f2f1f6' : colors.text,
        }]}>{label}</Text>

        {renderIcon}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: wp(35),
    paddingHorizontal: wp(12),
    height: wp(35),
    alignItems: 'center',
  },
  label: {
    fontSize: wp(14),
    lineHeight: wp(18),
    fontFamily: Font.regular,
  }
})

Badge.defaultProps = {
  label: '',
  icon: null,
}

export default Badge;