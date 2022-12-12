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
import {getCMSDetails} from '../redux/Action/CMSAction';

const CreatorBios = props => {
  const dispatch = useDispatch();
  const CMSReducer = useSelector(state => state.CMSReducer);
  useEffect(() => {
    dispatch(getCMSDetails('creator-bios'));
  }, []);
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
        <View
          style={{
            flexDirection: 'row',
            //   marginTop: normalize(15),
            backgroundColor: Colors.statusbar,
            width: '100%',
            height: normalize(40),
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Home')}
            style={{alignSelf: 'center'}}>
            <Image
              source={Icons.left_arrow}
              style={{
                height: normalize(20),
                width: normalize(40),
                marginLeft: normalize(10),
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: Colors.white,
              fontSize: normalize(16),
              fontFamily: Fonts.RobotoBold,
              marginLeft: normalize(60),
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            Creator Bios
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: normalize(13),
                fontFamily: Fonts.RobotoRegular,
                color: Colors.textColor,
                marginTop: normalize(10),
                padding: normalize(10),
                marginBottom: normalize(50),
              }}>
              {CMSReducer.getCMSData.data.text_content}
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </Fragment>
  );
};

export default CreatorBios;
