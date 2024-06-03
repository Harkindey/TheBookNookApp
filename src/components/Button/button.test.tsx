import React from 'react';
import { render, screen } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';
// import { it } from '@jest/globals';

import Button from './index';

test('renders Button', async () => {
  const onPress = jest.fn();
  render(<Button buttonText="Bumpa Login" onPress={onPress} />);
  expect(screen.getByRole('button', { name: 'Bumpa Login' })).toBeOnTheScreen();
});

test('disabled state', async () => {
  const onPress = jest.fn();
  render(<Button buttonText="Bumpa Login" onPress={onPress} disabled />);
  expect(screen.getByRole('button', { name: 'Bumpa Login' })).toBeDisabled();
});
