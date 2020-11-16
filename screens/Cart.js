import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Dimensions, FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import List from '../components/List';
import { Font } from '../constants/Design';
import { wp } from '../utils';
import Icon from '../components/Icon';

function Cart(props) {
  const { colors } = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors])
  const screenWidth = Dimensions.get('window').width;

  const renderRecipes = ({ item }) => (
    <View style={styles.recipe}>
      <Pressable onPress={() => props.navigation.navigate('Recipe', {
        recipeId: item.id
      })}>
        <View style={styles.recipeHeader}>
          <Image source={{ uri: item.image }} style={styles.recipeImage} />
          <Text style={styles.recipeTitle}>{item.title}</Text>
        </View>

        <List
          items={item.ingredients.map(item => item.title)}
          type={'numeric'}
          itemStyle={{ marginBottom: 0 }}
          delimiter={true}
        />
      </Pressable>
    </View>
  )

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <FlatList
        contentContainerStyle={{
          marginHorizontal: wp(20),
          flex: 1
        }}
        data={props.cart}
        renderItem={renderRecipes}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={(
          <View style={styles.emptyCartMessage}>
            <Icon name={'basket'} color={colors.border} size={screenWidth * .3} />
            <View>
              <Text style={[
                styles.emptyCartMessageText,
                { marginTop: wp(20) }
              ]}>
                Your cart is empty so far.
              </Text>
              <Text style={styles.emptyCartMessageText}>
                Open some recipe and press on the ingredient that you need to buy
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

const getStyles = (colors) => StyleSheet.create({
  recipe: {
    backgroundColor: colors.card,
    marginTop: wp(20),
    paddingVertical: wp(12),
    paddingHorizontal: wp(12),
    borderRadius: wp(8),
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
  },
  emptyCartMessage: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartMessageText: {
    color: colors.secondary,
    fontFamily: Font.regular,
    fontSize: wp(18),
    lineHeight: wp(24),
    textAlign: 'center',
  }
})

const mapStateToProps = (state) => ({
  cart: Object.values(state.cart)
});

export default connect(mapStateToProps)(Cart);
