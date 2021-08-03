import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './';

test('renders children', () => {
  render(
    <Router>
      <ScrollToTop>
        <div>App</div>
      </ScrollToTop>
    </Router>,
  );
  const linkElement = screen.getByText(/App/i);
  expect(linkElement).toBeInTheDocument();
});
