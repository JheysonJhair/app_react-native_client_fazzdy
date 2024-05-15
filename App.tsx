import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/index';
import {UserProvider} from './src/hooks/UserContext';

export default function App(): React.JSX.Element {
  return (
    <UserProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </UserProvider>
  );
}