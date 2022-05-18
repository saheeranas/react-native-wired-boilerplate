import * as React from 'react';
import {Button} from 'react-native-paper';

export default function RoundedButton(props) {
  return <Button theme={{roundness: 20}} {...props} />;
}
