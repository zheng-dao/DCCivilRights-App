import React, {Fragment, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,ScrollView
} from 'react-native';
import normalize from '../utils/helpers/normalize';
import {Colors, Fonts, Images, Icons} from '../themes/Themes';
import MyStatusBar from '../components/MyStatusBar';
import TextInputComponent from '../components/TextInputComponent';
import {createContribution} from '../redux/Action/ContributionAction';
import showErrorAlert from '../utils/helpers/Toast';
import DropDown from '../components/Dropdown';
import {useDispatch, useSelector} from 'react-redux';
import Picker from '../components/Picker';
import Status from '../utils/helpers/Status';
import {CONTRIBUTE} from '../redux/Store/TypeConstants';
import {getLocationList} from '../redux/Action/LocationAction';

export default function Contribute(props) {
  const [location, setLocation] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [locationList, setLocationList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  const [showLocation, setShowLocation] = useState(false);

  const LocationReducer = useSelector(state => state.LocationReducer);
  const ContributionReducer = useSelector(state => state.ContributionReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (LocationReducer.locationList.data.length > 0) {
      setLocationList(LocationReducer.locationList.data);
    }
  }, []);

  useEffect(() => {
    console.log(selectedLocation);
  }, [selectedLocation]);

  Status(
    ContributionReducer.status,
    CONTRIBUTE.CREATE_CONTRIBUTION_REQUEST.type,
    () => {
      showErrorAlert('Submitted successfully');
      props.navigation.navigate('Home');
      dispatch(getLocationList());
    },
    () => {
      showErrorAlert(PostReducer?.error?.message);
    },
  );

  const isValid = () => {
    let emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!selectedLocation) {
      showErrorAlert('Please select location');
    } else if (!firstName) {
      showErrorAlert('Please enter name');
    } else if (!lastName) {
      showErrorAlert('Please enter last name');
    } else if (!email) {
      showErrorAlert('Please enter email');
    } else if (!emailCheck.test(email)) {
      showErrorAlert('Please enter valid email id');
    } else if (!phone) {
      showErrorAlert('Please enter phone number');
    } else {
      let _sLocation = locationList.filter(item => {
        return item.selected === true;
      });
      var tArray = [];

      for (let i = 0; i < _sLocation.length; i++) {
        const element = _sLocation[i];
        // let obj = {};
        // obj.landmark_id = element.id;
        tArray.push(element.id);
      }

      let data = {};
      data.locations = tArray;
      data.first_name = firstName.trim();
      data.last_name = lastName.trim();
      data.email = email;
      data.phone = phone;
      // console.log(tArray);
      dispatch(createContribution(data));
    }
  };

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
        <View style={{marginHorizontal: normalize(10),flex:1}}>
          <View style={{flexDirection: 'row', marginTop: normalize(15)}}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
              <Image
                source={Icons.left_arrow}
                style={{height: normalize(20), width: normalize(40)}}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(18),
                fontFamily: Fonts.RobotoBold,
                marginLeft: normalize(20),
              }}>
              Share Your Thoughts
            </Text>
          </View>
          <ScrollView bounce={false} showsVerticalScrollIndicator={false}>
          <Text
            style={{
              color: Colors.white,
              fontSize: normalize(14),
              fontFamily: Fonts.RobotoRegular,
              margin: normalize(17),
            }}>
            We want to hear your feedback! Let us know what landmarks you want
            to see added to the DC Civil Rights Tour App
          </Text>
          <View
            style={{
              width: '90%',
              height: normalize(45),
              borderColor: '#01403d',
              borderWidth: 1,
              alignItems: 'center',
              borderRadius: normalize(10),
              marginTop: normalize(2),
              marginLeft: normalize(17),
            }}>
            <DropDown
              value={selectedLocation}
              marginTop={normalize(5)}
              placeholder="Location"
              onPress={() => setShowLocation(true)}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <TextInputComponent
              marginTop={normalize(15)}
              borderRadius={normalize(10)}
              borderWidth={1}
              borderColor={'#01403d'}
              placeholderTextColor={'#FFFFFF'}
              placeholder={'First Name'}
              value={firstName}
              color={Colors.white}
              onChangeText={text => setFirstName(text)}
              width={'40%'}
              height={normalize(45)}
            />
            <TextInputComponent
              marginTop={normalize(15)}
              borderRadius={normalize(10)}
              borderWidth={1}
              placeholderTextColor={'#FFFFFF'}
              placeholder={'Last Name'}
              value={lastName}
              color={Colors.white}
              onChangeText={text => setLastName(text)}
              width={'40%'}
              height={normalize(45)}
              borderColor={'#01403d'}
            />
          </View>
          <TextInputComponent
            marginTop={normalize(15)}
            borderRadius={normalize(10)}
            borderWidth={1}
            placeholderTextColor={'#FFFFFF'}
            placeholder={'Email Address'}
            value={email}
            color={Colors.white}
            onChangeText={text => setEmail(text)}
            width={'90%'}
            height={normalize(45)}
            borderColor={'#01403d'}
          />
          <TextInputComponent
            marginTop={normalize(15)}
            borderRadius={normalize(10)}
            borderWidth={1}
            placeholderTextColor={'#FFFFFF'}
            placeholder={'Phone'}
            value={phone}
            color={Colors.white}
            onChangeText={text => setPhone(text)}
            width={'90%'}
            height={normalize(45)}
            borderColor={'#01403d'}
            keyboardType={'numeric'}
          />
         
          <TouchableOpacity
          onPress={() => isValid()}
          activeOpacity={0.2}
          style={{
            marginLeft: normalize(28),
            width: normalize(100),
            height: normalize(30),
            marginTop: normalize(50),
          }}>
          <Image
            source={Images.submit}
            resizeMode="contain"
            style={{
              height: normalize(40),
              width: normalize(110),
              borderRadius: normalize(5),
            }}
          />
        </TouchableOpacity>
        </ScrollView>
        </View>

        
      
        <Picker
          backgroundColor={Colors.white}
          dataList={locationList}
          modalVisible={showLocation}
          onBackdropPress={() => setShowLocation(false)}
          renderData={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  const _temTagdata = [...locationList];
                  _temTagdata[index].selected = !_temTagdata[index].selected;
                  const _Stl = _temTagdata?.filter(it => it.selected == true);
                  if (_Stl.length > 1) {
                    setSelectedLocation(_Stl.map(im => im.address).join(', '));
                  } else if (_Stl.length == 1) {
                    setSelectedLocation(_Stl[0].address);
                  } else {
                    setSelectedLocation('');
                  }
                  setLocationList(_temTagdata);
                }}
                style={[
                  style.dropDownItem,
                  {flexDirection: 'row', alignItems: 'center'},
                ]}>
                <Image
                  source={
                    item.selected == true ? Icons.tick : Icons.blank_circle
                  }
                  style={{
                    height: normalize(15),
                    width: normalize(15),
                    marginRight: normalize(10),
                  }}
                  resizeMode="contain"
                />

                <Text
                  style={[
                    style.dropDownItemText,
                    item.selected == true ? {color: Colors.deepGreen} : null,
                  ]}>
                  {item.address}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
         
      </ImageBackground>
    
    </Fragment>
  );
}
const style = StyleSheet.create({
  dropDownItemText: {
    fontSize: normalize(14),
    lineHeight: normalize(14),
    fontFamily: Fonts.Montserrat_Regular,
  },
  dropDownItem: {
    paddingVertical: normalize(12),
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: normalize(1),
  },
});
