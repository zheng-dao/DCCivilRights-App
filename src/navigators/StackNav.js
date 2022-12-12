import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/Splash';
import DetailsPage from '../screens/DetailsPage';
import Citation from '../screens/Citation';
import AboutPage from '../screens/AboutPage';
import PrivacyPolicy from '../screens/PrivacyPolicy';

/* ----------- inner component --------------- */
import Home from '../screens/Home';
import TabNav from './TabNav';
import CreatorBios from '../screens/CreatorBios';

const Stack = createStackNavigator();

export default function StackNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name={'Splash'} component={Splash} />
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen name={'TabNav'} component={TabNav} />
        <Stack.Screen name={'AboutPage'} component={AboutPage} />
        <Stack.Screen name={'PrivacyPolicy'} component={PrivacyPolicy} />
        <Stack.Screen name={'CreatorBios'} component={CreatorBios} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
