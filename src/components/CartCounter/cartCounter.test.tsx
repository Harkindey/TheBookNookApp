import React from 'react';
import { render, screen } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';

import CartCounter from './index';

test('renders CartCounter', async () => {
  const onPress = jest.fn();
  render(<CartCounter count={1} onChange={onPress} />);
  expect(screen.getByLabelText('cartCounter')).toBeOnTheScreen();
});
