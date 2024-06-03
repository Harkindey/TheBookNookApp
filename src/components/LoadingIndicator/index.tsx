import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import { screenWidth } from 'src/design/responsiveModule';
import { Colors } from 'src/design/colors';
import { globalStyles } from 'src/design';

const LoadingIndicator = () => {
  return (
    <View
      style={{
        marginVertical: 30,
        width: screenWidth,
        ...globalStyles.fillCenter,
      }}>
      <ActivityIndicator color={Colors.primaryColor} size="large" />
    </View>
  );
};

export default LoadingIndicator;
