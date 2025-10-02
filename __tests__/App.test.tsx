/**
 * @format
 */

import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {jest, it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import ReactTestRenderer from 'react-test-renderer';

jest.useFakeTimers();

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
