/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import AppStack from './src/view/stack';
import { Colors } from './src/design/colors';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  return <View />;
}

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.primarySurface,
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider style={backgroundStyle}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
              barStyle={'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <NavigationContainer>
              <FlashMessage
                position="top"
                titleStyle={{
                  fontFamily: 'MatterSQ-SemiBold',
                }}
                textStyle={{
                  fontFamily: 'MatterSQ-Light',
                }}
                duration={3000}
              />
              <AppStack />
            </NavigationContainer>
          </SafeAreaView>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
