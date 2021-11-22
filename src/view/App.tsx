import createStore from '@/adapter/redux/store';
import { containerInstance } from '@/di';
import { AtomCommonProvider } from '@atom/common';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from './constants';
import { LogoutCallback, SignInCallback, SignInContainer } from './sign-in';

const App = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    containerInstance.configure(diFiles).then(() => setStore(createStore()));
  }, []);

  if (!store) return null;

  return (
    <Provider store={store}>
      <AtomCommonProvider initializeLanguage>
        <Router basename={ROUTES.baseUrl}>
          <Switch>
            <Route path={ROUTES.loginUrl} exact>
              <SignInContainer />
            </Route>

            <Route path={ROUTES.callbackUrl} exact>
              <SignInCallback />
            </Route>

            <Route path={ROUTES.logoutCallbackUrl} exact>
              <LogoutCallback />
            </Route>

            <Redirect to={ROUTES.baseUrl} />
          </Switch>
        </Router>
      </AtomCommonProvider>
    </Provider>
  );
};

export default App;
