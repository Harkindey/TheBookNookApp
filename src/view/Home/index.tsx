import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { AppStackScreenProps } from '../types';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks';
import {
  selectAllProdoucts,
  selectProductsError,
  selectProductsMeta,
  selectProductsStatus,
} from 'src/redux/products/selectors';
import { DEFAULT_PRODUCT_PARAMS } from './utils';
import {
  clearProducts,
  fetchProducts,
  searchfetchProducts,
} from 'src/redux/products/slice';
import { uniqueId } from 'lodash';
import {
  Body,
  CartComponent,
  Header,
  ListEmpty,
  LoadingIndicator,
  ProductCard,
  SearchInput,
} from 'src/components';
import { Colors, globalStyles } from 'src/design';

const Home: FC<AppStackScreenProps<'Home'>> = ({ navigation }) => {
  const [filterObject, setfilterObject] = useState<
    typeof DEFAULT_PRODUCT_PARAMS
  >(DEFAULT_PRODUCT_PARAMS);
  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProdoucts);
  const productsMeta = useAppSelector(selectProductsMeta);

  const productsStatus = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    dispatch(fetchProducts(filterObject));
  }, [filterObject, dispatch]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    dispatch(clearProducts());
    try {
      await dispatch(fetchProducts(DEFAULT_PRODUCT_PARAMS)).unwrap();
      setRefreshing(false);
    } catch (err: unknown) {
      setRefreshing(false);
    }
  }, [dispatch]);

  const onSubmitSearch = (searchTerm: string) => {
    dispatch(clearProducts());
    dispatch(
      searchfetchProducts({
        q: searchTerm,
        ...DEFAULT_PRODUCT_PARAMS,
      }),
    );
  };

  const renderItem: ListRenderItem<Product> = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailsPage', { id: item.id })}
        key={uniqueId(`${item?.id}`)}>
        <ProductCard {...{ item }} />
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    return (
      <>
        {products && productsStatus === 'loading' && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
          </View>
        )}
        {products?.length === productsMeta?.total && (
          <View style={globalStyles.fillCenter}>
            <Body text={'•'} fontSize={20} />
          </View>
        )}
      </>
    );
  };

  const onScrollEnd = () => {
    if (
      products?.length !== productsMeta?.total &&
      productsStatus !== 'loading' &&
      productsMeta?.skip < productsMeta?.total
    ) {
      setfilterObject(v => ({ ...v, skip: v.skip + v.limit }));
    }
  };

  return (
    <View style={globalStyles.contain}>
      <Header rightContent={<CartComponent />} hideBackButton />
      <View
        style={[
          globalStyles.horizontalPadding,
          { flex: 1, backgroundColor: '#fff' },
        ]}>
        <View style={{ marginBottom: 10 }}>
          <SearchInput
            onSearch={onSubmitSearch}
            placeHolderText="Search product"
            cancelSearch={() => {}}
          />
          {/* <View style={globalStyles.row}>
            <P text="Search results for" />
            <Body text={` ${'Americanah'}`} />
          </View> */}
        </View>
        <View style={{ flex: 1 }}>
          {productsStatus === 'loading' && !products ? (
            <LoadingIndicator />
          ) : (
            <FlatList
              data={products}
              renderItem={renderItem}
              ListEmptyComponent={
                <ListEmpty
                  header="We can't find a product with that query"
                  subheader="Do try again in the future, we might have that product then"
                />
              }
              ListFooterComponent={renderFooter}
              numColumns={2}
              onEndReachedThreshold={0.1}
              onEndReached={onScrollEnd}
              style={{ marginBottom: 10 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  loading: {
    position: 'relative',
    height: 40,
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 10,
    borderColor: Colors.primaryColor,
  },
});
