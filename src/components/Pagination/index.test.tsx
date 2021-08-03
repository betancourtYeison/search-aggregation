import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from './';

test('renders pagination', () => {
  render(<Pagination currentPage={1} pageSize={10} totalPages={10} onPage={() => {}} />);
  const linkElement = screen.getByText(/1/i);
  expect(linkElement).toBeInTheDocument();
});
