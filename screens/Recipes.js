import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import Recipe from '../components/Recipe';
import { updateRecipes } from '../middleware';
import { wp } from '../utils';

function Recipes(props) {
  const recipes = props.recipes.map((recipe) => (
    <Recipe onPress={() => {
      props.navigation.navigate(
        'Recipe',
        {
          recipeId: recipe.id
        }
      )
    }} key={recipe.id} style={styles.recipe} {...recipe} />
  ));

  useEffect(() => {
    if (!recipes.length) {
      console.log(1);
      props.updateRecipes(5, 0);
    }
  }, [])

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
  recipes: state.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  updateRecipes: (number, offset) => dispatch(updateRecipes(number, offset)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);