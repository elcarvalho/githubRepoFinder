import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

export default function Routes() {
  const options = {
    headerStyle: {backgroundColor: '#7159c1'},
    headerTitleStyle: {color: '#fff'},
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Main} options={options} />
        <Stack.Screen name="Usuários" component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
