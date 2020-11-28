import React, { useMemo, useRef } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import List from '../List';
import { Font } from '../../constants/Design';
import { wp } from '../../utils';
import { PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { abs, add, and, block, call, Clock, cond, divide, Easing, eq, event, greaterOrEq, greaterThan, interpolate, lessOrEq, neq, set, startClock, stopClock, timing, Value } from 'react-native-reanimated';

function CartItem({ id, image, title, ingredients, ...props }) {
  const { colors } = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors])
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();

  const gestureState = useRef(new Value(0)).current;
  const dragX = useRef(new Value(0)).current;
  const offsetX = useRef(new Value(0)).current;
  const clock = useRef(new Clock()).current;

  function onTap(e) {
    if (e.nativeEvent.state === State.ACTIVE) {
      navigation.navigate('Recipe', {
        recipeId: id,
        type: 'cart'
      })
    }
  }

  const onRecipeDrag = event([
    {
      nativeEvent: {
        state: gestureState,
        translationX: dragX,
      }
    }
  ])

  function positionRecipe(clock, gestureState) {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: 200,
      toValue: new Value(0),
      easing: Easing.linear,
    };

    return (
      block([
        cond(
          eq(gestureState, State.ACTIVE),
          [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.frameTime, 0),
            set(state.position, divide(add(offsetX, dragX), screenWidth)),
          ],
          cond(
            eq(gestureState, State.END),
            [
              cond(
                and(greaterOrEq(state.position, .2)),
                [
                  set(config.toValue, 1),
                ],
                cond(
                  and(lessOrEq(state.position, -.2)),
                  set(config.toValue, -1),
                  [
                    set(config.toValue, 0),
                  ]
                )
              ),
              startClock(clock),
            ]
          )
        ),
        timing(clock, state, config),
        cond(greaterOrEq(abs(state.position), .9), call([], props.onDelete)),
        cond(state.finished, stopClock(clock)),
        interpolate(state.position, {
          inputRange: [0, 1],
          outputRange: [0, screenWidth]
        })
      ])
    )
  }

  const recipePosition = positionRecipe(clock, gestureState);

  return (
    <PanGestureHandler
      onGestureEvent={onRecipeDrag}
      onHandlerStateChange={onRecipeDrag}
      minDist={20} >
      <Animated.View style={[
        styles.recipe,
        {
          transform: [
            { translateX: recipePosition }
          ]
        }
      ]}>
        <TapGestureHandler onHandlerStateChange={onTap}>
          <View><View style={styles.recipeHeader}>
            <Image source={{ uri: image }} style={styles.recipeImage} />
            <Text style={styles.recipeTitle}>{title}</Text>
          </View>

            <List
              items={ingredients.map(item => item.title)}
              type={'numeric'}
              itemStyle={{ marginBottom: 0 }}
              delimiter={true}
            /></View>
        </TapGestureHandler>
      </Animated.View >
    </PanGestureHandler >
  )
}

const getStyles = (colors) => StyleSheet.create({
  recipe: {
    backgroundColor: colors.card,
    marginTop: wp(16),
    paddingVertical: wp(12),
    paddingHorizontal: wp(12),
    borderRadius: wp(8),
  },
  recipeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeTitle: {
    flex: 1,
    fontSize: wp(16),
    lineHeight: wp(20),
    fontFamily: Font.semiBold,
    paddingLeft: wp(12),
    color: colors.text
  },
  recipeImage: {
    width: wp(50),
    aspectRatio: 1,
    borderRadius: wp(50),
  }
})

export default CartItem;
