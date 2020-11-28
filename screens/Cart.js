import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Font } from '../constants/Design';
import { wp } from '../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import CartItem from '../components/CartItem';
import EmptyListMessage from '../components/EmptyListMessage';
import { Transition, Transitioning } from 'react-native-reanimated';
import { removeRecipeFromCart } from '../middleware';

function Cart(props) {
  const { colors } = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors])
  const insets = useSafeAreaInsets();
  const transRef = useRef();
  const transition = (
    <Transition.Together>
      <Transition.Change interpolation="easeInOut" />
    </Transition.Together>
  );
  const listHeader = (
    <View style={{ marginTop: insets.top > 0 ? 0 : wp(20), }}>
      <Text style={styles.screenTitle}>Shopping cart</Text>
      <Text style={styles.primaryText}>
        Make your grocery list based on recipes
      </Text>
    </View>
  );

  const renderRecipes = ({ item }) => (
    <CartItem {...item} testID={'cartItem'} onDelete={() => {
      if (transRef.current) {
        transRef.current.animateNextTransition();
      }
      props.removeRecipe(item.id)
    }} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Transitioning.View
        ref={transRef}
        transition={transition}
        style={{ flex: 1, }}
      >
        <FlatList
          contentContainerStyle={{
            marginHorizontal: wp(20),
            paddingBottom: wp(16),
            flex: props.cart.length ? null : 1,
          }}
          data={props.cart}
          renderItem={renderRecipes}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={props.cart.length && listHeader}
          ListEmptyComponent={(
            <EmptyListMessage
              testID={'emptyCartMessage'}
              iconName={'basket'}
              message={`Your cart is empty so far. Open some recipe and press on 
            the ingredient that you need to buy`} />
          )}
        />
      </Transitioning.View>
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
    backgroundColor: colors.card,
    marginTop: wp(16),
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

const mapDispatchToProps = (dispatch) => ({
  removeRecipe: (id) => dispatch(removeRecipeFromCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
