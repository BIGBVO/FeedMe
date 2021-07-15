import React, { Component, Fragment } from 'react';
import {View, Text, ScrollView, Image as ReactImage, StyleSheet, TouchableOpacity } from 'react-native';
import {Input, TextLink, Loading, Button } from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      loading: false
    };

    this.loginUser = this.loginUser.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
  }

  loginUser() {
    const { username, password } = this.state;

    this.setState({ error: '', loading: true });

    // NOTE Post to HTTPS only in production
    axios.post("http://localhost:3000/api/login",{
        Username: username,
        Password: password
    })
    .then((response) => {
      console.log(response);
      if(response.data.token.length > 1) {
        deviceStorage.saveItem("id_token", response.data.token);
        this.props.newJWT(response.data.token);
      } else{
        console.log(error);
        deviceStorage.deleteJWT();
        this.onLoginFail();
      }
    })
    .catch((error) => {
      console.log(error);
      deviceStorage.deleteJWT();
      this.onLoginFail();
    });
  }


  onLoginFail() {
    this.setState({
      error: 'Login Failed',
      loading: false
    });
  }
  
  render() {
    const {username, password, error, loading} = this.state;
    const {form, section, errorTextStyle} = styles;

    return (
      <Fragment>
        <ReactImage source={require('./assets/feedme.png')} style={styleXD.logo} />
          <Text style={styleXD.username}> Username: </Text>
          <View style={styleXD.input}>
            <Input 
              style={styleXD.inputBorder}
              placeholder="Username"
              value={username}
              onChangeText={(username) => this.setState({username})}
            />
          </View>
         
          <Text style={styleXD.password}> Password: </Text>
          <View style={styleXD.input}>
            <Input
              secureTextEntry
              style={styleXD.inputBorder}
              placeholder="Password"
              value={password}
              onChangeText={(password) => this.setState({password})}
            />
          </View>

          <Text style={errorTextStyle}>{error}</Text>

          {!loading ?
            <TouchableOpacity onPress={this.loginUser} style={styleXD.loginButton}>
              <Text style={styleXD.loginWords}>
                LOG IN
              </Text>
            </TouchableOpacity>
            :
            <Loading size={'large'} />
          }
          
        <Text style={styleXD.doesntHaveAnAccountRegisterNow} onPress={this.props.authRegisterPhoneGetVerify}>
          Don't have an account? Register!
        </Text>
        <Text style={styleXD.forgetPassword} onPress={this.props.authForgetPhoneGetVerify}>
        Oppps! Forgot my Password!
        </Text>
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
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red',
    top: 40
  },
};

const styleXD = StyleSheet.create({
  "username": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(145, 133, 133, 1)",
    "fontSize": 20,
    "fontWeight": "700",
    "fontFamily": "AppleGothic",
    "textAlign": "left",
    "width": 284,
    "height": 18,
    "top" : 55,
    "left" : 2
  },
  "password": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(145, 133, 133, 1)",
    "fontSize": 20,
    "fontWeight": "700",
    "fontFamily": "AppleGothic",
    "textAlign": "left",
    "width": 284,
    "height": 18,
    "top" : 55,
    "left" : 2
  },
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
    "marginBottom": 0,
    "marginLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 152,
    "height": 152,
    "left": 130,
    "top": 120
  },
  "input": {
    "opacity": 1,
    "backgroundColor": "transparent",
    "marginTop":35, 
    "alignSelf": "center",
    "width": 284,
    "height": 42,
    "top": 30,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(112, 112, 112, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(112, 112, 112, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(112, 112, 112, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(112, 112, 112, 1)",
    "borderTopLeftRadius": 15,
    "borderTopRightRadius": 15,
    "borderBottomLeftRadius": 15,
    "borderBottomRightRadius": 15,
  },
  "inputBorder": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 1)",
    "marginBottom": 10,
    "width": 284,
    "height": 42,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(112, 112, 112, 1)",
    "fontSize": 15,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "AppleGothic",
    "textAlign": "center"
  },

  "loginButton": {
    "opacity": 1,
    "backgroundColor": "rgba(140, 187, 25, 1)",
    "marginTop": 90,
    "marginRight": 0,
    "marginBottom": 10,
    "borderTopLeftRadius": 15,
    "borderTopRightRadius": 15,
    "borderBottomLeftRadius": 15,
    "borderBottomRightRadius": 15,
    "width": 226,
    "height": 48,
    "textAlign": "center",
    "color": "rgba(242, 237, 237, 1)",
    "fontSize": 25,
    "top":100
  },
  "loginWords": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(242, 237, 237, 1)",
    "fontSize": 25,
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
    "width": 84,
    "height": 30,
    "left": 70,
    "top": 10
  },
  
  "doesntHaveAnAccountRegisterNow": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(145, 133, 133, 1)",
    "fontSize": 15,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "AppleGothic",
    "textAlign": "center",
    "marginTop": 10,
    "width": 284,
    "height": 18,
    "top": 150
  },
  "forgetPassword": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(145, 133, 133, 1)",
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
    "width": 208,
    "height": 18,
    "left": 110,
    "top": 720
  }
});

export {Login};
