import React, {Component, Fragment} from 'react';
import {Input, TextLink, Loading, Button} from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import { View, Text, ScrollView, Image as ReactImage, StyleSheet, TouchableOpacity } from 'react-native';

class RegisterVerificationCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyCode: '',
      request_id: '',
      temp_access_token: '',
      error: '',
      loading: false,

    };
    this.verification = this.verification.bind(this);
    this.onVerifyFail = this.onVerifyFail.bind(this);
    this.loadRequestId = deviceStorage.loadRequestID.bind(this);
    this.loadTempAccessToken = deviceStorage.loadTempAccessToken.bind(this);

    this.loadRequestId();
    this.loadTempAccessToken();

    console.log(this.request_id);
    console.log(this.tempAccessToken);
  }

  verification() {
    const {verifyCode, request_id, temp_access_token} = this.state;
    this.setState({error: '', loading: true});

    console.log(request_id);
    console.log(temp_access_token);

    axios.post('http://localhost:3000/api/check',{
      request_id: request_id,
      code: verifyCode,
    },
    {
      headers: {
        Authorization: temp_access_token
      },
    }).then((response) => {
        console.log(response);
        deviceStorage.deleteTempAccessToken();
        deviceStorage.saveItem('tempAccessToken', response.data.token);
        this.props.authRegis();
      }).catch((error) => {
        console.log(error);
        this.onVerifyFail();
      });
  }
  onVerifyFail() {
    this.setState({
      error: 'Verify Failed',
      loading: false,
    });
  }

  cancel(){
    axios.post('http://localhost:3000/api/cancel',{
      request_id: request_id,
    }).then((response) => {
      console.log(response);
      deviceStorage.deleteTempAccessToken();
      deviceStorage.deleteRequestID();
      
      this.props.authRegisterPhoneGetVerify;
    }).catch((error) =>{
      // console.log(error);
      // this.onVerifyFail();
    });
  }

  render() {
    const {verifyCode,error,loading} = this.state;
    const {form, section, errorTextStyle} = styles;

    return (
      <Fragment style={styleXD.basicFrame}>
        <ReactImage source={require('./assets/feedme.png')} style={styleXD.logo} />
        <Text style={styleXD.phoneNumber}>Verification Code:</Text>
          <View style={styleXD.input}>
            <Input 
              style={styleXD.inputBorder}
              placeholder="Verify Code"
              value={verifyCode}
              onChangeText={(verifyCode) => this.setState({verifyCode})}
            />
          </View>

        

          <Text style={errorTextStyle}>{error}</Text>

          {!loading ?
            <TouchableOpacity onPress={this.verification} style={styleXD.verificationBotton}>
              <Text style={styleXD.verificationWords}>
                Verify
              </Text>
            </TouchableOpacity>
            :
            <Loading size={'large'} />
          }

        <Text style={styleXD.didnotreceivecode} onPress={this.cancel}>
            Doesn't get it? Resend it!
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
  },
};

const styleXD = StyleSheet.create({
  "phoneNumber": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(145, 133, 133, 1)",
    "fontSize": 20,
    "fontWeight": "700",
    "fontFamily": "AppleGothic",
    "textAlign": "left",
    "width": 284,
    "height": 18,
    "top" : 60,
    "left" : 4
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
    "width": 180,
    "height": 180,
    "left": 115,
    "top": 100
  },
  "input": {
    "opacity": 1,
    "backgroundColor": "transparent",
    "marginTop":35, 
    "alignSelf": "center",
    "top": 40,
    "width": 284,
    "height": 42,
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
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 10,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 284,
    "height": 42,
    "left": 0,
    "top": 0,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(112, 112, 112, 1)",
    "fontSize": 15,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "AppleGothic",
    "textAlign": "center"
  },

  "verifyCodeBotton": {
    "opacity": 1,
    "backgroundColor": "rgba(140, 187, 25, 1)",
    "marginTop": 50,
    "marginRight": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopLeftRadius": 15,
    "borderTopRightRadius": 15,
    "borderBottomLeftRadius": 15,
    "borderBottomRightRadius": 15,
    "width": 226,
    "height": 48,
    "textAlign": "center",
    "color": "rgba(242, 237, 237, 1)",
    "fontSize": 25,
    "top" : 120,
  },
  "verifyCodeWords": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(242, 237, 237, 1)",
    "fontSize": 20,
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
    "width": 150,
    "height": 30,
    "left": 40,
    "top": 14
  
  },
  "getAccountLogin": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(145, 133, 133, 1)",
    "fontSize": 15,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "AppleGothic",
    "textAlign": "center",
    "marginTop": 10,
    "top" : 130,
    "width": 284,
    "height": 18,
  },

  "verificationBotton": {
    "opacity": 1,
    "backgroundColor": "rgba(140, 187, 25, 1)",
    "marginTop": 100,
    "top" : 100,
    "marginRight": 0,
    "marginBottom": 10,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopLeftRadius": 15,
    "borderTopRightRadius": 15,
    "borderBottomLeftRadius": 15,
    "borderBottomRightRadius": 15,
    "width": 226,
    "height": 48,
    "textAlign": "center",
    "color": "rgba(242, 237, 237, 1)",
    "fontSize": 25,
  },
  "verificationWords": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(242, 237, 237, 1)",
    "fontSize": 20,
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
    "width": 150,
    "height": 30,
    "left": 40,
    "top": 14
  
  },

  "didnotreceivecode": {
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
    "left": 105,
    "top": 700
  }
 
  
});
export {RegisterVerificationCode};
