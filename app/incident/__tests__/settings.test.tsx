import React from 'react';
import { render } from '@testing-library/react-native';
import SettingsPage from '../settings';

describe('SettingsPage', () => {
  it('renders Settings header', () => {
    const { getByText } = render(<SettingsPage />);
    expect(getByText(/Settings/i)).toBeTruthy();
  });
});
