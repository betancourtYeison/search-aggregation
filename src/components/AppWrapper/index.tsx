import * as React from 'react';
import { ReactNode } from 'react';

import '../../stylesheets/App.css';

interface Props {
  children: ReactNode;
}

/**
 * Component to wrap app
 *
 * @param {Props} props
 * @returns
 */
export const AppWrapper = (props: Props) => {
  return <div className="site-background">{props.children}</div>;
};
