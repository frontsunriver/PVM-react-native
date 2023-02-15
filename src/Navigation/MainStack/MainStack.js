import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabStack from './BottomStack';
import Routes from '../Routes';

import Home from '../../Screens/Home';
import Profile from '../../Screens/Profile';

const Stack = createStackNavigator();

export default props => {
  return (
    // <Stack.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //   }}
    //   initialRouteName={Routes.HOME_STACK}>
    //   <Stack.Screen name={Routes.HOME_STACK} component={Home} />
    //   <Stack.Screen name={Routes.PROFILE_SCREEN} component={Profile} />
    // </Stack.Navigator>
    <Stack.Navigator
      >
      <Stack.Screen
        name={Routes.HOME_TABS}
        options={{headerShown: false}}
        component={BottomTabStack}
      />
    </Stack.Navigator>
  );
};
