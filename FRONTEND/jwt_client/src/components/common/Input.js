import React from 'react';
import {View, TextInput, Text} from 'react-native';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  multiline,
  numberOfLines,
}) => {
  const {inputStyle, labelStyle, containerStyle} = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoCapitalize="none"
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={inputStyle}
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 16,
    flex: 1,
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 0,
    fontSize: 18,
    lineHeight: 23,
    flex: 3,
  },
};

export {Input};
