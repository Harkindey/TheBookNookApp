import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React, { FC, useCallback } from 'react';
import { Cancel } from 'src/assets/icons';
import { useAppDispatch } from 'src/hooks/reduxHooks';
import { addToCart, removefromCart } from 'src/redux/cart/slice';
import { Colors, globalStyles } from 'src/design';
import { Body } from '../Typography';
import CartCounter from '../CartCounter';

const americanahUrl = require('src/assets/images/americanah.jpg');

type Props = {
  item: Product & { quantity: number };
};

const CartCard: FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();

  const counterChange = useCallback(
    (num: number) => {
      dispatch(addToCart({ ...item, quantity: num }));
    },
    [dispatch, item],
  );

  return (
    <View accessibilityLabel="cartCard" style={styles.container}>
      <Image
        source={{ uri: item?.images[0] ?? americanahUrl }}
        style={{ width: 78, height: 78 }}
      />
      <View style={{ marginLeft: 20, flex: 1 }}>
        <View style={[globalStyles.alignItemsRow, globalStyles.spaceBetween]}>
          <Body text={item.title} fontSize={20} style={{ marginBottom: 10 }} />
          <TouchableOpacity
            onPress={() => {
              dispatch(removefromCart(item.id));
            }}>
            <Cancel width={26} height={26} />
          </TouchableOpacity>
        </View>
        <View style={[globalStyles.alignItemsRow, globalStyles.spaceBetween]}>
          <CartCounter count={item.quantity} onChange={counterChange} />
          <Body text={`$ ${item.price}`} fontSize={17} />
        </View>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.alignItemsRow,
    ...globalStyles.horizontalPadding,
    ...globalStyles.verticalPadding,
    backgroundColor: Colors.primarySurface,
    borderTopWidth: 1,
    borderColor: Colors.inputBorder,
  },
});
