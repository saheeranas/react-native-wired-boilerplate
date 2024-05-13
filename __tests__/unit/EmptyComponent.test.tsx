import 'react-native';
import React from 'react';
import {describe, it} from '@jest/globals';

import {render} from '../../src/utils/test-utils';

import EmptyComponent from '../../src/components/EmptyComponent';

describe('EmptyComponent', () => {
  it('should show default text "No Users found"', () => {
    let {getByText} = render(<EmptyComponent />, {});
    getByText('No Users found');
  });

  it('should show custom text "No entries found"', () => {
    let {getByText} = render(<EmptyComponent title="No entries found" />, {});
    getByText('No entries found');
  });
});
