import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';

function Touchable({ style, rippleColor, ...props }) {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(rippleColor, false)}
      {...props}>
      <View style={style}>
        {props.children}
      </View>
    </TouchableNativeFeedback>
  )
}

Touchable.defaultProps = {
  rippleColor: '#fff',
}

export default Touchable;