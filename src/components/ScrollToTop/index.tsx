import { Component } from 'react';
import { withRouter } from 'react-router';

/**
 * Create logic to handle scroll when query params have changed
 *
 * @class ScrollToTop
 * @extends {Component<any, any>}
 */
class ScrollToTop extends Component<any, any> {
  componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
