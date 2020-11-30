import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import Loader from '../components/Loader/Loader';
import Recipe from '../components/Recipe';
import NavigationHeader from '../components/NavigationHeader';
import EmptyListMessage from '../components/EmptyListMessage';
import {setRecipes, addRecipes} from '../middleware';
import {wp} from '../utils';
import {State} from '../constants/Action';

function Recipes({recipes, navigation, ...props}) {
  const {colors} = useTheme();
  const params = props.route.params;
  const [loaderVisible, setLoaderFlag] = useState(false);
  const [showScrollLoader, setShowScrollLoader] = useState(true);
  let recipesData = recipes[params.type].result;
  const recipeState = recipes[params.type].state;

  if (recipesData.length % 2 === 1) {
    recipesData.push({
      isPlaceholder: true,
    });
  }

  const renderRecipes = ({item}) =>
    !item.isPlaceholder ? (
      <Recipe
        {...item}
        style={styles.recipe}
        onPress={() =>
          navigation.navigate('Recipe', {recipeId: item.id, type: params.type})
        }
      />
    ) : (
      <View style={{flex: 1}} />
    );

  const onEndReached = () => {
    props.addRecipes(
      {
        number: 12,
        offset: recipesData.length,
        ...params.config,
      },
      params.type,
    );
  };

  useEffect(() => {
    setLoaderFlag(true);
    props.setRecipes(
      {
        number: 12,
        offset: 0,
        ...params.config,
      },
      params.type,
    );
  }, []);

  useEffect(() => {
    if (recipeState !== State.IN_PROGRESS && loaderVisible) {
      setLoaderFlag(false);
    } else if (recipeState === State.FAILED && recipesData.length) {
      setShowScrollLoader(false);
    } else if (!recipesData.length) {
      setShowScrollLoader(false);
    }
  }, [recipeState]);

  if (loaderVisible) {
    return <Loader label={'Recipes made with love...'} />;
  }

  return (
    <View style={{flexDirection: 'column-reverse', flex: 1}}>
      <FlatList
        contentContainerStyle={[
          styles.list,
          {flex: !recipesData.length ? 1 : null},
        ]}
        data={recipesData}
        renderItem={renderRecipes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.75}
        ListEmptyComponent={
          <EmptyListMessage
            style={{
              flex: 1,
            }}
            iconName={'food'}
            message={'No recipes found :( Try to change your search params'}
          />
        }
        ListFooterComponent={
          showScrollLoader ? (
            <View style={styles.loaderContainer}>
              <Loader
                isCompact={true}
                label={'Loading ...'}
                style={[styles.loader, {backgroundColor: colors.card}]}
                labelStyles={{width: 'auto', paddingHorizontal: wp(12)}}
              />
            </View>
          ) : (
            <View />
          )
        }
      />

      <NavigationHeader title={params.title} />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: wp(10),
    paddingVertical: wp(20),
  },
  recipe: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingBottom: wp(10),
  },
  loaderContainer: {
    height: wp(50),
    width: '100%',
    marginTop: wp(16),
  },
  loader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  recipes: state.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  setRecipes: (config, recipesType) =>
    dispatch(setRecipes(config, recipesType)),
  addRecipes: (config, recipesType) =>
    dispatch(addRecipes(config, recipesType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
