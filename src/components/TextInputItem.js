import React from 'react';
import {View, Image, TextInput} from 'react-native';
import normalise from '../utils/helpers/normalize';
import PropTypes from 'prop-types';

import {Colors, Fonts} from '../themes/Themes';
import Container from './Container';

export default function TextInputItem(props) {
  function onChangeText(text) {
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  }

  function onFocus() {
    if (props.onFocus) {
      props.onFocus();
    }
  }

  function onBlur() {
    if (props.onBlur) {
      props.onBlur();
    }
  }

  return (
    <Container
      style={{
        borderRadius: normalise(10),
        marginTop: props.marginTop,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.7)',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: normalise(57),
          elevation: 20,
        }}>
        <Image
          style={{
            height: normalise(12),
            width: normalise(12),
            marginLeft: normalise(15),
          }}
          source={props.image || props.image != '' ? props.image : null}
          resizeMode="contain"
        />

        <TextInput
          style={{
            paddingLeft: normalise(3),
            paddingRight: normalise(14),
            marginLeft: normalise(10),
            flex: 1,
            textAlign: props.textAlign,
            letterSpacing: normalise(props.letterSpacing),
            color: props.color,
            fontFamily: Fonts.robotoRegular,
            fontSize: normalise(props.fontSize),
            height: normalise(45),
          }}
          caretHidden={props.caretHidden}
          maxLength={props.maxLength}
          secureTextEntry={props.isSecure}
          multiline={props.multiline}
          autoCapitalize={props.autoCapitalize}
          placeholder={props.placeholder}
          editable={props.editable}
          placeholderTextColor={props.placeholderTextColor}
          keyboardType={props.keyboardType}
          value={props.value}
          onChangeText={text => {
            onChangeText(text);
          }}
        />
      </View>
    </Container>
  );
}

TextInputItem.propTypes = {
  marginTop: PropTypes.number,
  image: PropTypes.any,
  maxLength: PropTypes.number,
  isSecure: PropTypes.bool,
  multiline: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  color: PropTypes.string,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
  letterSpacing: PropTypes.number,
  fontSize: PropTypes.number,
  editable: PropTypes.bool,
  borderColor: PropTypes.string,
  fontWeight: PropTypes.string,
  textAlign: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  caretHidden: PropTypes.bool,
};

TextInputItem.defaultProps = {
  marginTop: 0,
  image: '',
  maxLength: 40,
  isSecure: false,
  multiline: false,
  autoCapitalize: 'none',
  placeholder: '',
  placeholderTextColor: Colors.darkgrey,
  keyboardType: 'default',
  value: '',
  onChangeText: null,
  color: Colors.white,
  imageHeight: normalise(10),
  imageWidth: normalise(10),
  editable: true,
  borderColor: Colors.grey,
  onFocus: null,
  onBlur: null,
  letterSpacing: 0,
  fontSize: 12,
  textAlign: 'left',
  caretHidden: false,
};
