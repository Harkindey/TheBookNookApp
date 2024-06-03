import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { FC, useEffect, useReducer } from 'react';
import { Minus, Plus } from 'src/assets/icons';
import { globalStyles } from 'src/design';
import { P } from '../Typography';

interface CounterAction {
  type: 'INCREMENT' | 'DECREMENT';
}

function reducer(state: number, action: CounterAction) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      if (state === 1) return state;
      return state - 1;
    default:
      throw new Error();
  }
}

type Props = {
  count: number;
  onChange: (num: number) => void;
};

const CartCounter: FC<Props> = ({ count, onChange }) => {
  const [state, dispatch] = useReducer(reducer, count);
  useEffect(() => {
    onChange(state);
  }, [state]);

  return (
    <View
      accessibilityLabelledBy={'cartCounter'}
      style={globalStyles.alignItemsRow}>
      <TouchableOpacity
        accessibilityLabelledBy={'decrement'}
        onPress={() => dispatch({ type: 'DECREMENT' })}>
        <Minus width={40} height={40} />
      </TouchableOpacity>

      <P
        text={count}
        accessibilityLabelledBy={'count'}
        style={{ marginHorizontal: 10 }}
      />

      <TouchableOpacity
        accessibilityLabelledBy={'inccrement'}
        onPress={() => dispatch({ type: 'INCREMENT' })}>
        <Plus width={40} height={40} />
      </TouchableOpacity>
    </View>
  );
};

export default CartCounter;

const styles = StyleSheet.create({});
