import { FlatList, ListRenderItem, View } from 'react-native';
import React, { FC, useMemo } from 'react';
import { AppStackScreenProps } from '../types';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks';
import { selectAllCartItem } from 'src/redux/cart/selector';
import { objectValues } from 'src/utils/helper';
import { Body, Button, CartCard, Header, ListEmpty } from 'src/components';
import { Colors, globalStyles } from 'src/design';
import { showSuccessNotification } from 'src/utils/notification';
import { clearCart } from 'src/redux/cart/slice';

const Cart: FC<AppStackScreenProps<'Cart'>> = ({ navigation }) => {
  const cart = useAppSelector(selectAllCartItem);
  const dispatch = useAppDispatch();

  const total = useMemo(() => {
    const subtotal = objectValues(cart).reduce((sum, currentProduct) => {
      return sum + currentProduct.price * currentProduct.quantity;
    }, 0);
    return subtotal.toFixed(2);
  }, [cart]);

  const renderItem: ListRenderItem<Product & { quantity: number }> = ({
    item,
  }) => {
    return (
      <View key={item?.id}>
        <CartCard {...{ item }} />
      </View>
    );
  };
  return (
    <View style={globalStyles.contain}>
      <Header headerText={'Cart'} />
      <FlatList
        data={objectValues(cart)}
        renderItem={renderItem}
        ListEmptyComponent={
          <ListEmpty
            header="No item in your cart"
            subheader="Get some items in your cart by adding products to cart"
          />
        }
      />
      <View
        style={[
          globalStyles.horizontalPadding,
          globalStyles.verticalPadding,
          { backgroundColor: Colors.primarySurface, borderTopWidth: 1 },
        ]}>
        <View
          style={[
            globalStyles.alignItemsRow,
            globalStyles.spaceBetween,
            { marginBottom: 20 },
          ]}>
          <Body text="Total" fontSize={15} />
          <Body text={`$ ${total}`} fontSize={20} />
        </View>
        <Button
          buttonText="Check Out"
          onPress={() => {
            showSuccessNotification({
              alertTitle: 'Cart CheckOut',
              message: 'Your order will be delivered to you soon',
            });
            dispatch(clearCart());
            navigation.navigate('Home');
          }}
          disabled={!objectValues(cart).length}
        />
      </View>
    </View>
  );
};

export default Cart;
