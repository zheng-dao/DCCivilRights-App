import React, {useState, useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';

import StackNav from './src/navigators/StackNav';

import Splash from './src/screens/Splash';
import {Settings} from 'react-native-fbsdk-next';
export default function App() {
  useEffect(() => {
    Settings.initializeSDK();
    Settings.setAdvertiserTrackingEnabled(true);
  }, []);
  return <StackNav />;
}
