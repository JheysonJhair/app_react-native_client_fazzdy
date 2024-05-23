import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Load from '../screens/home/Load';
import Home from '../screens/home/Home';
import Login from '../screens/auth/Login';
import RegisterEmail from '../screens/auth/RegisterEmail';
import ForgetPassword from '../screens/auth/ForgetPassword';
import RegisterData from '../screens/auth/RegisterData';
import NewPassword from '../screens/auth/NewPassword';
import Steps from '../screens/home/Steps';
import Notifications from '../screens/notifications/Notifications';
import EventInformation from '../screens/events/EventInformation';
import EventUbication from '../screens/events/EventUbication';
import Payment from '../screens/pay/Payment';
import History from '../screens/pay/History';
import config from '../screens/config/Config';
import Entrance from '../screens/pay/Entrance';

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
        name="NewPassword"
        component={NewPassword}
        options={{headerShown: false}}
      />
      {/*Home*/}
      <Stack.Screen
        name="Steps"
        component={Steps}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Information"
        component={EventInformation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Ubication"
        component={EventUbication}
        options={{headerShown: false}}
      />
      {/*Notification*/}
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{headerShown: false}}
      />
      {/*Payment*/}
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Entrance"
        component={Entrance}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{headerShown: false}}
      />
      {/*Config*/}
      <Stack.Screen
        name="Config"
        component={config}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
