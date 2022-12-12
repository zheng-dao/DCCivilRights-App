import React, { Fragment, useEffect, useState } from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable
} from 'react-native';
import normalize from '../utils/helpers/normalize';
import { Colors, Fonts, Images, Icons } from '../themes/Themes';
import MyStatusBar from '../components/MyStatusBar';
import Player from '../components/SoundPlayer';
import { useDispatch, useSelector } from 'react-redux';
import constants from '../utils/helpers/constants';
import { getLocationDetails } from '../redux/Action/LocationAction';

export default function DetailsPage(props) {
  const [showLandMark, setShowLandMark] = useState(false);
  const dispatch = useDispatch();
  const LocationReducer = useSelector(state => state.LocationReducer);

  const [landMarkImage, setLandMarkImage] = useState(LocationReducer?.locationDetails?.landmark_image?.length > 0
    ? LocationReducer.locationDetails.landmark_image[0].image
    : null);
  const index = LocationReducer?.locationList?.data.findIndex(x => x.address === LocationReducer?.locationDetails?.address);
  const [count, setCount] = useState(index);

  useEffect(() => {
    setLandMarkImage(LocationReducer?.locationDetails?.landmark_image?.length > 0
      ? LocationReducer.locationDetails.landmark_image[0].image
      : null)
  }, [LocationReducer?.locationDetails]);

  const showLandMarkImage = (item) => {
    setLandMarkImage(item.image)
  }

  const prevOrNextClicked = (prevOrNext) => {
    if (prevOrNext === 'next') {
      if (count >= LocationReducer?.locationList?.data.length - 1) {
        return;
      }
      setCount(count + 1);
      dispatch(getLocationDetails(LocationReducer?.locationList?.data[count + 1]));
    } else {
      if (count <= 0) {
        return;
      }
      setCount(count - 1);
      dispatch(getLocationDetails(LocationReducer?.locationList?.data[count - 1]));
    }
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
        <View
          style={{
            marginLeft: normalize(10),
          }}>
          <View style={{ flexDirection: 'row', marginTop: normalize(15) }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
              <Image
                source={Icons.left_arrow}
                style={{ height: normalize(20), width: normalize(40) }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(16),
                fontFamily: Fonts.RobotoBold,
                marginLeft: normalize(90),
              }}>
              Home
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={
              landMarkImage
                ? {
                  uri: constants.BASE_IMAGE_URL + landMarkImage,
                }
                : null
            }
            // source={{
            //   uri:
            //     constants.BASE_IMAGE_URL +
            //     LocationReducer.locationDetails.landmark_image[0].image,
            // }}
            resizeMode="contain"
            style={{
              alignSelf: 'center',
              marginTop: normalize(20),
              width: '90%',
              height: normalize(160),
            }}
          />

          <View style={{ marginVertical: normalize(20) }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {LocationReducer?.locationDetails?.landmark_image?.map(
                (item, i) => {
                  return (
                    <Pressable key={i} onPress={() => showLandMarkImage(item)}>
                      <Image
                        resizeMode="contain"
                        source={{
                          uri: constants.BASE_IMAGE_URL + item.image,
                        }}
                        style={{
                          height: normalize(80),
                          width: normalize(80),
                          marginLeft: normalize(12),
                          borderRadius: normalize(20),
                        }}
                      />
                    </Pressable>
                  );
                },
              )}
            </ScrollView>
          </View>

          {showLandMark === false ? (
            <View>
              <View
                style={{
                  // width: '80%',
                  height: normalize(120),
                  alignSelf: 'center',
                  // backgroundColor: Colors.white,
                }}>
                <Player
                  width={normalize(240)}
                  marginTop={normalize(25)}
                  color={Colors.textColor}
                  audioURL={
                    constants.BASE_IMAGE_URL +
                    LocationReducer.locationDetails?.audio
                  }
                  // audioList={props.route.params.data.audioList}
                  prevOrNextClicked={(prevOrNext) => prevOrNextClicked(prevOrNext)}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: normalize(40),
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(16),
                    fontFamily: Fonts.RobotoBold,
                    padding: normalize(10),
                    marginLeft: normalize(15),
                  }}>
                  {LocationReducer.locationDetails?.title}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowLandMark(!showLandMark)}
                  style={{
                    marginRight: normalize(15),
                  }}>
                  <Image
                    source={Icons.landMark}
                    style={{ height: normalize(40), width: normalize(40) }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: normalize(10),
                  backgroundColor: '#373737',
                  borderRadius: normalize(10),
                  margin: normalize(10),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(13),
                    fontFamily: Fonts.RobotoRegular,
                    padding: normalize(10),
                  }}>
                  {LocationReducer.locationDetails?.content}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
              <Image
                source={Icons.complete}
                style={{
                  width: normalize(120),
                  height: normalize(120),
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  marginTop: normalize(15),
                  fontSize: normalize(18),
                  fontFamily: Fonts.RobotoBold,
                  color: Colors.white,
                }}>
                Landmark Complete!
              </Text>
            </View>
          )}

          <View style={{ marginBottom: normalize(20) }} />
        </ScrollView>
      </ImageBackground>
    </Fragment>
  );
}
