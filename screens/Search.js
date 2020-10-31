import React from 'react';
import { Text, View } from 'react-native';
import Icon from '../components/Icon';
import { Colors } from '../constants/Design';

function Search(props) {
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{
        color: Colors.text
      }}>Search</Text>
      <Icon name={'search'} color={Colors.text} size={32} />
    </View>
  )
}

export default Search;