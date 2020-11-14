import { useTheme } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { wp } from '../../utils';
import Icon from '../Icon';

function Loader({ isVisible, color, label, spinnerColor, labelStyles, isCompact, ...props }) {
  const { colors } = useTheme();
  const styles = useMemo(() => getStyles(colors));
  const animated = useRef(new Animated.Value(0)).current;

  function runReverse() {
    Animated.timing(
      animated,
      {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
      }
    ).start(runDirect)
  }

  function runDirect() {
    Animated.timing(
      animated,
      {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.elastic(3),
      }
    ).start(runReverse)
  }

  useEffect(() => {
    runDirect();
  }, [])

  const scale = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [.25, 1]
  })

  const width = isCompact ? 20 : 70;
  const height = isCompact ? 22 : 77;

  return (
    <View {...props} style={[styles.container, props.style]}>
      <View style={{
        width: width,
        height: height,
      }}>
        <Animated.View style={[
          {
            position: 'absolute',
            left: 0,
            top: 0,
            transform: [
              { scale: scale }
            ]
          }
        ]}>
          <Icon name={'heart'} size={width} color={colors.accent} />
        </Animated.View>
      </View>
      <Text style={[styles.label, labelStyles]}>{label}</Text>
    </View>
  )
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background
  },
  loader: {
    marginBottom: 8,
  },
  label: {
    color: colors.text,
    fontSize: wp(16),
    width: '50%',
    lineHeight: wp(24),
    textAlign: 'center'
  }
})

Loader.defaultProps = {
  color: '#fff',
  label: '',
  spinnerColor: '#fff',
  labelStyles: {}
}

export default Loader