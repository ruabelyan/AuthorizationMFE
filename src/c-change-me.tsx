import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import singleSpaReact from 'single-spa-react';
import { testActions } from './adapter/redux/actions';
import store from './adapter/redux/store';
import './index';

const Comp: FC<{ onMount: () => void }> = ({ onMount }) => {
  useEffect(() => {
    onMount();
  }, []);

  return <div>Asd</div>;
};

const ReduxComp = connect(null, {
  onMount: testActions.test
})(Comp);

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  // domElementGetter: () => document.getElementById('application:@platform/user-management'),
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  rootComponent: () => (
    <Provider store={store}>
      <ReduxComp />
    </Provider>
  )
});

export const { bootstrap, mount, unmount } = lifecycles;
