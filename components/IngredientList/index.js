import {useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Font} from '../../constants/Design';
import {addToCart, removeFromCart} from '../../middleware';
import Icon from '../Icon';

function IngredientList(props) {
  const {colors} = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const ingredientsInCart =
    (props.cart[props.recipe.id] && props.cart[props.recipe.id].ingredients) ||
    [];
  const selectedItems = ingredientsInCart.map((item) => item.id);

  function onPress(id, title) {
    const index = selectedItems.findIndex((item) => id === item);
    const ingredient = {id, title};

    if (index > -1) {
      props.removeFromCart(props.recipe.id, ingredient.id);
    } else {
      props.addToCart(props.recipe.id, ingredient.id);
    }
  }

  const ingredients = props.ingredients.map((item) => {
    const isAdded =
      selectedItems.findIndex((current) => current === item.id) > -1;

    const icon = isAdded ? (
      <View style={[styles.button, styles.minusButton]}>
        <Icon name={'minus'} size={25} color={colors.error} />
      </View>
    ) : (
      <View style={styles.button}>
        <Icon name={'plus'} size={25} color={'#f2f1f6'} />
      </View>
    );

    return (
      <Pressable
        key={item.id}
        testID={isAdded ? 'removeIngredient' : 'addIngredient'}
        onPress={() => onPress(item.id, item.title)}>
        <View style={styles.item}>
          {icon}
          <Text style={styles.listTitle}>{item.title}</Text>
        </View>
      </Pressable>
    );
  });

  return <View>{ingredients}</View>;
}

const getStyles = (colors) =>
  StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      width: 35,
      height: 35,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      marginVertical: 8,
      marginRight: 16,
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    minusButton: {
      backgroundColor: 'transparent',
      borderColor: colors.error,
    },
    listTitle: {
      color: colors.text,
      fontFamily: Font.regular,
      fontSize: 16,
      flex: 1,
    },
  });

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (recipe, ingredient) => dispatch(addToCart(recipe, ingredient)),
  removeFromCart: (recipeId, ingredientId) =>
    dispatch(removeFromCart(recipeId, ingredientId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientList);
