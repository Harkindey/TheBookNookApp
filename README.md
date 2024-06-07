This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

#  App Description
This is a basic app for a user to Browse product inventory, view product details, add product to cart and checkout.

Api Used - (https://dummyjson.com/docs/products).

## Import Libraries used
- React Navigation for Naviation
- Redux-Toolkit (RTK) for State
- React Native Reanimated for Animation
- React Native Svg for Icons

The decision to use these libraries are more of what i'm used to and can properly use.
I was going to use the RTK Query for its caching abilities but i thought against it so that the app can be refreshed easily.
(if the app was to grow that would be considered, {RTK Query})

## Missing Part
 Testing is greatly missing from the app, due to some environment issues I faced, It's the major reason for my delayed submission

## Directions
 Really tried my best to keep things very simple so anyone can read through the code and extend it.

