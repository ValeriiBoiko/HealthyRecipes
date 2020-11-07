import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import Recipe from '../components/Recipe';
import { wp } from '../utils';

function Favorites(props) {
  const recipes = props.recipes.map((recipe) => (
    <Recipe key={recipe.id} style={styles.recipe} {...recipe} onPress={() => {
      props.navigation.navigate('Recipe', { recipeId: recipe.id })
    }} />
  ));

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.containerStyle}>
        {recipes}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: wp(16)
  },
  containerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  recipe: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: '50%',
    padding: wp(4),
  }
});

const mapStateToProps = (state) => ({
  recipes: state.favorites,
});

export default connect(mapStateToProps)(Favorites);