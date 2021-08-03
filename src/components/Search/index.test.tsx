import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from './';

test('renders search', () => {
  render(
    <Search dispatch={() => {}} searchType={{ type: '', setType: () => {} }} location={{ search: '' }} history={{}}>
      {() => <div>Children with params</div>}
    </Search>,
  );
  const linkElement = screen.getByText(/Children with params/i);
  expect(linkElement).toBeInTheDocument();
});
