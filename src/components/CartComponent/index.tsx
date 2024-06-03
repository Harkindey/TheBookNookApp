import { StyleSheet, TouchableOpacity } from 'react-native';
import React, {
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
} from 'react';
import { CartIcon } from 'src/assets/icons';
import { useAppSelector } from 'src/hooks/reduxHooks';
import { selectAllCartItem } from 'src/redux/cart/selector';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { shallowEqual } from 'react-redux';
import { AppStackParamList } from 'src/view/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Body } from '../Typography';
import { Colors, globalStyles } from 'src/design';

type NavigationProps = StackNavigationProp<AppStackParamList>;

const ANGLE = 10;
const TIME = 100;
const EASING = Easing.elastic(1.5);

export type ControlsViaRefApi = {
  bounce: () => void;
  shake: () => void;
};

const CartComponent = forwardRef((props, ref) => {
  // const navigation: NavigationProp<AppStackParamList> = useNavigation();
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    if (!ref) {
      return;
    }

    (ref as MutableRefObject<ControlsViaRefApi>).current = {
      bounce: () => handleBounce(),
      shake: () => handleShake(),
    } as ControlsViaRefApi;
  }, []);

  const cart = useAppSelector(selectAllCartItem, shallowEqual);
  const cartLength = Object.keys(cart).length;

  const scale = useSharedValue(1);
  const handleBounce = useCallback(() => {
    scale.value = withSequence(withSpring(2), withSpring(1));
  }, [scale]);
  const rotation = useSharedValue<number>(0);

  const handleShake = () => {
    rotation.value = withSequence(
      withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
      withRepeat(
        withTiming(ANGLE, {
          duration: TIME,
          easing: EASING,
        }),
        7,
        true,
      ),
      withTiming(0, { duration: TIME / 2, easing: EASING }),
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotateZ: `${rotation.value}deg` }],
  }));

  const controlsViaRefApi = {
    bounce: () => handleBounce(),
    shake: () => handleShake(),
  } as ControlsViaRefApi;

  useImperativeHandle(ref, () => controlsViaRefApi);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Cart');
      }}>
      {cartLength ? (
        <Animated.View style={[styles.counter, animatedStyle]}>
          <Body text={cartLength} fontSize={10} />
        </Animated.View>
      ) : null}
      <CartIcon width={24} height={24} />
    </TouchableOpacity>
  );
});

export default CartComponent;

const styles = StyleSheet.create({
  counter: {
    position: 'absolute',
    backgroundColor: Colors.accentColor,
    width: 16,
    height: 16,
    borderRadius: 3,
    ...globalStyles.fillCenter,
    zIndex: 1000,
    left: 15,
    bottom: 15,
  },
});
