import React from 'react';
import {Image, Platform, View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Icons, Colors, Fonts} from '../themes/Themes';
import normalize from '../utils/helpers/normalize';

import Home from '../screens/Home';
import Citation from '../screens/Citation';
import Contribute from '../screens/Contribute';
import DetailsPage from '../screens/DetailsPage';

function TabUI({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        height: Platform.OS === 'android' ? normalize(60) : normalize(60),
        paddingLeft: normalize(10),
        paddingRight: normalize(10),
      }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let tabImage = '';
        let invertImage = '';
        let showDot = false;
        let routeName = null;
        let text_color = null;

        switch (route.name) {
          case 'DetailsPage':
            tabImage = Icons.tour;
            invertImage = Icons.tour_fill;
            routeName = 'TOUR';
            text_color = Colors.white;
            if (isFocused) {
              showDot = true;
            }
            break;
          case 'Citation':
            tabImage = Icons.citation;
            invertImage = Icons.citation_fill;
            text_color = Colors.white;
            routeName = 'CITATION';
            if (isFocused) {
              showDot = true;
            }
            break;

          case 'Contribute':
            tabImage = Icons.like;
            invertImage = Icons.like_fill;
            text_color = Colors.white;
            routeName = 'CONTRIBUTION';
            if (isFocused) {
              showDot = true;
            }
            break;
          default:
            break;
        }

        return tabImage != '' ? (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            activeOpacity={1}
            style={[
              {
                paddingBottom:
                  Platform.OS == 'ios' ? normalize(10) : normalize(5),
              },
            ]}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: normalize(10),
                marginBottom: normalize(10),
                marginHorizontal: normalize(10),
              }}>
              <Image
                source={showDot == true ? invertImage : tabImage}
                style={[
                  {
                    // height: index == 2 ? normalize(20) : normalize(30),
                    // width: index == 2 ? normalize(20) : normalize(30),
                    height: normalize(20),
                    width: normalize(20),
                    marginTop: normalize(5),
                  },
                  // showDot == true ? {tintColor: Colors.textYellow} : null,
                ]}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: showDot == true ? text_color : Colors.textColor,
                  fontSize: normalize(7),
                }}>
                {routeName}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null;
      })}
    </View>
  );
}

export default function TabNav(props) {
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaProvider>
      <Tab.Navigator
        initialRouteName="DetailsPage"
        tabBar={props => <TabUI {...props} />}
        screenOptions={{headerShown: false, lazy: true}}>
        <Tab.Screen name="Citation" component={Citation} />
        <Tab.Screen name="DetailsPage" component={DetailsPage} />
        <Tab.Screen name="Contribute" component={Contribute} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}
