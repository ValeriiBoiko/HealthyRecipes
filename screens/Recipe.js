import { useTheme } from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from '../components/Icon';
import IngredientList from '../components/IngredientList';
import List from '../components/List';
import { Font } from '../constants/Design';
import { addToFavorite, removeFromFavorite, setRecipe } from '../middleware';
import { wp } from '../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Loader from '../components/Loader/Loader';

function Recipe({ favorites, ...props }) {
  const params = props.route.params || {};
  const recipe = props.recipe[params.type];
  const { id, title, image, servings, readyInMinutes, sourceName, ingredients, aggregateLikes, instructions } = recipe;
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const styles = useMemo(() => getStyles(colors, insets), [colors]);
  const isSaved = (favorites.findIndex((item) => item.id === id) > -1);

  const recipeInfo = [
    { title: "Serves", value: servings + ' serv' },
    { title: "Time", value: readyInMinutes + " min" },
    { title: "Likes", value: aggregateLikes }
  ];

  function onSave() {
    if (isSaved) {
      props.removeFromFavorite(id);
    } else {
      props.addToFavorite(recipe);
    }
  }

  useEffect(() => {
    props.setRecipe(params.recipeId, params.type);
  }, []);

  if (recipe.state !== 'READY' || id !== params.recipeId) {
    return <Loader label={'Recipe made with love...'} />
  }

  const infoItems = recipeInfo.map((item, index) => (
    <View key={index}>
      <Text style={styles.infoItemTitle}>{item.title}</Text>
      <Text style={styles.infoItemValue}>{item.value}</Text>
    </View>
  ));

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: wp(20) }}
      showsVerticalScrollIndicator={false}>
      <View>
        <Image source={{ uri: image }} style={styles.image} />

        <Pressable style={styles.saveButton} onPress={onSave}>
          <Icon name={isSaved ? 'heart' : 'heart-empty'} color={colors.error} size={wp(24)} />
          <View style={styles.saveLabelWrapper}>
            <Text style={styles.saveLabel}>{isSaved ? 'Saved' : 'Save'}</Text>
          </View>
        </Pressable>

        <View style={[styles.card, { marginTop: wp(-40) }]}>
          <View style={styles.authorBar}>
            <Icon name={'user'} size={wp(20)} color={colors.secondary} />
            <Text numberOfLines={1} style={styles.authorName}>
              Recipe By: {sourceName}
            </Text>
          </View>

          <Text style={styles.recipeTitle}>{title}</Text>

          <View style={styles.recipeInfo}>
            {infoItems}
          </View>
        </View>
      </View>

      <View style={[styles.sectionCard, styles.card]}>
        <Text style={styles.sectionTitle}>Ingredients required for recipe</Text>
        <Text style={styles.sectionSubTitle}>Total ingredient count : {ingredients.length}</Text>

        <IngredientList recipe={recipe} ingredients={ingredients} type={props.route.params.type} />
      </View>

      <View style={[styles.sectionCard, styles.card]}>
        <Text style={styles.sectionTitle}>Description of Preparation</Text>
        <Text style={styles.sectionSubTitle}>No of steps is  : {instructions.length}</Text>

        <List
          items={instructions}
          type={'numeric'}
          itemStyle={{ marginBottom: 0 }}
          delimiter={true}
        />
      </View>
    </ScrollView>
  )
}

const getStyles = (colors, insets) => StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 636 / 393,
  },
  saveButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(12),
    width: wp(100),
    paddingVertical: 8,
    borderRadius: 8,
    top: insets.top || wp(20),
    right: wp(20),
    backgroundColor: colors.cardWithOpacity(.8),
  },
  saveLabelWrapper: {
    marginLeft: 8,
    alignItems: 'center',
    flex: 1,
  },
  saveLabel: {
    fontSize: wp(14),
    lineHeight: wp(18),
    color: colors.text,
    fontFamily: Font.bold,
  },
  card: {
    marginHorizontal: wp(20),
    borderRadius: 8,
    backgroundColor: colors.card,
    overflow: 'hidden',
  },
  authorBar: {
    backgroundColor: colors.card,
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: wp(20),
    height: wp(40),
    alignItems: 'center',
    flexDirection: 'row',
  },
  authorName: {
    marginLeft: 8,
    color: colors.secondary,
    fontSize: wp(13),
  },
  recipeTitle: {
    fontFamily: Font.bold,
    fontSize: wp(21),
    lineHeight: wp(28),
    paddingHorizontal: wp(20),
    paddingVertical: 8,
    color: colors.text
  },
  recipeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
  },
  infoItemTitle: {
    marginTop: 8,
    fontSize: wp(16),
    lineHeight: wp(20),
    fontFamily: Font.bold,
    color: colors.secondary,
    textAlign: 'center',
  },
  infoItemValue: {
    paddingTop: 12,
    paddingBottom: 14,
    fontSize: wp(16),
    lineHeight: wp(20),
    textAlign: 'center',
    color: colors.accent,
    fontFamily: Font.bold,
  },
  sectionCard: {
    marginTop: wp(20),
    paddingVertical: wp(20),
    paddingHorizontal: wp(20)
  },
  sectionTitle: {
    marginBottom: 8,
    fontSize: wp(20),
    lineHeight: wp(24),
    color: colors.text,
    fontFamily: Font.bold,
  },
  sectionSubTitle: {
    marginBottom: 12,
    fontSize: wp(16),
    lineHeight: wp(20),
    color: colors.accent,
    fontFamily: Font.bold,
  }
});

const mapStateToProps = (state) => ({
  recipe: state.recipe,
  favorites: state.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  setRecipe: (id, type) => dispatch(setRecipe(id, type)),
  addToFavorite: (recipe) => dispatch(addToFavorite(recipe)),
  removeFromFavorite: (id) => dispatch(removeFromFavorite(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);