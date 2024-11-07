import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, Text, Checkbox} from 'react-native-paper';

type Props = {
  title: string;
};

export default function ToDoItem({title}: Props) {
  return (
    <View style={styles.row}>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
