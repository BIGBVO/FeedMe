import React, {Component, Fragment} from 'react';
import {View, Text, Image as ReactImage, StyleSheet, TouchableOpacity} from 'react-native';
import {Input} from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password_confirmation: '',
      phone_number: '',
      temp_access_token: '',
      error: '',
      loading: false,
      stateCheck: 1, //0 means ready to login, 1 means missing mandatory information, 2 means passwords do not match, 3 means passwordlength samller than 5.
    };

    this.passwordChange = this.passwordChange.bind(this);
    this.onChangeFail = this.onChangeFail.bind(this);

    this.valueDefine = this.valueDefine.bind(this);
    this.stateCheck = this.stateCheck.bind(this);
    this.stateSwitch = this.stateSwitch.bind(this);

    this.informationAlert = this.informationAlert.bind(this);
    this.passwordAlert = this.passwordAlert.bind(this);
    this.passwordLengthAlert = this.passwordLengthAlert.bind(this);

    this.loadPhoneNumber = deviceStorage.loadPhoneNumber.bind(this);
    this.loadTempAccessToken = deviceStorage.loadTempAccessToken.bind(this);

    this.loadPhoneNumber();
    this.loadTempAccessToken();
  }

  passwordChange() {
    const {password, phone_number, temp_access_token} = this.state;
    this.setState({error: '', loading: true});
    axios.post('http://localhost:3000/api/user/reset',{
      Password: password
    },
    {
      headers: {
        authorization: temp_access_token
      },
    }).then((response) => {
      console.log(response);
      console.log(response.message)
        if (response.message != "Password has been successfully changed!") {
            this.onChangeFail();
        }
        this.props.authLogin();
      }).catch((error) => {
        console.log(error);
        this.onChangeFail();
      });
  }
  onChangeFail() {
    this.setState({
      error: 'Password Change Failed',
      loading: false,
    });
  }

  valueDefine(key, value) {
    this.setState(
      {
        [key]: value,
      },
      () => {
        //(): callback function, make stateCheck run after [key] :value.
        this.stateCheck();
      },
    );
  }

  stateCheck() {
    const {username, email, password, password_confirmation} = this.state;
    if (
      password === '' ||
      password_confirmation === ''
    ) {
      this.setState({
        stateCheck: 1,
      });
    } else if (!(password === password_confirmation)) {
      this.setState({
        stateCheck: 2,
      });
    } else if (password.length < 5) {
      this.setState({
        stateCheck: 3,
      });
    } else {
      this.setState({
        stateCheck: 0,
      });
    }
  }

  stateSwitch(state) {
    switch (state) {
      case 0:
        return this.passwordChange; 
      case 1:
        return this.informationAlert;//rasie alert when information missing, could use gray button instead.
      case 2:
        return this.passwordAlert;
      case 3:
        return this.passwordLengthAlert;
    }
  }

  informationAlert() {
    alert('Mandatory Information Missing!');
  }
  passwordAlert() {
    alert('Passwords Do Not Match!');
  }
  passwordLengthAlert() {
    alert('Passwords Must Be Longer Than 5 Letters!');
  }

  render() {
    const {
      password,
      password_confirmation,
      error,
      stateCheck,
    } = this.state;
    const {form, section, errorTextStyle} = styles;
    return (
      <Fragment style={styleXD.basicFrame}>
        <ReactImage source={require('./assets/feedme.png')} style={styleXD.logo} />

          <Text style={styleXD.phoneNumber1}>
            New Password:
          </Text>
          <View style={styleXD.input}>
            <Input 
              style={styleXD.inputBorder}
              secureTextEntry
              placeholder="Password"
              value={password}
              onChangeText={(password) => this.valueDefine('password', password)}
            />
          </View>

          <Text style={styleXD.phoneNumber1}>
            New Password Again:
          </Text>
          <View style={styleXD.input}>
            <Input 
              style={styleXD.inputBorder}
              secureTextEntry
              placeholder="Password Again!"
              value={password_confirmation}
              onChangeText={(password_confirmation) => this.valueDefine('password_confirmation', password_confirmation)}
            />
          </View>
          
          <Text style={errorTextStyle}>{error}</Text>

          <TouchableOpacity onPress={this.passwordChange} style={styleXD.loginButton}>
              <Text style={styleXD.loginWords}>
                Log In
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
  "phoneNumber1": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(145, 133, 133, 1)",
    "fontSize": 20,
    "fontWeight": "700",
    "fontFamily": "AppleGothic",
    "textAlign": "left",
    "width": 284,
    "height": 25,
    "top": 80
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

  "firstInput": {
    "opacity": 1,
    "backgroundColor": "transparent",
    "marginTop":170, 
    "top": 20,
    "alignSelf": "center",
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
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

  "input": {
    "opacity": 1,
    "backgroundColor": "transparent",
    "marginTop":35, 
    "top":50,
    "alignSelf": "center",
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
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
    "textAlign": "right"
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
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(112, 112, 112, 1)",
    "fontSize": 15,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "AppleGothic",
    "textAlign": "left",
    "alignSelf": "stretch"
  },

  "registerButton": {
    "opacity": 1,
    "backgroundColor": "rgba(140, 187, 25, 1)",
    "marginTop": 50,
    "top": 20,
    "marginRight": 0,
    "marginBottom": 20,
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

  "registerWords": {
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
    "width": 90,
    "height": 30,
    "left": 70,
    "top": 10
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
});

export {PasswordChange};
