import { Image, StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { screenWidth } from 'src/design/responsiveModule';
import { capitalize } from 'src/utils/helper';
import { Body, H, P } from '../Typography';

const americanahUrl = require('src/assets/images/americanah.jpg');

type Props = {
  item: Product;
};

const ProductCard: FC<Props> = ({ item }) => {
  return (
    <View style={styles.listing}>
      <View style={styles.listItem}>
        <Image
          source={{ uri: item.images[0] } || americanahUrl}
          resizeMode="contain"
          style={styles.image}
        />
        <Body text={item.title} fontSize={15} />
        <P text={capitalize(item.category)} />
        <H text={`$ ${item.price}`} />
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  listing: {
    marginTop: 20,
  },
  listItem: {
    width: screenWidth * 0.45,
  },
  image: {
    height: screenWidth * 0.43,
    width: screenWidth * 0.43,
    borderRadius: 5,
  },
});
