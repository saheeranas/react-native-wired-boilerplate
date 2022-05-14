import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import {Provider as PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView>
        <View>
          <Text>App</Text>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
