import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { Colors, globalStyles } from 'src/design';
import { Body } from '../Typography';

export const BUTTON_HEIGHT = 56;

type Props = {
  buttonText: string;
  isLoading?: boolean;
  onPress: () => void;
  disabled?: boolean;
};

const Button: FC<Props> = ({ buttonText, isLoading, onPress, disabled }) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[styles.button, disabled && { opacity: 0.5 }]}
      onPress={onPress}
      disabled={disabled}>
      {isLoading ? (
        <View style={{ ...globalStyles.alignItemsRow }}>
          <ActivityIndicator
            size="large"
            color={Colors.primarySurface}
            style={{ marginRight: 5 }}
          />
        </View>
      ) : (
        <View style={globalStyles.alignItemsRow}>
          <Body
            fontSize={14}
            text={buttonText}
            style={{
              ...styles.text,
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: BUTTON_HEIGHT,
    borderRadius: 4,
    flexDirection: 'row',
    ...globalStyles.fillCenter,
    backgroundColor: Colors.primaryColor,
  },
  text: {
    color: Colors.primarySurface,
  },
});
