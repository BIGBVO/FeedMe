import React, { Component, Fragment } from 'react';
import { Text, Image as ReactImage, StyleSheet, TouchableOpacity } from 'react-native';

class Start extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {form, section, errorTextStyle} = styles;
    return (
      <Fragment style={styleXD.basicFrame}>
        <ReactImage source={require('./assets/feedme.png')} style={styleXD.logo} />
          <TouchableOpacity onPress={this.props.authLogin} style={styleXD.loginButton}>
              <Text style={styleXD.loginWords}>
                LOG IN
              </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.props.authRegisterPhoneGetVerify} style={styleXD.registerButton}>
              <Text style={styleXD.registerWords}>
                Register Now!
              </Text>
          </TouchableOpacity>
      </Fragment>
    );
  }
}

const styles = {
  form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  gray: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#888',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red',
  },
};

const styleXD = StyleSheet.create({
  "basicFrame": {
    "opacity": 1,
    "position": "relative",
    "backgroundColor": "rgba(255, 255, 255, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 375,
    "height": 812,
    "left": 0,
    "top": 0
  },

  "logo": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 20,
    "marginLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 180,
    "height": 180,
    "left": 112,
    "top": 165,
  },


  "registerButton": {
    "opacity": 1,
    "backgroundColor": "#FFFFFF",
    "marginTop": 49,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderRadius": 15,
    "borderColor": "#707070",
    "borderWidth":1,
    "width": 226,
    "height": 42,
    "textAlign": "center",
    "color": "rgba(242, 237, 237, 1)",
    "fontSize": 15
  },

  "registerWords": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "#707070",
    "fontSize": 15,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "AppleGothic",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 98,
    "height": 18,
    "left": 64,
    "top": 10,
  },

  "loginButton": {
    "opacity": 1,
    "backgroundColor": "#FFFFFF",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 10,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderRadius": 15,
    "borderColor": "#707070",
    "borderWidth":1,
    "width": 226,
    "height": 42,
    "textAlign": "center",
    "color": "rgba(242, 237, 237, 1)",
    "fontSize": 15,
  },
  "loginWords": {
    "opacity": 1,
    "backgroundColor": "#FFFFFF",
    "color": "#707070",
    "fontSize": 15,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "AppleGothic",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 50,
    "height": 18,
    "left": 88,
    "top": 10
  }
  
});

export {Start};
