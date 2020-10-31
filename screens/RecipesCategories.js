import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Font } from '../constants/Design';
import { commonStyles } from '../style';

function RecipesCategories(props) {
  return (
    <SafeAreaView>
      <ScrollView style={{
        paddingHorizontal: 16
      }}>
        <Text style={commonStyles.h1}>Recipe categories</Text>
        <Text style={commonStyles.primaryText}>
          Browse through our various recipes
        </Text>

        <Pressable onPress={() => { props.navigation.navigate('Recipes') }}>
          <View style={styles.category}>
            <Image source={require('../assets/images/all-recipes.jpg')} style={styles.categoryImage} />
            <View style={styles.categoryCaption}>
              <Text style={{
                ...commonStyles.primaryText,
                fontFamily: Font.bold,
              }}>Food book</Text>
              <Text style={commonStyles.h1}>All Recipes</Text>
            </View>
          </View>
        </Pressable>

        <View style={styles.category}>
          <Image source={require('../assets/images/vegan.jpg')} style={styles.categoryImage} />
          <View style={styles.categoryCaption}>
            <Text style={{
              ...commonStyles.primaryText,
              fontFamily: Font.bold,
            }}>Food book</Text>
            <Text style={commonStyles.h1}>Vegetarian Food</Text>
          </View>
        </View>

        <View style={styles.category}>
          <Image source={require('../assets/images/vegetables.jpg')} style={styles.categoryImage} />
          <View style={styles.categoryCaption}>
            <Text style={{
              ...commonStyles.primaryText,
              fontFamily: Font.bold,
            }}>Food book</Text>
            <Text style={commonStyles.h1}>Vegan Diet</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,.85)',
    width: '100%'
  }
});

export default RecipesCategories;