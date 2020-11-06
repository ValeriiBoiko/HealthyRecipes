import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Font } from '../../constants/Design';
import { addToCart, removeFromCart } from '../../middleware';
import Icon from '../Icon';

function IngredientList(props) {
  const { colors } = useTheme();

  const selectedItems = props.cart.map(item => item.id);

  function onPressIngredient(id, title) {
    const index = selectedItems.findIndex((item) => id === item);
    const ingredient = { id, title };

    if (index > -1) {
      // const updated = selectedItems.filter(item => item !== id);
      // setSelectedItems(updated);

      props.removeFromCart(props.recipe, ingredient)
    } else {
      // setSelectedItems(selectedItems.concat([id]));
      props.addToCart(props.recipe, ingredient)
    }
  }

  const ingredients = props.ingredients.map((item, index) => {
    const isAdded = selectedItems.findIndex((current) => current === item.id);

    icon = isAdded > -1 ? (
      <View style={[styles.button, {
        backgroundColor: 'transparent',
        borderColor: colors.error
      }]}>
        <Icon name={'minus'} size={25} color={colors.error} />
      </View>
    ) : (
        <View style={[styles.button, {
          backgroundColor: colors.primary,
          borderColor: colors.primary
        }]}>
          <Icon name={'plus'} size={25} color={'#f2f1f6'} />
        </View>
      );

    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => onPressIngredient(item.id, item.title)}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          {icon}
          <Text style={{
            color: colors.secondary,
            color: colors.text,
            fontFamily: Font.bold,
            fontFamily: Font.regular,
            fontSize: 16,
            flex: 1,
          }}>{item.title}</Text>

        </View>
      </TouchableWithoutFeedback>
    )
  })

  return (
    <View>
      {ingredients}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 35,
    height: 35,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginVertical: 8,
    marginRight: 16
  }
})

const mapStateToProps = (state) => ({
  cart: state.cart[state.recipe.id] && state.cart[state.recipe.id].ingredients || []
})

const mapDispatchToProps = (dispatch) => ({
  addToCart: (recipe, ingredient) => dispatch(addToCart(recipe, ingredient)),
  removeFromCart: (recipe, ingredient) => dispatch(removeFromCart(recipe, ingredient)),
})

export default connect(mapStateToProps, mapDispatchToProps)(IngredientList)