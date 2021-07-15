import React, {Component, Fragment} from 'react';
import {Input, TextLink, Loading, Button} from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import { View, Text, Image as ReactImage, StyleSheet, TouchableOpacity } from 'react-native';

class RegisterGetPhoneVerifyCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: '',
      error: '',
      loading: false,
    };

    this.verifyPhoneNum = this.verifyPhoneNum.bind(this);
    this.onVerifyFail = this.onVerifyFail.bind(this);
  }

  verifyPhoneNum() {
    const {phone_number} = this.state;
    this.setState({error: '', loading: true});

    axios.post('http://localhost:3000/api/verify',{
          PhoneNo: phone_number
    })
    .then((response) => {
        console.log(response);
        deviceStorage.saveItem('phoneNumber', phone_number);
        deviceStorage.saveItem('tempAccessToken', response.data.token);
        deviceStorage.saveItem('request_id', response.data.result.request_id);
        this.props.authRegisterPhoneVerification();
        // Then some logic here to get to next page
      }).catch((error) => {
        this.onVerifyFail();
      });
  }
  onVerifyFail() {
    this.setState({
      error: 'Incorrect Phone Number',
      loading: false,
    });
  }

//   stateCheck(){
//     const {phone_number} = this.state;
//     if(phone_number == ''){
//         alert('Please enter the correct phone number');
//     }


//   }
  render() {
    const {phone_number,error,loading} = this.state;
    const {form, section, errorTextStyle} = styles;

    return (
      <Fragment style={styleXD.basicFrame}>
        <ReactImage source={require('./assets/feedme.png')} style={styleXD.logo} />

        <Text style={styleXD.phoneNumber}>
        Phone Number:
            </Text>
          <View style={styleXD.input}>
            <Input 
              style={styleXD.inputBorder}
              placeholder="Phone number"
              value={phone_number}
              onChangeText={(phone_number) => this.setState({phone_number})}
            />
          </View>

          <Text style={errorTextStyle}>{error}</Text>
          {!loading ?
            <TouchableOpacity onPress={this.verifyPhoneNum}  style={styleXD.verifyCodeBotton}>
              <Text style={styleXD.verifyCodeWords}>
                Get Verfiy Code
              </Text>
            </TouchableOpacity>
            :
            <Loading size={'large'} />
          }

        <Text onPress={this.props.authLogin} style={styleXD.getAccountLogin}>
          Already have an Account? Login Now!
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
  }
  
});
export {RegisterGetPhoneVerifyCode};
