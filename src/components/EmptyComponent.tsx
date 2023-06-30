import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

type EmptyComponentProps = {
  title?: string;
};

export default function EmptyComponent({
  title = 'No Users found',
}: EmptyComponentProps) {
  return (
    <View style={styles.statusMsg}>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statusMsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
