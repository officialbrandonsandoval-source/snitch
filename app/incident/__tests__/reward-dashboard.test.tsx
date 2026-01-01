import React from 'react';
import { render } from '@testing-library/react-native';
import RewardDashboardPage from '../reward-dashboard';

describe('RewardDashboardPage', () => {
  it('renders Rewards header', () => {
    const { getByText } = render(<RewardDashboardPage />);
    expect(getByText('Rewards')).toBeTruthy();
  });
});
