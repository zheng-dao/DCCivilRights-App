import React, {Fragment, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  ImageBackground,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import normalize from '../utils/helpers/normalize';
import {useDispatch, useSelector} from 'react-redux';
import {Colors, Fonts, Icons, Images} from '../themes/Themes';

import MyStatusBar from '../components/MyStatusBar';

export default function AboutPage(props) {
  const CMSReducer = useSelector(state => state.CMSReducer);

  return (
    <Fragment>
      <MyStatusBar
        backgroundColor={Colors.statusbar}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={Images.backgroundImage}
        style={{
          flex: 1,
        }}>
        <View style={{marginLeft: normalize(10)}}>
          <View style={{flexDirection: 'row',alignItems:'center', marginVertical: normalize(15)}}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
              <Image
                source={Icons.left_arrow}
                style={{height: normalize(20), width: normalize(40)}}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(20),
                fontFamily: Fonts.RobotoRegular,
                marginLeft:normalize(8)
              }}>
              {'About '}
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(20),
                fontFamily: Fonts.RobotoBold,
              }}>
              Real DC History
            </Text>
          </View>
          <ScrollView>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(13),
                fontFamily: Fonts.RobotoRegular,

                color: Colors.textColor,
                marginTop: normalize(10),
                padding: normalize(10),
                marginBottom: normalize(50),
              }}>
              {CMSReducer.getCMSData.data.text_content}
            </Text>
          </ScrollView>
        </View>
      </ImageBackground>
    </Fragment>
  );
}
