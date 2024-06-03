import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import React, { FC, useState } from 'react';
import { Cancel, SearchIcon } from 'src/assets/icons';
import { Colors } from 'src/design/colors';
import { globalStyles } from 'src/design';

type Props = {
  onSearch: (searchterm: string) => void;
  placeHolderText: string;
  cancelSearch: () => void;
};

const SearchInput: FC<Props> = ({
  onSearch,
  placeHolderText,
  cancelSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <View style={styles.wrapper}>
      <SearchIcon width={24} height={24} />
      <TextInput
        placeholder={placeHolderText}
        value={searchTerm}
        placeholderTextColor={Colors.inputBorder}
        onChangeText={text => setSearchTerm(text)}
        style={[styles.input, styles.searchInput]}
        returnKeyType={'search'}
        onSubmitEditing={e => onSearch(e.nativeEvent.text)}
        autoCapitalize={'none'}
      />

      <TouchableOpacity
        onPress={() => {
          setSearchTerm('');
          cancelSearch();
        }}>
        <Cancel width={16} height={16} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  wrapper: {
    ...globalStyles.alignItemsRow,
    borderWidth: 1,
    height: 51,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 4,
    borderColor: Colors.inputBorder,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    color: '#000',
    fontFamily: 'MatterSQ-Light',
    fontSize: 18,
    lineHeight: 19,
    fontWeight: '400',
    height: '100%',
  },
  searchInput: {
    borderWidth: 0,
    borderRadius: 10,
    height: 48,
    width: '100%',
    marginTop: 5,
  },
});
