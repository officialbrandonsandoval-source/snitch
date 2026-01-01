import React from 'react';
import { render } from '@testing-library/react-native';
import TimelinePage from '../timeline';

describe('TimelinePage', () => {
  it('renders Incident Timeline header', () => {
    const { getByText } = render(<TimelinePage />);
    expect(getByText(/Incident Timeline/i)).toBeTruthy();
  });
});
