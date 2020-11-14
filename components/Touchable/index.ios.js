import React from 'react';
import { TouchableOpacity } from 'react-native';

function Touchable(props) {
  return (
    <TouchableOpacity {...props}>
      {props.children}
    </TouchableOpacity>
  )
}

Touchable.defaultProps = {
  activeOpacity: .7,
}

export default Touchable;