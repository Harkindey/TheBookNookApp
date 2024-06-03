import { Image, StyleSheet, View } from 'react-native';
import React, { createRef, FC, useMemo, useState } from 'react';
import Header from 'src/components/Header';
import { AppStackScreenProps } from '../types';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks';
import { selectProductsById } from 'src/redux/products/selectors';
import { screenHeight } from 'src/design/responsiveModule';
import { capitalize, objectValues, truncateText } from 'src/utils/helper';
import { Star } from 'src/assets/icons';
import { addToCart } from 'src/redux/cart/slice';
import { shallowEqual } from 'react-redux';
import { selectAllCartItem } from 'src/redux/cart/selector';
import {
  Body,
  Button,
  CartComponent,
  ControlsViaRefApi,
  H,
  P,
} from 'src/components';
import { globalStyles } from 'src/design';
import CartCounter from 'src/components/CartCounter';

const americanahUrl = require('src/assets/images/americanah.jpg');

const DetailsPage: FC<AppStackScreenProps<'DetailsPage'>> = ({ route }) => {
  let cartRef = createRef<ControlsViaRefApi>();
  const dispatch = useAppDispatch();
  const [cartQuantity, setcartQuantity] = useState(1);
  const id = route.params.id;

  const product = useAppSelector(state => selectProductsById(state, id));
  const cartItems = useAppSelector(selectAllCartItem, shallowEqual);

  const isProductInCart = useMemo(() => {
    return !!objectValues(cartItems).find(v => v.id === id);
  }, [cartItems, id]);

  return (
    <View style={globalStyles.contain}>
      <Header
        headerText={product?.title}
        rightContent={<CartComponent ref={cartRef} />}
      />
      <View style={{ flex: 1 }}>
        <View style={[globalStyles.fillCenter]}>
          <Image
            source={{ uri: product?.images[0] ?? americanahUrl }}
            style={{ height: screenHeight * 0.4, width: '100%' }}
            resizeMode="contain"
          />
        </View>

        <View style={[globalStyles.horizontalPadding]}>
          <View
            style={[
              globalStyles.alignItemsRow,
              { justifyContent: 'space-between', marginTop: 20 },
            ]}>
            <View>
              <Body
                text={`Category: ${capitalize(product?.category)}`}
                fontSize={20}
              />
              <View style={[globalStyles.alignItemsRow, { marginTop: 10 }]}>
                <Star />
                <Body text={product?.rating} style={{ marginHorizontal: 10 }} />
                <P text={`(${product?.reviews.length} review)`} />
              </View>
            </View>

            <CartCounter
              count={cartQuantity}
              onChange={(num: number) => setcartQuantity(num)}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <P fontSize={14} text={truncateText(product?.description!, 200)} />
          </View>
        </View>

        <View
          style={[
            globalStyles.alignItemsRow,
            globalStyles.horizontalPadding,
            globalStyles.verticalPadding,
            { marginTop: 'auto' },
          ]}>
          <H text={`$ ${product?.price}`} />
          <View style={{ flex: 1, marginLeft: 30 }}>
            <Button
              buttonText="Add To Cart"
              onPress={() => {
                dispatch(addToCart({ ...product, quantity: cartQuantity }));
                isProductInCart
                  ? cartRef.current?.shake()
                  : cartRef.current?.bounce();
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({});
