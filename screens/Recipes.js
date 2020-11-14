import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import Loader from '../components/Loader/Loader';
import Recipe from '../components/Recipe';
import { updateRecipes } from '../middleware';
import { wp } from '../utils';

function Recipes(props) {
  // const offset = useRef
  const { colors } = useTheme();
  const renderRecipes = ({ item, index }) => (
    <Recipe onPress={() => {
      props.navigation.navigate('Recipe', { recipeId: item.id })
    }} key={item.id} style={[
      styles.recipe, {
        paddingRight: index % 2 === 0 ? wp(4) : 0,
        paddingLeft: index % 2 !== 0 ? wp(4) : 0,
      }
    ]} {...item} />
  );

  useEffect(() => {
    if (!props.recipes.length) {
      props.updateRecipes({
        number: 12,
        offset: 0,
        diet: 'Vegetarian',
      });
    }
  }, [])

  // useEffect(() => {
  //   console.log(props.recipes.length)
  // }, [props.recipes])

  if (!props.recipes.length) {
    return <Loader label={'Recipes made with love...'} />
  }



  return (
    <View>
      <FlatList
        style={styles.scrollView}
        data={props.recipes}
        renderItem={renderRecipes}
        numColumns={2}
        onEndReached={() => console.log(1)}
        onEndReachedThreshold={.75}
        ListFooterComponent={(
          <View style={{
            height: 50,
            width: '100%',
            backgroundColor: 'red',
            marginTop: wp(16)
          }}>

            <Loader isCompact={true} label={'Loading ...'} style={{
              backgroundColor: colors.card,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }} labelStyles={{
              width: 'auto',
              paddingHorizontal: wp(12)
            }} />

          </View>
        )}
      />

    </View>

  )
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: wp(20),
    marginVertical: wp(20),
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
    paddingHorizontal: wp(4),
    paddingBottom: wp(8),
  }
});

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  // recipes: [
  //   { id: 1 },
  //   { id: 2 },
  //   { id: 3 },
  //   { id: 4 },
  //   { id: 5 },
  //   { id: 6 },
  // {id: 7 },
  // {id: 8 },
  // {id: 9 },
  // {id: 10 },
  // {id: 11 },
  // {id: 12 },
  // {id: 13 },
  // {id: 14 },
  // {id: 15 },
  // {id: 16 },
  // {id: 17 }
  // ],
});

const mapDispatchToProps = (dispatch) => ({
  updateRecipes: (config) => dispatch(updateRecipes(config)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);