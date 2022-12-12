import React, { Fragment, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  ImageBackground,
  Image,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import normalize from '../utils/helpers/normalize';
import MapView, { Marker } from 'react-native-maps';
import { Colors, Fonts, Images, Icons } from '../themes/Themes';
import MyStatusBar from '../components/MyStatusBar';
// import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from 'react-redux';
import { getLocationDetails } from '../redux/Action/LocationAction';
import { getCMSDetails } from '../redux/Action/CMSAction';
import constants from '../utils/helpers/constants';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
export default function Home(props) {
  const [region, setRegion] = useState({
    latitude: '38.9072',
    longitude: '-77.0369',
    latitudeDelta: 0.092,
    longitudeDelta: 0.092,
  });
  const [visible, setVisible] = useState(false);
  const [marker, setMarker] = useState([]);
  const dispatch = useDispatch();
  const LocationReducer = useSelector(state => state.LocationReducer);
  const [tourData, setTourData] = useState(LocationReducer?.locationList?.data);

  let latitude = LocationReducer?.locationList?.data?.map(item => item.lat);
  let longitude = LocationReducer?.locationList?.data?.map(item => item.lng);
  const data = [
    {
      image: Images.image_1,
      title: 'U Street',
      location: 'Lorem ipsum dolor\n sit amet, \nconsectetur',
      audioURL:
        'https://www.chosic.com/wp-content/uploads/2021/07/The-Epic-Hero-Epic-Cinematic-Keys-of-Moon-Music.mp3',
      content: `U Street was once truly the heart of Black culture in America, attracting locals and visitors for an unparalleled music and nightlife scene.Perhaps not coincidentally, it’s also the birthplace of celebrated DC hero, jazz musician Duke Ellington. Today, this section of the city is as vibrant as ever, anchored by the lively 14th Street corridor to the west and the refurbished Howard Theatre bordering the Shaw neighborhood to the east, where a towering sculpture in reverence to Ellington stands.

Food is eclectic and exciting. One of the best ways to experience the food in the neighborhood is on a Forks Food Tour. From soul food to Italian to the world-famous Ben’s Chili Bowl and its signature half-smoke sausage, the area's a cornucopia of eats to be excited about. And uniquely, on the eastern end, you’ll find a handful of homey eateries in an area known as “Little Ethiopia” for its concentration of residents from that country. If you’ve never eaten with your hands before, now’s your chance.`,
      _sImg: [
        Images.s_image1,
        Images.s_image2,
        Images.s_image3,
        Images.s_image4,
      ],
      audioList: [
        'https://www.chosic.com/wp-content/uploads/2021/04/kvgarlic__largestreamoverloginforestmarch.mp3',
        'https://www.chosic.com/wp-content/uploads/2021/05/inossi-got-you.mp3',
        'https://www.chosic.com/wp-content/uploads/2021/04/And-So-It-Begins-Inspired-By-Crush-Sometimes.mp3',
        'https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-equinox.mp3',
      ],
    },
    {
      image: Images.capitol,
      title: 'Capitol',
      location: 'Lorem ipsum dolor\n sit amet,\n consectetur',
      audioURL:
        'https://www.chosic.com/wp-content/uploads/2021/07/Raindrops-on-window-sill.mp3',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      _sImg: [
        Images.s_image1,
        Images.s_image2,
        Images.s_image3,
        Images.s_image4,
      ],
    },
    {
      image: Images.image_2,
      title: 'Lafayette Square',
      location: 'Lorem ipsum dolor\n sit amet,\n consectetur',
      audioURL:
        'https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-equinox.mp3',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      _sImg: [
        Images.s_image1,
        Images.s_image2,
        Images.s_image3,
        Images.s_image4,
      ],
    },
    {
      image: Images.s_image3,
      title: 'U Street',
      location: 'Lorem ipsum dolor\n sit amet, \nconsectetur',
      audioURL:
        'https://www.chosic.com/wp-content/uploads/2021/04/And-So-It-Begins-Inspired-By-Crush-Sometimes.mp3',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      _sImg: [
        Images.s_image1,
        Images.s_image2,
        Images.s_image3,
        Images.s_image4,
      ],
    },
  ];
  // useEffect(() => {
  //   const unsuscribe = props.navigation.addListener('focus', payload => {
  //     if (Platform.OS == 'ios') {
  //       Geolocation.requestAuthorization('whenInUse')
  //         .then(response => {
  //           Geolocation.getCurrentPosition(
  //             position => {
  //               setRegion({
  //                 // latitude:position.coords.latitude
  //                 // longitude: position.coords.longitude,
  //                 latitude: '38.9072',
  //                 longitude: '-77.0369',
  //                 latitudeDelta: 0.092,
  //                 longitudeDelta: 0.092,
  //               });
  //             },
  //             error => {
  //               setVisible(false);
  //             },
  //             {
  //               enableHighAccuracy: false,
  //               timeout: 15000,
  //               maximumAge: 10000,
  //             },
  //           );
  //         })
  //         .catch(err => {
  //           console.log({'error is': err});
  //         });
  //     } else {
  //       requestlocPermission();
  //     }
  //   });
  //   return () => {
  //     unsuscribe();
  //   };
  // }, []);

  useEffect(() => {
    setMarker(
      LocationReducer?.locationList?.data.map((item, index) => {
        return {
          latitude: item.lat,
          longitude: item.lng,
        };
      }),
    );
  }, []);
  useEffect(() => {
    dispatch(getCMSDetails('about-us'));
    // dispatch(getCMSDetails('privacy-policy'));
  }, []);

  // const requestlocPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Real DC History Location Permission',
  //         message: 'Real DC History needs to access your location',
  //         buttonPositive: 'OK',
  //       },
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log(granted);
  //       Geolocation.getCurrentPosition(
  //         position => {
  //           console.log(position, 'This is position');
  //           setRegion({
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //             // latitude: '38.9072',
  //             // longitude: '-77.0369',
  //             latitudeDelta: 0.01,
  //             longitudeDelta: 0.01,
  //           });
  //         },
  //         error => {
  //           {
  //             console.log(error);
  //           }
  //         },
  //         {
  //           enableHighAccuracy: false,
  //           timeout: 200000,
  //           maximumAge: 3600000,
  //         },
  //       );
  //     } else {
  //       console.log('location permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  const renderMarker = () => {
    console.log('197', LocationReducer?.locationList?.data);
    return LocationReducer?.locationList?.data?.map((report, index) => (
      <Marker
        key={report.id}
        // title={report.title}
        flat={true}
        onPress={() => _goToLandmark(report)}
        coordinate={{
          latitude: parseFloat(report.lat),
          longitude: parseFloat(report.lng),
        }}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          locations={[0, 0.3, 0.9]}
          style={{
            width: normalize(20),
            height: normalize(20),
            borderRadius: normalize(10),
            // backgroundColor: '#FF1744',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          colors={['#D500F9', '#ED0D91', '#D500F9']}>
          <Text
            style={{
              color: Colors.white,
              fontSize: normalize(14),
              fontFamily: Fonts.RobotoBold,
            }}>
            {index + 1}
          </Text>
        </LinearGradient>
      </Marker>
    ));
  };

  const _goToLandmark = data => {
    console.log('_goToLandmark: ', data);
    dispatch(getLocationDetails(data));
    props.navigation.navigate('TabNav');
  };

  function renderModal() {
    return (
      <Modal
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={visible}
        style={{
          width: '70%',
          alignSelf: 'flex-start',
          margin: 0,
        }}
        animationInTiming={500}
        onBackdropPress={() => setVisible(false)}
        transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.white,
          }}>
          <ImageBackground
            source={Images.backgroundImage}
            style={{
              flex: 1,
            }}>
            <Image
              source={Icons.appIcon}
              resizeMode="contain"
              style={{
                width: normalize(205),
                height: normalize(120),
                marginTop:
                  Platform.OS === 'android' ? normalize(10) : normalize(50),
                alignSelf: 'center',
              }}
            />

            <View style={{ marginTop: normalize(90) }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  props.navigation.navigate('AboutPage'), setVisible(!visible);
                }}
                style={{ marginBottom: normalize(30), alignSelf: 'center' }}>
                <Text
                  style={{
                    fontSize: normalize(15),
                    color: Colors.white,
                    fontFamily: Fonts.RobotoRegular,
                  }}>
                  About Real DC History
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible(!visible),
                    props.navigation.navigate('CreatorBios');
                }}
                style={{ marginBottom: normalize(30), alignSelf: 'center' }}>
                <Text
                  style={{
                    fontSize: normalize(15),
                    color: Colors.white,
                    fontFamily: Fonts.RobotoRegular,
                  }}>
                  Creator Bios
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible(!visible),
                    props.navigation.navigate('PrivacyPolicy');
                }}
                style={{ marginBottom: normalize(30), alignSelf: 'center' }}>
                <Text
                  style={{
                    fontSize: normalize(15),
                    color: Colors.white,
                    fontFamily: Fonts.RobotoRegular,
                  }}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </Modal>
    );
  }

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
        <View>
          <TouchableOpacity
            onPress={() => {
              setVisible(!visible);
            }}
            style={{
              width: normalize(40),
              height: normalize(40),
              marginLeft: normalize(10),
            }}>
            <Image
              source={Icons.menu}
              style={{
                height: normalize(20),
                width: normalize(20),
                marginTop: normalize(10),
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={{ marginLeft: normalize(10) }}>
            <View style={{ flexDirection: 'row', marginTop: normalize(15) }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(26),
                  fontFamily: Fonts.RobotoBold,
                }}>
                DC Civil Rights Tour
              </Text>
            </View>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(13),
                fontFamily: Fonts.RobotoRegular,
                paddingTop: normalize(5),
                color: Colors.textColor,
              }}>
              {
                'Choose a nearby location and learn about\nthe hidden history of DC.'
              }
            </Text>
          </View>

          <View
            style={{
              height: normalize(330),
              width: normalize(295),
              alignSelf: 'center',
              marginTop: normalize(10),
              borderRadius: normalize(45),
              // backgroundColor:'grey'
            }}>
            {/* {region?.longitude && ( */}
            <MapView
              style={{
                height: '100%',
                width: '100%',
                borderRadius: normalize(25),
              }}
              mapType={Platform.OS === 'android' ? 'hybrid' : 'mutedStandard'}
              region={{
                latitude: 38.9072,
                longitude: -77.0369,
                latitudeDelta: 0.095,
                longitudeDelta: 0.095,
              }}
              showsUserLocation={true}
              toolbarEnabled={true}
              zoomEnabled={true}
              loadingEnabled={true}
              showsCompass={true}
              showsScale={true}
              showsBuildings={false}
              showsMyLocationButton={false}
              showsTraffic={false}
              moveOnMarkerPress={false}
              userLocationPriority={'high'}
              followsUserLocation={false}
              rotateEnabled={true}
              showsPointsOfInterest={false}
              paddingAdjustmentBehavior={'always'}
              zoomControlEnabled={true}>
              {LocationReducer?.locationList?.data && renderMarker()}
            </MapView>
            {/* )} */}
          </View>

          <FlatList
            data={LocationReducer?.locationList?.data}
            horizontal={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  _goToLandmark(item);
                }}
                style={{
                  width: normalize(140),
                  height: normalize(227),
                  borderRadius: normalize(10),
                  marginTop: normalize(15),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: normalize(10),
                  // backgroundColor: 'red',
                }}>
                <ImageBackground
                  source={Images.cardBg}
                  resizeMode="cover"
                  style={{ width: normalize(150), height: '100%' }}>
                  <Image
                    source={
                      item.landmark_image.length > 0
                        ? {
                          uri:
                            constants.BASE_IMAGE_URL +
                            item.landmark_image[0].image,
                        }
                        : null
                    }
                    style={{
                      height: normalize(70),
                      width: normalize(110),
                      marginLeft: normalize(10),
                      marginTop: normalize(5),
                      borderRadius: normalize(10),
                    }}
                  />

                  <Text
                    numberOfLines={1}
                    style={{
                      marginLeft: normalize(12),
                      marginTop: normalize(10),
                      color: Colors.white,
                      fontSize: normalize(13),
                      fontFamily: Fonts.RobotoBold,
                      width: normalize(105),
                    }}>
                    {item.title}
                  </Text>

                  <Text
                    numberOfLines={2}
                    style={{
                      color: Colors.textColor,
                      fontSize: normalize(10),
                      marginLeft: normalize(12),
                      width: normalize(100),
                    }}>
                    {item.content}
                  </Text>

                  {/* <TouchableOpacity
                    onPress={() => {
                      _goToLandmark(item);
                    }} */}
                  <View style={{ flexDirection: 'row', marginTop: normalize(7) }}>
                    <Image
                      source={Icons.location}
                      resizeMode="contain"
                      style={{
                        height: normalize(12),
                        width: normalize(12),
                        marginLeft: normalize(10),
                      }}
                    />
                    <Text
                      // numberOfLines={2}
                      style={{
                        color: Colors.textColor,
                        fontSize: normalize(10),
                        paddingLeft: normalize(2),
                        width: normalize(90),
                      }}>
                      {item.address}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
          />
          {renderModal()}
        </ScrollView>
      </ImageBackground>
    </Fragment>
  );
}
