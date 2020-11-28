import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import Icon from '../components/Icon';
import Recipe from '../components/Recipe';
import { Font } from '../constants/Design';
import { wp } from '../utils';

function Favorites(props) {
  const { colors } = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors])
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;

  const renderRecipe = ({ item }) => (
    <Recipe key={item.id.toString()} style={styles.recipe} {...item} onPress={() => {
      props.navigation.navigate('Recipe', { recipeId: item.id, type: 'favorite' })
    }} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        numColumns={2}
        data={props.recipes}
        renderItem={renderRecipe}
        contentContainerStyle={{
          flex: props.recipes.length ? null : 1,
          marginHorizontal: wp(16),
          paddingBottom: wp(8),
        }}
        ListHeaderComponent={(
          props.recipes.length && (
            <View style={{
              paddingHorizontal: wp(4),
              marginTop: insets.top > 0 ? 0 : wp(20),
              marginBottom: wp(16)
            }}>
              <Text style={styles.screenTitle}>Favorite recipes</Text>
              <Text style={styles.primaryText}>
                Save recipes to make them favorite
              </Text>
            </View>
          )
        )}
        ListEmptyComponent={(
          <View style={styles.emptyCartMessage}>
            <Icon name={'heart'} color={colors.border} size={screenWidth * .3} />
            <View>
              <Text style={[
                styles.emptyCartMessageText,
                { marginTop: wp(20) }
              ]}>
                You don't have favorite recipes.
              </Text>
              <Text style={styles.emptyCartMessageText}>
                To add recipe to your favorites, press "Save" button on the top
                of the recipe screen.
              </Text>
            </View>
          </View>
        )}
      />
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
  recipe: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: '50%',
    padding: wp(4),
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
});

const mapStateToProps = (state) => ({
  recipes: state.favorites,
});

export default connect(mapStateToProps)(Favorites);