import React from 'react';
import { render } from '@testing-library/react-native';
import EvidenceUploadScreen from '../evidence-upload';

describe('EvidenceUploadScreen', () => {
  it('renders Evidence header', () => {
    const { getAllByText } = render(<EvidenceUploadScreen />);
    expect(getAllByText(/Evidence/i).length).toBeGreaterThan(0);
  });
});
