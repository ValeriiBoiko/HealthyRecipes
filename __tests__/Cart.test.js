import React from 'react';
import { render } from '@testing-library/react-native';
import Cart from '../screens/Cart';

const cartItems = [
  {
    id: 0,
    ingredients: []
  },
  {
    id: 1,
    ingredients: []
  }
]

describe('test Cart screen render', () => {
  it('message should be shown when cart is empty', () => {
    const { queryByTestId } = render(<Cart cart={[]} />);

    expect(queryByTestId('emptyCartMessage')).toBeTruthy();
  });

  it('message should be hidden when cart is not empty', () => {
    const { queryByTestId } = render(<Cart cart={cartItems} />);

    expect(queryByTestId('emptyCartMessage')).toBeFalsy();
  });

  it.each([
    [[], 0],
    [[{ id: 0, ingredients: [] }], 1],
    [[{ id: 0, ingredients: [] }, { id: 1, ingredients: [] }], 2],
  ])('cart items should be rendered accordingly passed to props', (items, expected) => {
    const { queryAllByTestId } = render(<Cart cart={items} />);
    expect(queryAllByTestId('cartItem').length).toBe(expected)
  });
})
