import React from 'react';
import { render, screen } from '@testing-library/react';
import Totals from './';

test('renders totals', () => {
  render(<Totals currentPage={1} pageSize={10} totalResults={100} />);
  const linkElement = screen.getByText(/100/i);

  expect(linkElement).toBeInTheDocument();
});
