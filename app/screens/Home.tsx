import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'react-native-paper';

import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

const Home = () => {
  const {colors} = useTheme();
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={colors.accent}
      />
      <View>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
