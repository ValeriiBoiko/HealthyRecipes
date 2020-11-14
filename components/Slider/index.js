import Animated, { Value, add, set, cond, call, eq, event, Extrapolate, greaterOrEq, interpolate, lessOrEq, sub } from 'react-native-reanimated';
import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

function Slider(props) {
  const styles = useMemo(() => getStyles(props));
  const [width, setWidth] = useState(0);
  const scale = props.max / width;

  const dragX = useRef(new Value(0)).current;
  const offsetX = useRef(new Value(0)).current;
  const gestureState = useRef(new Value(-1)).current;

  onTransXChange = (x) => {
    const value = Math.floor(x * scale);

    if (value >= props.min && value <= props.max) {
      if (value % props.precision === 0) {
        props.onChange(value);
      }
    }
  };

  const onGestureEvent = event([
    {
      nativeEvent: {
        translationX: dragX,
        state: gestureState,
      },
    },
  ]);

  const transX = cond(
    eq(gestureState, State.ACTIVE),
    [
      call([add(offsetX, dragX)], onTransXChange),
      add(offsetX, dragX)
    ],
    cond(
      greaterOrEq(add(offsetX, dragX), width),
      set(offsetX, width),
      cond(
        lessOrEq(add(offsetX, dragX), 0),
        set(offsetX, 0),
        set(offsetX, add(offsetX, dragX))
      )
    )
  );

  const interpolatedTransX = interpolate(transX, {
    inputRange: [0, width],
    outputRange: [0, width],
    extrapolate: Extrapolate.CLAMP
  })

  return (
    <View style={props.style}>
      <View style={styles.track} onLayout={({ nativeEvent }) => {
        dragX.setValue(props.initialValue / (props.max / nativeEvent.layout.width));
        props.onChange(props.initialValue);
        setWidth(nativeEvent.layout.width);
      }}>
        <View style={{
          ...styles.inactive,
          position: 'absolute',
        }} />
        <Animated.View style={{
          ...styles.active,
          right: sub(width, interpolatedTransX),
        }}>
        </Animated.View>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onGestureEvent}
        >
          <Animated.View style={[styles.thumbHitBox, {
            left: interpolatedTransX,
          }]}>
            <View style={styles.thumb} />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  )
}

const getStyles = (props) => StyleSheet.create({
  track: {
    backgroundColor: props.inactiveColor,
    height: props.trackHeight,
    borderRadius: props.trackHeight,
    marginLeft: props.thumbSize / 2,
    marginRight: props.thumbSize / 2,
  },
  thumbHitBox: {
    width: props.hitBoxSize,
    height: props.hitBoxSize,
    position: 'absolute',
    marginLeft: -props.hitBoxSize / 2,
    marginTop: -props.hitBoxSize / 2 + props.trackHeight / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumb: {
    backgroundColor: '#fff',
    width: props.thumbSize,
    borderRadius: props.thumbSize,
    height: props.thumbSize,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  active: {
    height: props.trackHeight,
    borderRadius: props.trackHeight,
    backgroundColor: props.activeColor,
    left: -props.thumbSize / 2,
    right: -props.thumbSize / 2,
    position: 'absolute',
  },
  inactive: {
    height: props.trackHeight,
    borderRadius: props.trackHeight,
    backgroundColor: props.inactiveColor,
    left: -props.thumbSize / 2,
    right: -props.thumbSize / 2,
  }
})

Slider.defaultProps = {
  trackHeight: 8,
  trackWidth: -1,
  thumbSize: 30,
  hitBoxSize: 50,
  inactiveColor: '#999',
  activeColor: '#000',
  min: 0,
  max: 100,
  precision: 1,
  initialValue: 0,
  onChange: () => null,
};

export default React.memo(Slider, (p, n) => {
  return JSON.stringify(p) == JSON.stringify(n);
});