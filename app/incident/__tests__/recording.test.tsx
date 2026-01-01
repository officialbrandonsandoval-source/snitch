import React from 'react';
import { render } from '@testing-library/react-native';
import RecordingScreen from '../recording';

describe('RecordingScreen', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<RecordingScreen />);
    expect(getByText('Record Incident')).toBeTruthy();
  });
});
