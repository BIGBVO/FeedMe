import React, {Component} from 'react';
import {StyleSheet, Text, View,ScrollView, TouchableOpacity, Image as ReactImage, FlatList,StatusBar } from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Input} from '../common';
import axios from 'axios';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';

class ProfileEdit extends Component { 
  constructor(props) {
      super(props);
      this.state = {
        profiles:this.props.profiles,
        email:'',
        statecheck:0,
        error:''
      };
      console.log(this.state.profiles);
      this.emailChange = this.emailChange.bind(this);
  }


  emailChange() {
    const {email} = this.state;
    this.setState({error: '', loading: true});
    axios.post('http://localhost:3000/api/user/updateEmail',{
      'Email': email
    },
    {
      headers: {
        'authorization': this.props.jwt
      },
    }).then((response) => {
      console.log(response.data.message);
        if (response.data.message!= "Email has been successfully changed!") {
          alert("Invalid Email");
        }

      this.props.setProfilePage();
      
      }).catch((error) => {
        console.log("fail");
        // this.onChangeFail();
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
    const {email} = this.state;
      this.setState({
        stateCheck: 0,
      });
  }

  stateSwitch(state) {
    switch (state) {
      case 0:
        return this.emailChange; 
    }
  }


  render() {
    const {email} = this.state;
    return (
    <ScrollView data-layer="4347de83-0b0c-47bf-bf53-16703185008e" style={styles.profile}>
        <Svg data-layer="b95c3414-bda3-475c-980c-89c458a31758" style={styles.profile_x1dfefd715} preserveAspectRatio="none" viewBox="-784.2504272460938 8.750411987304688 375.50042724609375 245.83204650878906" fill="rgba(140, 187, 25, 1)"><SvgPath d="M -409.5019226074219 253.8324584960938 C -410.2632446289062 250.3275451660156 -411.42626953125 247.1829071044922 -412.9586791992188 244.4859161376953 C -414.3712463378906 242.0002746582031 -416.0212707519531 240.0447692871094 -417.8628540039062 238.6736907958984 C -419.7998962402344 237.2314605712891 -421.8646545410156 236.5001831054688 -423.9998779296875 236.5001831054688 L -768.9996337890625 236.5001831054688 C -771.1354370117188 236.5001831054688 -773.2005004882812 237.2314605712891 -775.1375732421875 238.6736907958984 C -776.9797973632812 240.0459136962891 -778.6298217773438 242.0014190673828 -780.041748046875 244.4859161376953 C -781.5715942382812 247.1792297363281 -782.7345581054688 250.3212280273438 -783.4984741210938 253.8247680664062 L -783.5004272460938 9.500411987304688 L -409.5000305175781 9.500411987304688 L -409.4999694824219 253.8322296142578 L -409.5019226074219 253.8324584960938 Z"  /></Svg>
        <Text data-layer="72cf8e0d-d3b0-423b-bab2-f46c11e526f1" style={styles.profile_welcome}>Welcome!</Text>
        
        <TouchableOpacity onPress={this.props.setProfilePage}>
        <View data-layer="ed0a10b7-4cf4-4f2f-850b-7bbedef67b5a" style={styles.profile_x5}></View>
          <Text style={styles.profile_logOut}>Cancel</Text>
          </TouchableOpacity>
          
        <Svg data-layer="d47405f1-009e-415a-81bf-dbdd9ab2d380" style={styles.profile_x1406e7215} preserveAspectRatio="none" viewBox="0 -2.5 54 5" fill="transparent"><SvgPath d="M 0 0 L 54 0"  /></Svg>
        <View data-layer="71ebb86c-36d6-4791-a358-4a8f42cb12ad" style={styles.profile_x26}>
            <View data-layer="890c44b0-b87d-486d-8eee-d12c4d436372" style={styles.profile_x26_x13}></View>
        </View>
        <Text data-layer="3766fd5f-935e-4e0b-bd05-96a863104314" style={styles.profile_username}>Username: </Text>
        
        <TouchableOpacity onPress={this.emailChange}>
            <Text data-layer="5fc2654a-525d-4520-8428-baae32d77ea2" style={styles.profile_edit}>Done</Text>
          </TouchableOpacity>
        
        
    <Text data-layer="b775f55e-73d2-4770-95ee-9fabdf16d24b" style={styles.profile_vivi1010}> {this.state.profiles.response.Username}</Text>
        <ReactImage data-layer="e634814d-f367-4d21-96cd-0b071cc1c089" source={require('../assets/feedme.png')} style={styles.profile_feedme} />
        <Text data-layer="4cf11a07-d05a-4b81-bc85-e63df400de72" style={styles.profile_phone}>Phone: </Text>
        <Text data-layer="ed27991f-228b-4031-bb10-291e22d476fc" style={styles.profile_email}>Email: </Text>
        <Text data-layer="4e54b7fc-9f42-4c9e-b2d1-a7c7046bad6b" style={styles.profile_x12345678}>{this.state.profiles.response.PhoneNo}</Text>
        <TouchableOpacity onPress={this.props.setProfilePhone}>
            <Text data-layer="5fc2654a-525d-4520-8428-baae32d77ea2" style={styles.profile_change_phone}> Change </Text>
        </TouchableOpacity>

        <View style={styles.profile_vivi}>
            <Input style={styles.input_border}
              placeholder="Email"
              value={email}
              onChangeText={(email) => this.valueDefine('email', email)}
            />
        </View>
        <Text data-layer="7a53728b-8f36-4599-a10d-0bc590f6c390" style={styles.profile_vivi10104a9c7366}>{this.state.profiles.response.Username}</Text>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  "profile": {
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
    "width": 450,
    "height": 812,
    "left": 0,
    "top": 0
  },
  "profile_x1dfefd715": {
    "opacity": 0.5457370281219482,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 500,
    "height": 246.33,
    "left": -0.5,
    "top": -0.5
  },
  "profile_welcome": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(172, 134, 96, 1)",
    "fontSize": 30,
    "fontWeight": "700",
    "fontFamily": "AppleGothic",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 140,
    "height": 37,
    "left": 60,
    "top": 95
  },
  "profile_x5": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(242, 245, 234, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopLeftRadius": 15,
    "borderTopRightRadius": 15,
    "borderBottomLeftRadius": 15,
    "borderBottomRightRadius": 15,
    "width": 101,
    "height": 30,
    "left": 280,
    "top": 160
  },
  "profile_logOut": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(172, 134, 96, 1)",
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
    "width": 68,
    "height": 18,
    "left": 297,
    "top": 168
  },
  "profile_info": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(172, 134, 96, 1)",
    "fontSize": 24,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "center",
    "width": 150,
    "height": 50,
    "left": 24,
    "top": 260
  },
  "profile_x1406e7215": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 54,
    "height": 5,
    "left": 30.5,
    "top": 274
  },
  "profile_x26": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "width": 400,
    "height": 78,
    "left": 35,
    "top": 780
  },
  "profile_x26_x13": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 375,
    "height": 78,
    "left": 0,
    "top": 0
  },
  "profile_x26_x1": {
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
    "width": 32,
    "height": 32,
    "left": 313,
    "top": 18
  },
  "profile_x26_x2": {
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
    "width": 32,
    "height": 32,
    "left": 31,
    "top": 18
  },
  "profile_x26_x3": {
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
    "width": 32,
    "height": 32,
    "left": 172,
    "top": 18
  },
  "profile_username": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(172, 134, 96, 1)",
    "fontSize": 22,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "left",
    "width": 120,
    "height": 30,
    "left": 65,
    "top": 340
  },
  "profile_edit": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(172, 134, 96, 1)",
    "fontSize": 20,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "center",
    "width": 100,
    "height": 19,
    "left": 310,
    "top": 261
  },
  "profile_vivi1010": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(151, 151, 151, 1)",
    "fontSize": 22,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "left",
    "width": 100,
    "height": 30,
    "left": 165,
    "top": 340
  },
  "profile_x7": {
    "opacity": 0.5,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 271,
    "height": 271,
    "left": 80,
    "top": 393
  },
  "profile_feedme": {
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
    "width": 112,
    "height": 107,
    "left": 272,
    "top": 53
  },
  "profile_phone": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(172, 134, 96, 1)",
    "fontSize": 22,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "left",
    "width": 100,
    "height": 30,
    "left": 65,
    "top": 440
  },
  "profile_change_phone": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(172, 134, 96, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 60,
    "height": 19,
    "left": 310,
    "top": 442
  },

  "profile_email": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(172, 134, 96, 1)",
    "fontSize": 22,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 100,
    "height": 30,
    "left": 65,
    "top": 390
  },
  "profile_x12345678": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(151, 151, 151, 1)",
    "fontSize": 20,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 800,
    "height": 30,
    "left": 170,
    "top": 440
  },
  "profile_vivi": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(0, 0, 0, 0)",
    "color": "rgba(151, 151, 151, 1)",
    "fontSize": 25,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "left",
    "width": 300,
    "height": 30,
    "left": 100,
    "top": 390,
  },

  "inputBorder": {
    "opacity": 1,
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
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(151, 151, 151, 1)",
    "fontSize": 10,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "left",
    "alignSelf": "stretch"
  },

  "profile_vivi10104a9c7366": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(172, 134, 96, 1)",
    "fontSize": 25,
    "fontWeight": "bold",
    "fontStyle": "normal",
    "fontFamily": "AppleGothic",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 800,
    "height": 30,
    "left": 88,
    "top": 140
  }
});

export {ProfileEdit};