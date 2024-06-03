import React, { FC, ReactNode } from 'react';
import {
  StyleSheet,
  TextProps,
  TextStyle,
  StyleProp,
  Text,
  ColorValue,
} from 'react-native';
import { Colors } from 'src/design/colors';

export type TextColorVariant =
  | 'primary'
  | 'white'
  | 'green'
  | 'danger'
  | 'warning'
  | 'grey';

type Props = {
  text: ReactNode;
  fontSize?: TextStyle['fontSize'];
  fontWeight?: TextStyle['fontWeight'];
  lineHeight?: TextStyle['lineHeight'];
  textAlign?: TextStyle['textAlign'];
  type?: TextColorVariant;
} & TextProps;

const styles = StyleSheet.create({
  head: {
    fontFamily: 'MatterSQ-SemiBold',
  },
  body: {
    fontFamily: 'MatterSQ-Medium',
  },
  paragraph: {
    fontFamily: 'MatterSQ-Light',
  },
});

const typeObject: { [key in TextColorVariant]: ColorValue } = {
  primary: Colors.primaryColor,
  green: Colors.success,
  white: Colors.primarySurface,
  danger: Colors.error,
  warning: Colors.warning,
  grey: Colors.inputBorder,
};

const TextComponent = (
  size: number,
  defaultStyle: StyleProp<TextStyle>,
): FC<Props> => {
  return ({
    fontSize = size,
    text,
    style,
    type,
    lineHeight,
    textAlign,
    fontWeight,
    ...rest
  }) => {
    return (
      <Text
        style={[
          defaultStyle,
          {
            fontSize,
            lineHeight,
            textAlign,
            fontWeight,
            color: type ? typeObject[type] : typeObject.primary,
          },
          style,
        ]}
        {...rest}>
        {text}
      </Text>
    );
  };
};

export const P: FC<Props> = TextComponent(13, styles.paragraph);
export const Body: FC<Props> = TextComponent(13, styles.body);
export const H: FC<Props> = TextComponent(18, styles.head);
