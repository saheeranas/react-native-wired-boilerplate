import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme, Button} from 'react-native-paper';
import {useAuth} from '../hooks/AuthProvider';

import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

const Settings = () => {
  const {colors} = useTheme();
  const {signout} = useAuth();
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={colors.accent}
      />
      <View>
        <Button mode="contained" onPress={signout}>
          Signout
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
