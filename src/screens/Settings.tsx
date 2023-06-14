import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useTheme,
  Button,
  Surface,
  Avatar,
  Title,
  Text,
  Divider,
  Appbar,
} from 'react-native-paper';
import {useAuth} from '../hooks/AuthProvider';

import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

const Settings = () => {
  const {colors} = useTheme();
  const {signout} = useAuth();
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#000" />
      <Appbar.Header>
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <Surface style={{backgroundColor: colors.surface}}>
        <View style={styles.menuWrp}>
          <Avatar.Text size={64} label="XD" />
          <Title>Saheer A</Title>
          <Text>demo@demo.com</Text>
          <Button mode="text" onPress={signout}>
            Signout
          </Button>
          <Divider />
        </View>
      </Surface>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuWrp: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
});
