import React from 'react';
import {View, StyleSheet} from 'react-native';
// import normalise from '../utils/helpers/normalize';

const Container = props => {
  return (
    <View style={(style.container, {...props.style})}>{props.children}</View>
  );
};

const style = StyleSheet.create({
  container: {
    maxWidth: normalize(300),
    width: normalize(300),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
export default Container;
