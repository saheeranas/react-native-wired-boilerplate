import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './app/Theme';

import Navigation from './app/Navigation';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
  );
};

export default App;
