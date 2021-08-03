import React from 'react';
import { render, screen } from '@testing-library/react';

import { configureStore } from './../../frameworks';
import { Provider } from 'react-redux';

import AppPresenter from './';

test('renders Search Aggregation title', () => {
  render(
    <Provider store={configureStore()}>
      <AppPresenter />
    </Provider>,
  );
  const linkElement = screen.getByText(/Search Aggregation/i);
  expect(linkElement).toBeInTheDocument();
});
