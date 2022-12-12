import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import MyStatusBar from '../components/MyStatusBar';
import normalize from '../utils/helpers/normalize';
import {Colors, Fonts, Images, Icons} from '../themes/Themes';

import {WebView} from 'react-native-webview';

export default function PrivacyPolicy(props) {
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <MyStatusBar
        backgroundColor={Colors.statusbar}
        barStyle={'light-content'}
      />
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
          Privacy Policy
        </Text>
      </View>

      <WebView
        source={{
          uri: 'https://www.civilrightshistorydc.com/privacy-policy',
        }}
        originWhitelist={['*']}
      />
    </KeyboardAvoidingView>
  );
}
