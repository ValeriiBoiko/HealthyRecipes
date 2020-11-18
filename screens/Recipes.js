import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import Loader from '../components/Loader/Loader';
import Recipe from '../components/Recipe';
import NavigationHeader from '../components/NavigationHeader';
import { setRecipes, addRecipes } from '../middleware';
import { wp } from '../utils';

function Recipes({ recipes, navigation, ...props }) {

  const { colors } = useTheme();
  const params = props.route.params;
  const [loaderVisible, setLoaderFlag] = useState(false);
  const recipesData = recipes[params.type];

  const renderRecipes = ({ item }) => (
    <Recipe
      {...item}
      style={styles.recipe}
      onPress={() => navigation.navigate('Recipe', { recipeId: item.id })}
    />
  );

  useEffect(() => {
    setLoaderFlag(true);
    props.setRecipes({
      number: 12,
      offset: 0,
      ...params.config,
    }, params.type);
  }, [])

  useEffect(() => {
    if (recipesData.length && loaderVisible) {
      setLoaderFlag(false);
    }
  }, [recipesData])

  if (loaderVisible) {
    return <Loader label={'Recipes made with love...'} />
  }

  return (
    <View>
      <NavigationHeader title={params.title} />

      <FlatList
        style={styles.list}
        data={recipesData}
        renderItem={renderRecipes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        onEndReached={() => console.log(1)}
        onEndReachedThreshold={.75}
        ListFooterComponent={(
          <View style={styles.loaderContainer}>
            <Loader isCompact={true}
              label={'Loading ...'}
              style={[styles.loader, { backgroundColor: colors.card }]}
              labelStyles={{ width: 'auto', paddingHorizontal: wp(12) }} />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: wp(10),
    marginVertical: wp(20),
  },
  recipe: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingBottom: wp(10),
  },
  loaderContainer: {
    height: wp(50),
    width: '100%',
    marginTop: wp(16)
  },
  loader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => ({
  recipes: state.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  setRecipes: (config, recipesType) => dispatch(setRecipes(config, recipesType)),
  addRecipes: (config, recipesType) => dispatch(addRecipes(config, recipesType)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);