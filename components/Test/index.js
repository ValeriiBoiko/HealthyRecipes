import React, { useRef } from 'react';
import Animated, { block, Clock, cond, Easing, eq, event, Extrapolate, interpolate, set, startClock, stopClock, timing, Value } from "react-native-reanimated";
import { PanGestureHandler, State, TapGestureHandler } from "react-native-gesture-handler";
import { StyleSheet, Text, View } from 'react-native';

// const { Value, event, Clock, Easing, timing, block, stopClock } = Animated;

export default function Example(props) {
  const gestureState = useRef(new Value(-1)).current;
  const clock = useRef(new Clock()).current;

  const onGestureEvent = event([{
    nativeEvent: {
      state: gestureState
    }
  }]);

  function runAnimationTimer(clock, gestureState) {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: 300,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease),
    };

    return block([
      cond(
        eq(gestureState, State.BEGAN),
        [
          set(state.finished, 0),
          set(state.time, 0),
          set(state.frameTime, 0),

          cond(
            eq(config.toValue, 1),
            [
              stopClock(clock),
              set(config.toValue, 0),
            ],
            [
              stopClock(clock),
              set(config.toValue, 1),
            ]
          ),

          startClock(clock)
        ]
      ),
      timing(clock, state, config),
      cond(state.finished, stopClock(clock)),
      interpolate(state.position, {
        inputRange: [0, 1],
        outputRange: [100, 175],
        extrapolate: Extrapolate.CLAMP,
      }),
    ]);
  };


  // const height = runAnimationTimer(clock, gestureState);

  const scrollY = useRef(new Value(0)).current;
  const avatarSize = Animated.interpolate(scrollY, {
    inputRange: [0, 200],
    outputRange: [100, 50],
    extrapolate: Extrapolate.CLAMP
  })

  const headerSize = Animated.interpolate(scrollY, {
    inputRange: [0, 200],
    outputRange: [275, 75],
    extrapolate: Extrapolate.CLAMP
  })

  const nameOpacity = Animated.interpolate(scrollY, {
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  })

  const userInfo = Animated.interpolate(scrollY, {
    inputRange: [0, 200],
    outputRange: [135, 50],
    extrapolate: Extrapolate.CLAMP
  })

  return (
    <View style={styles.container}>

      <Animated.View style={[
        styles.header,
        { height: headerSize }
      ]}>
        <Animated.View style={{
          alignItems: 'center',
          width: '100%',
          height: userInfo
        }}>
          <Animated.View style={[
            styles.avatar,
            {
              width: avatarSize,
              height: avatarSize,
            }
          ]} />
          <Animated.Text style={[
            styles.name,
            { opacity: nameOpacity }
          ]}>Random Name</Animated.Text>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView style={{

        marginTop: 75,
      }}
        contentContainerStyle={{ paddingTop: 200, }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onScroll={event([
          {
            nativeEvent: { contentOffset: { y: scrollY } }
          }
        ])}>

        <View style={{
          height: 300,
          backgroundColor: 'red'
        }} />

        <View style={{
          height: 300,
          backgroundColor: 'gold'
        }} />

        <View style={{
          height: 300,
          backgroundColor: 'pink'
        }} />

        <View style={{
          height: 300,
          backgroundColor: 'cyan'
        }} />

        <View style={{
          height: 300,
          backgroundColor: 'brown'
        }} />
      </Animated.ScrollView>


    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#f1d4d4',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    overflow: 'hidden'
  },
  scrollHeader: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16.00,
    height: 40,
    elevation: 24,
    backgroundColor: '#f2f1f6',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  avatar: {
    backgroundColor: '#f2f1f6',
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 7,
    borderColor: '#1b1717'
  },
  name: {
    fontSize: 24,
    fontWeight: '800'
  },
  body: {
    backgroundColor: '#f2f1f6',
    height: 1200,
  }
});