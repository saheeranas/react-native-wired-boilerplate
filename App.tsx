import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from 'react-query';
import {theme} from './src/Theme';
import {AuthProvider} from './src/hooks/AuthProvider';
import Navigation from './src/Navigation';

// Create a react-query client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PaperProvider theme={theme}>
          <Navigation />
        </PaperProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
