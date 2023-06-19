// test-utils.js
import * as React from 'react';
import {render} from '@testing-library/react-native';

import {Provider as PaperProvider} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {theme} from '../Theme';
import {AuthProvider} from '../hooks/AuthProvider';
// import Navigation from '../Navigation';

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const AllTheProviders = ({children}: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PaperProvider theme={theme}>
          {children}
          {/* <Navigation /> */}
        </PaperProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const customRender = (ui: React.ReactElement, options: any) =>
  render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};
