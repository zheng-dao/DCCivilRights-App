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
import {Colors, Fonts, Images} from '../themes/Themes';
import MyStatusBar from '../components/MyStatusBar';
import Icons from '../themes/icons';

export default function Citation(props) {
  const LocationReducer = useSelector(state => state.LocationReducer);

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
        <View style={{flex:1,marginLeft: normalize(10)}}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
            <Image
              source={Icons.left_arrow}
              style={{
                height: normalize(20),
                marginTop: normalize(10),
                width: normalize(40),
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: Colors.white,
              fontSize: normalize(18),
              fontFamily: Fonts.RobotoBold,
              width: normalize(275),
              margin: normalize(10),
            }}>
            {LocationReducer.locationDetails.title}
          </Text>
          <ScrollView bounce={false} showsVerticalScrollIndicator={false}>
            <View style={{paddingBottom: normalize(40)}}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(13),
                  fontFamily: Fonts.RobotoRegular,

                  color: Colors.textColor,
                  marginTop: normalize(10),
                  padding: normalize(10),
                }}>
                {LocationReducer.locationDetails.citation_info}
              </Text>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </Fragment>
  );
}
