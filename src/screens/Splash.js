import React, {Fragment, useEffect} from 'react';
import {SafeAreaView, View, ImageBackground, Image, Text} from 'react-native';
import normalize from '../utils/helpers/normalize';
import {getLocationList} from '../redux/Action/LocationAction';

import {Colors, Fonts, Images} from '../themes/Themes';
import {useDispatch, useSelector} from 'react-redux';
import MyStatusBar from '../components/MyStatusBar';

export default function Splash(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocationList());
    setTimeout(() => {
      props.navigation.replace('Home');
    }, 1500);
  }, []);

  return (
    <Fragment>
      <ImageBackground
        source={Images.splash_Background}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MyStatusBar
          backgroundColor={Colors.statusbar}
          barStyle={'light-content'}
        />
      </ImageBackground>
    </Fragment>
  );
}
