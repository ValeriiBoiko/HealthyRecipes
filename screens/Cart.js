import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import List from '../components/List';
import { Font } from '../constants/Design';
import { wp } from '../utils';

function Cart(props) {
  const { colors } = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors])

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      {
        props.cart.map((recipe) => (
          <View key={recipe.id} style={styles.card}>
            <View style={styles.recipeHeader}>
              <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
            </View>

            <List
              items={recipe.ingredients.map(item => item.title)}
              type={'numeric'}
              itemStyle={{ marginBottom: 0 }}
              delimiter={true}
            />
          </View>
        ))
      }
    </SafeAreaView>
  )
}

const getStyles = (colors) => StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    marginTop: wp(20),
    paddingVertical: wp(12),
    paddingHorizontal: wp(12),
    borderRadius: wp(8),
    marginHorizontal: wp(20),
  },
  recipeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeTitle: {
    flex: 1,
    fontSize: wp(16),
    lineHeight: wp(20),
    fontFamily: Font.semiBold,
    paddingLeft: wp(12),
    color: colors.text
  },
  recipeImage: {
    width: wp(50),
    aspectRatio: 1,
    borderRadius: wp(50),
  }
})

const mapStateToProps = (state) => ({
  cart: Object.values(state.cart)
});

export default connect(mapStateToProps)(Cart);
