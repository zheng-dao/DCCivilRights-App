import React, { useEffect, useState } from 'react';
import normalize from '../utils/helpers/normalize';
import PropTypes from 'prop-types';
import { Colors, Icons } from '../themes/Themes';
import Slider from 'react-native-slider';
import SoundPlayer from 'react-native-sound-player';
import { useFocusEffect } from '@react-navigation/native';

let infoInterval = null;
import { View, Image, Text, TouchableOpacity } from 'react-native';
export default function Player(props) {
  const [isAlreadyPlay, setisAlreadyPlay] = useState(false);
  const [playTime, setPlayTime] = useState('00:00');
  const [isPause, setIsPause] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeBall, setTimeBall] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let _onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      ({ success }) => {
        console.log('finished playing', success);

        if (success == true) {
          SoundPlayer.stop();

          setIsPlaying(false);
          setisAlreadyPlay(false);
          setIsPause(false);
          setTotalTime(0);
        }
      },
    );

    return () => {
      _onFinishedPlayingSubscription.remove();
    };
  });

  const _onStartPlayer = async () => {
    console.log('Player started');

    if (isPause == false) {
      try {
        if (isPlaying == false) {
          SoundPlayer.playUrl(props.audioURL);
          setIsPlaying(true);
          infoInterval = setInterval(getInfo, 500);
        } else {
          SoundPlayer.stop();

          clearInterval(infoInterval);
          setIsPlaying(false);
          setIsPause(false);
          setPlayTime('00:00');
        }
      } catch (e) {
        console.log(`cannot play the sound file`, e);
      }
    } else {
      try {
        infoInterval = setInterval(getInfo, 500);
        SoundPlayer.resume();
        setIsPause(false);
      } catch (e) {
        console.log(`cannot play the sound file`, e);
      }
    }
  };

  const _onPausePlayer = () => {
    try {
      SoundPlayer.pause();
      clearInterval(infoInterval);
      setIsPause(true);
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  };

  const getInfo = async () => {
    try {
      const info = await SoundPlayer.getInfo();
      const mainTime = parseInt(info?.currentTime);

      setTimeBall(mainTime); // The time shown in slider
      setTotalTime(parseInt(info?.duration)); // Total duration of the media to play
      setPlayTime(parseInt(info?.currentTime)); // Total time has elapsed
    } catch (e) {
      console.log('There is no song playing', e);
    }
  };

  const convertHMS = value => {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (hours == '00') {
      return minutes + ':' + seconds;
    } else {
      return hours + ':' + minutes + ':' + seconds;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsPause(false);
      return () => {
        SoundPlayer.pause();
        clearInterval(infoInterval);
      };
    }, []),
  );

  const changeTime = async seconds => {
    console.log('changeTime: ', seconds, totalTime, timeBall);
    let seektime = (seconds / 100) * totalTime;
    setTimeBall(Math.round(seektime) + timeBall);
    SoundPlayer.seek(Math.round(seektime));
  };

  const changeTrack = prevOrNext => {
    props.prevOrNextClicked(prevOrNext);
  };

  return (
    <View style={{}}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{
            color: Colors.textColor,
            paddingTop: normalize(10),
            paddingRight: normalize(10),
          }}>
          {convertHMS(timeBall)}
        </Text>
        <Slider
          minimumValue={0}
          maximumValue={totalTime}
          trackStyle={{
            height: normalize(4),
            width: normalize(200),
            borderRadius: normalize(10),
            backgroundColor: '#FA70B6',
          }}
          step={2}
          thumbStyle={{
            width: normalize(15),
            height: normalize(15),
            backgroundColor: '#D500F9',
          }}
          // thumbImage={Icons.sliderThumb}
          // animateTransitions={true}
          value={timeBall}
          minimumTrackTintColor="#D500F9"
          // onValueChange={seconds => }
          onSlidingComplete={val => changeTime(val)}
          onSlidingStart={val => console.log(val, 'val val')}
        />

        <Text
          style={{
            color: Colors.textColor,
            paddingTop: normalize(10),
            paddingLeft: normalize(10),
          }}>
          {convertHMS(totalTime)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          // backgroundColor: Colors.white,
          // width: '80%',
          // alignSelf: 'center',
        }}>
        <TouchableOpacity
          onPress={() => changeTrack('prev')}
          style={{ alignSelf: 'center' }}>
          <Image
            source={Icons.prev}
            style={{
              height: normalize(20),
              width: normalize(20),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {isAlreadyPlay == false ? (
          <TouchableOpacity

            onPress={() => {
              setisAlreadyPlay(true), _onStartPlayer();
            }}>

            <Image
              source={Icons.play}
              style={{
                height: normalize(80),
                width: normalize(80),
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setisAlreadyPlay(false), _onPausePlayer();
            }}>
            <Image
              source={Icons.pause}
              style={{
                height: normalize(80),
                width: normalize(80),
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => changeTrack('next')}
          style={{ alignSelf: 'center' }}>
          <Image
            source={Icons.next}
            style={{
              height: normalize(20),
              width: normalize(20),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
SoundPlayer.propTypes = {
  // onAnalyticsPress: PropTypes.func,
  // onCustomizePress: PropTypes.func,
  // onStartPress: PropTypes.func,
  // onStopPress: PropTypes.func,
  // title: PropTypes.string,
  // description: PropTypes.string,
  // time: PropTypes.string,
  // control: PropTypes.bool,

  url: PropTypes.string,
  interval: PropTypes.string,
  headerText: PropTypes.string,
  tickReq: PropTypes.bool,
  width: PropTypes.number,
  marginTop: PropTypes.number,
  color: PropTypes.string,
};

SoundPlayer.defaultProps = {
  onAnalyticsPress: () => { },
  onCustomizePress: () => { },
  onStartPress: () => { },
  onStopPress: () => { },
  // title: '',
  // description: '',
  // time: '',
  // control: true,

  url: '',
  interval: '',
  headerText: '',
  tickReq: false,
  width: normalize(100),
  marginTop: normalize(20),
  color: null,
};
