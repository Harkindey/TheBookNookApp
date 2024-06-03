import { StackScreenProps } from '@react-navigation/stack';

export type AppStackParamList = {
  Home: undefined;
  DetailsPage: { id: number };
  Cart: undefined;
};
export type AppStackScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>;
