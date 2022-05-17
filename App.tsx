import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './src/Theme';
import {AuthProvider} from './src/hooks/AuthProvider';
import Navigation from './src/Navigation';

const App = () => {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;
