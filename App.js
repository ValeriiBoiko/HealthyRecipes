import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

function App(props) {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  )
}

const mapStateToProps = (state) => ({
  favorites: state.favorites
});

export default connect(mapStateToProps)(App);