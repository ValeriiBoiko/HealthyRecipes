import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import IngredientList from '../components/IngredientList';

const defaultProps = {
  recipe: { id: 0 },
  cart: {},
  ingredients: []
}

describe('test IngredientList component render', () => {
  it.each([
    [[], 0],
    [[{ id: 0, title: 'testIngredient' }], 1],
    [[{ id: 0, title: 'testIngredient' }, { id: 1, title: 'testIngredient' }], 2],
  ])('List should render passed list of ingredients', (ingredient, expected) => {
    const { queryAllByText } = render(
      <IngredientList {...defaultProps} ingredients={ingredient} />
    );

    expect(queryAllByText('testIngredient').length).toBe(expected)
  })

  it('item should be added to cart if it is not there already', () => {
    const addToCart = jest.fn();

    const { queryByTestId } = render(
      <IngredientList {...defaultProps} ingredients={[
        { id: 0, title: 'testIngredient' }
      ]}
        addToCart={addToCart}
      />
    );

    fireEvent.press(queryByTestId('addIngredient'));
    expect(addToCart.mock.calls.length).toBe(1)
  })

  it('item should be remove from cart if it is there already', () => {
    const cart = {
      "0": {
        ingredients: [
          { id: 0, title: 'testIngredient' }
        ]
      }
    }
    const removeFromCart = jest.fn();

    const { queryByTestId } = render(
      <IngredientList {...defaultProps}
        cart={cart}
        ingredients={[
          { id: 0, title: 'testIngredient' }
        ]}
        removeFromCart={removeFromCart}
      />
    );

    fireEvent.press(queryByTestId('removeIngredient'));
    expect(removeFromCart.mock.calls.length).toBe(1)
  })
})
