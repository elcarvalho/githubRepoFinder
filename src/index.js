import 'react-native-gesture-handler';
import './config/ReactotronConfig';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import Routes from './routes';

const App = () => {
  return (
    <NavigationContainer>
      <>
        <Routes />
      </>
    </NavigationContainer>
  );
};

export default App;
