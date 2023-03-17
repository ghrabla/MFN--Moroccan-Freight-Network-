/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeMap from './Screens/HomeMap';
import Register from './Screens/auth/Register';
import Login from './Screens/auth/Login';
import Landing from './Screens/Landing';
import CompaniesList from './Screens/CompaniesList';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeMap}
          options={{
            headerStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="CompaniesList" component={CompaniesList} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
