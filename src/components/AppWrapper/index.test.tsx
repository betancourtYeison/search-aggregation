import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppWrapper } from './';

test('renders children', () => {
  render(
    <AppWrapper>
      <div>children</div>
    </AppWrapper>,
  );
  const linkElement = screen.getByText(/children/i);
  expect(linkElement).toBeInTheDocument();
});
