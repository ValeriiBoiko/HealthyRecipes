import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Font } from '../constants/Design';
import { wp } from '../utils';

function RecipesCategories(props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => getStyles(colors), [colors])
  const categories = [
    {
      title: 'All Recipes',
      image: require('../assets/images/all-recipes.jpg'),
      diet: null,
    },
    {
      title: 'Vegan',
      image: require('../assets/images/vegan.jpg'),
      diet: 'vegan',
    },
    {
      title: 'Vegetarian',
      image: require('../assets/images/vegetables.jpg'),
      diet: 'vegetarian',
    },
    {
      title: 'Gluten Free',
      image: require('../assets/images/gluten-free.jpg'),
      diet: 'gluten free',
    },
    {
      title: 'Ketogenic',
      image: require('../assets/images/ketogenic.jpg'),
      diet: 'ketogenic',
    },
    {
      title: 'Paleo',
      image: require('../assets/images/paleo.jpg'),
      diet: 'paleo',
    },
    {
      title: 'Whole30',
      image: require('../assets/images/whole30.jpg'),
      diet: 'whole30',
    },
    {
      title: 'Primal',
      image: require('../assets/images/primal.jpg'),
      diet: 'primal',
    }
  ];

  const renderCategories = categories.map(cat => (
    <Pressable key={cat.title} onPress={() => {
      props.navigation.navigate('Recipes', {
        config: {
          diet: cat.diet,
        },
        title: cat.title,
        type: 'categoryRecipes'
      })
    }}>
      <View style={styles.category}>
        <Image source={cat.image} style={styles.categoryImage} />
        <View style={[styles.categoryCaption, {
          backgroundColor: colors.backgroundWithOpacity(0.85),
        }]}>
          <Text style={styles.primaryText}>Food book</Text>
          <Text style={styles.categoryTitle}>{cat.title}</Text>
        </View>
      </View>
    </Pressable>
  ))

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{
        paddingHorizontal: wp(20),
        paddingTop: insets.top > 0 ? 0 : wp(20),
      }}>
        <Text style={styles.screenTitle}>Recipe categories</Text>
        <Text style={styles.primaryText}>
          Browse through our various recipes
        </Text>

        {renderCategories}
      </ScrollView>
    </SafeAreaView>
  )
}

const getStyles = (colors) => StyleSheet.create({
  screenTitle: {
    fontFamily: Font.bold,
    fontSize: wp(24),
    lineHeight: wp(30),
    color: colors.text,
  },
  primaryText: {
    fontFamily: Font.bold,
    fontSize: wp(16),
    lineHeight: wp(20),
    color: colors.primary,
  },
  category: {
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 16,
  },
  categoryImage: {
    aspectRatio: 1,
    width: '100%',
    height: null
  },
  categoryCaption: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: wp(16),
    paddingVertical: 10,
    width: '100%'
  },
  categoryTitle: {
    fontFamily: Font.bold,
    fontSize: wp(21),
    lineHeight: wp(28),
    color: colors.text
  },
});

export default RecipesCategories;