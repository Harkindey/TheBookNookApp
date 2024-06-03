import React from 'react';
import { render, screen } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';
// import { it } from '@jest/globals';

import CartCard from './index';

test('render cart', async () => {
  const item = {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    description:
      'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    category: 'beauty',
    price: 9.99,
    rating: 4.94,
    reviews: [
      {
        rating: 2,
        comment: 'Very unhappy with my purchase!',
        date: '2024-05-23T08:56:21.618Z',
        reviewerName: 'John Doe',
        reviewerEmail: 'john.doe@x.dummyjson.com',
      },
      {
        rating: 2,
        comment: 'Not as described!',
        date: '2024-05-23T08:56:21.618Z',
        reviewerName: 'Nolan Gonzalez',
        reviewerEmail: 'nolan.gonzalez@x.dummyjson.com',
      },
      {
        rating: 5,
        comment: 'Very satisfied!',
        date: '2024-05-23T08:56:21.618Z',
        reviewerName: 'Scarlett Wright',
        reviewerEmail: 'scarlett.wright@x.dummyjson.com',
      },
    ],
    images: ['...', '...', '...'],
    quantity: 4,
  };
  const onPress = jest.fn();
  render(<CartCard {...{ item }} />);
  expect(screen.getByLabelText('cartCard')).toBeOnTheScreen();
});
