import React from 'react';
import { render } from '@testing-library/react-native';
import SubmissionReviewPage from '../submission-review';

describe('SubmissionReviewPage', () => {
  it('renders Review Submission header', () => {
    const { getByText } = render(<SubmissionReviewPage />);
    expect(getByText(/Review Submission/i)).toBeTruthy();
  });
});
