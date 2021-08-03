import React from 'react';
import { render, screen } from '@testing-library/react';
import Results from './';

const searchResults = {
  results: [{ htmlTitle: 'Test', htmlSnippet: 'htmlSnippet' }],
};

test('renders results', () => {
  render(<Results searchResults={searchResults} />);
  const linkElement = screen.getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});
