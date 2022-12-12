import React from 'react';
import {ActivityIndicator, SafeAreaView, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {Images, Colors, Icons} from '../../themes/Themes';

export default function Loader(props) {
  return props.visible ? (
    <SafeAreaView
      style={{
        flex: 1,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 10,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: Dimensions.get('window').height,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color={'#e98879'} />
    </SafeAreaView>
  ) : null;
}

Loader.propTypes = {
  visible: PropTypes.bool,
};

Loader.defaultProps = {
  visible: false,
};
