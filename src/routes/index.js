import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Load from '../screens/home/Load';
import Login from '../screens/auth/Login';
import RegisterEmail from '../screens/auth/RegisterEmail';
import ForgetPassword from '../screens/auth/ForgetPassword';
import VerificatePassword from '../screens/auth/VerificatePassword';
import RegisterData from '../screens/auth/RegisterData';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      {/*Usuario*/}
      <Stack.Screen
        name="Load"
        component={Load}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterEmail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterData"
        component={RegisterData}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VerificatePassword"
        component={VerificatePassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
