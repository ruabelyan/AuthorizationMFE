import createStore from '@/adapter/redux/store';
import { containerInstance } from '@/di';
import { AtomCommonProvider } from '@atom/common';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { SignInContainer } from './sign-in';

const App = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    containerInstance.configure(diFiles).then(() => setStore(createStore()));
  }, []);

  if (!store) return null;

  return (
    <Provider store={store}>
      <AtomCommonProvider initializeLanguage={true}>
        <SignInContainer />
      </AtomCommonProvider>
    </Provider>
  );
};

export default App;
