import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartItem from '../components/CartItem';

const defaultProps = {
  id: 0,
  title: 'testItemTitle',
  image: 'test://path.png',
  ingredients: [{ title: 'testIngredient1' }, { title: 'testIngredient2' }]
}

describe('test CartItem component render', () => {
  it('cart item should be rendered with passed props', () => {
    const { queryByTestId, queryByText, queryAllByText } = render(<CartItem  {...defaultProps} />);

    expect(queryByText(/testItemTitle/)).toBeTruthy();
    expect(queryAllByText(/testIngredient/).length).toBe(2);
    expect(queryByTestId('cartItemImage').props.source.uri).toBe('test://path.png');
  });
})
