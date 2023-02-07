import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function EmptyComponent() {
  return (
    <View style={styles.statusMsg}>
      <Text>No Users found</Text>
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
