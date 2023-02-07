import * as React from 'react';
import {Button, ButtonProps} from 'react-native-paper';

export default function RoundedButton(props: ButtonProps) {
  return <Button theme={{roundness: 20}} {...props} />;
}
