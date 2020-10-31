import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Font } from '../constants/Design';
import { wp } from '../utils';

function RecipesCategories(props) {
  const { colors } = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors])

  return (
    <SafeAreaView>
      <ScrollView style={{ paddingHorizontal: wp(20) }}>
        <Text style={styles.screenTitle}>Recipe categories</Text>
        <Text style={styles.primaryText}>
          Browse through our various recipes
        </Text>

        <Pressable onPress={() => { props.navigation.navigate('Recipes') }}>
          <View style={styles.category}>
            <Image source={require('../assets/images/all-recipes.jpg')} style={styles.categoryImage} />
            <View style={[styles.categoryCaption, {
              backgroundColor: colors.backgroundWithOpacity(0.85),
            }]}>
              <Text style={styles.primaryText}>Food book</Text>
              <Text style={styles.categoryTitle}>All Recipes</Text>
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => { props.navigation.navigate('Recipes') }}>
          <View style={styles.category}>
            <Image source={require('../assets/images/vegan.jpg')} style={styles.categoryImage} />
            <View style={[styles.categoryCaption, {
              backgroundColor: colors.backgroundWithOpacity(0.85),
            }]}>
              <Text style={styles.primaryText}>Food book</Text>
              <Text style={styles.categoryTitle}>All Recipes</Text>
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => { props.navigation.navigate('Recipes') }}>
          <View style={styles.category}>
            <Image source={require('../assets/images/vegetables.jpg')} style={styles.categoryImage} />
            <View style={[styles.categoryCaption, {
              backgroundColor: colors.backgroundWithOpacity(0.85),
            }]}>
              <Text style={styles.primaryText}>Food book</Text>
              <Text style={styles.categoryTitle}>All Recipes</Text>
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

const getStyles = (colors) => StyleSheet.create({
  screenTitle: {
    fontFamily: Font.bold,
    fontSize: wp(24),
    lineHeight: wp(30),
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
  },
});

export default RecipesCategories;