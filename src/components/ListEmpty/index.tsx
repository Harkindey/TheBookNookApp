import { View } from 'react-native';
import React, { FC } from 'react';
import { globalStyles } from 'src/design';
import { Body, P } from '../Typography';

type Props = {
  header?: string;
  subheader?: string;
};

const ListEmpty: FC<Props> = ({ header, subheader }) => {
  return (
    <View style={[globalStyles.fillCenter, { marginVertical: 70 }]}>
      <Body
        text={header}
        style={{ textAlign: 'center', marginBottom: 12 }}
        fontSize={15}
      />
      <P text={subheader} style={{ textAlign: 'center' }} fontSize={13} />
    </View>
  );
};

export default ListEmpty;
