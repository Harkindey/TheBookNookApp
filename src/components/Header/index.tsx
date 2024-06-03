import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { FC, ReactNode } from 'react';
import { Colors } from 'src/design/colors';
import { useNavigation } from '@react-navigation/native';
import { BackIcon } from 'src/assets/icons';
import { H } from '../Typography';
import { globalStyles } from 'src/design';

export const HEADER_HEIGHT = 70;

type Props = {
  headerText?: string;
  hideBackButton?: boolean;
  rightContent?: ReactNode;
  onBack?: () => void;
};

const Header: FC<Props> = ({
  headerText,
  hideBackButton = false,
  rightContent,
  onBack,
}) => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.header}>
      {hideBackButton ? (
        <View style={{ marginLeft: rightContent ? 30 : 0 }} />
      ) : (
        <TouchableOpacity
          style={styles.iconView}
          onPress={() => {
            if (onBack) {
              return onBack();
            }
            goBack();
          }}>
          <BackIcon />
        </TouchableOpacity>
      )}
      <View>
        <H
          accessibilityRole="header"
          text={headerText}
          style={{
            marginRight: 30,
            marginLeft: hideBackButton ? -24 : 0,
          }}
        />
      </View>
      {rightContent ? rightContent : <View />}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    ...globalStyles.spaceBetween,
    ...globalStyles.alignItemsRow,
    paddingBottom: 20,
    paddingTop: 25,
    paddingHorizontal: 20,
    backgroundColor: Colors.primarySurface,
  },
  iconView: {
    height: 33,
    width: 33,
    borderRadius: 33 / 2,
    ...globalStyles.fillCenter,
  },
});
