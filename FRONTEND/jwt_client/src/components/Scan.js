import React, { Component } from 'react';
import { Loading } from '../components/common/';
import axios from 'axios';

import {StyleSheet, TouchableHighlight} from 'react-native';
import {Image as ReactImage} from 'react-native';
import {Text, TouchableOpacity, View } from 'react-native';
import Svg from 'react-native-svg';


class Scan extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      email: '',
      error: '',
    }
  }

  componentDidMount(){
    const headers = {
      'authorization': this.props.jwt
    };
    axios({
      method: 'GET',
      url: 'http://localhost:3000/api/user/profile',
      headers: headers,
    }).then((response) => {
      console.log(response.data.response);
      this.setState({
        email: response.data.response.Email,
        loading: false
      });
    }).catch((error) => {
      this.setState({
        error: 'Error retrieving data',
        loading: false
      });
    });
  }

  render() {
    const { container, emailText, errorText } = styles;
    const { loading, email, error } = this.state;

    if (loading){
      return(
        <View style={container}>
          <Loading size={'large'} />
        </View>
      )
    } else {
        return(

          <View style={styleXD.iphoneXXs11Pro2}>
            <View style={styleXD.iphoneXXs11Pro2_group23}>
              <View style={styleXD.iphoneXXs11Pro2_group23_rectangle13}></View>
              <TouchableHighlight onPress={this.props.home}>
                <ReactImage source={require('../screens/assets/x2.png')} style={styleXD.homePageIcon} />
              </TouchableHighlight>
              <ReactImage source={require('../screens/assets/x4.png')} style={styleXD.scanPageIcon} />
              <ReactImage source={require('../screens/assets/x.png')} style={styleXD.profilePageIcon} />
            </View>
            <View style={styleXD.iphoneXXs11Pro2_group32}>
              <View style={styleXD.iphoneXXs11Pro2_group32_rectangle14}></View>
              <ReactImage source={require('../screens/assets/feedme.png')} style={styleXD.iphoneXXs11Pro2_group32_feedme} />
              <Text style={styleXD.iphoneXXs11Pro2_group32_healthyLifeHereIAm}>Healthy Life Here I am</Text>
            </View>
            <ReactImage source={require('../screens/assets/xcb20b54a.png')} style={styleXD.iphoneXXs11Pro2_xeac772eb} />
            <View style={styleXD.iphoneXXs11Pro2_rectangle18}></View>
            <View style={styleXD.iphoneXXs11Pro2_rectangle22}></View>
            <View style={styleXD.iphoneXXs11Pro2_rectangle24}></View>
            <View style={styleXD.iphoneXXs11Pro2_rectangle25}></View>
            <View style={styleXD.iphoneXXs11Pro2_rectangle19}></View>
            <View style={styleXD.iphoneXXs11Pro2_rectangle20}></View>
            <View style={styleXD.iphoneXXs11Pro2_rectangle21}></View>
            <View style={styleXD.iphoneXXs11Pro2_rectangle23}></View>
            {/* <Text style={styleXD.iphoneXXs11Pro2_pleaseScanTheBarcodeHere}>Please scan the barcode here!</Text> */}
            <ReactImage data-layer="777926e4-43ee-4a73-92a8-bd3b2c76a7b7" source={require('../screens/assets/x6.png')} style={styleXD.iphoneXXs11Pro2_x6} />
            <Text style={styleXD.iphoneXXs11Pro2_typeTheBarCodeNumber}>Type the bar code number
    </Text>
            <ReactImage source={require('../screens/assets/x076cd6bc.png')} style={styleXD.iphoneXXs11Pro2_xfea3464f} />

            <TouchableOpacity style={styleXD.scanButton}>
              <Text onPress = {this.props.barCode} style={styleXD.logOutWords}>
                Scan
              </Text>
            </TouchableOpacity>

            

          </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  emailText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20
  },
  errorText: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};

const styleXD = StyleSheet.create({

  "home_x17071a14b": {
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
    "width": 450,
    "height": 246.33,
    "left": -0.5,
    "top": -1.5
  },

  "scanButton": {
    "opacity": 1,
    "backgroundColor": "rgba(140, 187, 25, 1)",
    "marginTop": 600,
    "marginRight": 0,
    "marginBottom": 10,
    "marginLeft": 75,
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
  "logOutWords": {
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
    "width": 84,
    "height": 30,
    "left": 70,
    "top": 10
  
  },
  "iphoneXXs11Pro2": {
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
  "iphoneXXs11Pro2_group23": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 375,
    "height": 78,
    "left": 0,
    "top": 734
  },
  "iphoneXXs11Pro2_group23_rectangle13": {
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
  "homePageIcon": {
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
    "width": 40,
    "height": 40,
    "left": 31,
    "top": 18
  },
  "scanPageIcon": {
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
    "width": 40,
    "height": 40,
    "left": 172,
    "top": 18
  },
  "profilePageIcon": {
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
    "width": 40,
    "height": 40,
    "left": 313,
    "top": 18
  },
  "iphoneXXs11Pro2_group32": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 375,
    "height": 131,
    "left": -5,
    "top": 42
  },
  "iphoneXXs11Pro2_group32_rectangle14": {
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
    "height": 131,
    "left": 0,
    "top": 0
  },
  "iphoneXXs11Pro2_group32_feedme": {
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
    "width": 101,
    "height": 101,
    "left": 12,
    "top": 20
  },
  "iphoneXXs11Pro2_group32_healthyLifeHereIAm": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(112, 112, 112, 1)",
    "fontSize": 20,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "AppleGothic",
    "textAlign": "left",
    "lineHeight": 30,
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 234,
    "height": 47,
    "left": 113,
    "top": 55.5
  },
  "iphoneXXs11Pro2_xeac772eb": {
    "opacity": 0.0513060986995697,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 335,
    "height": 260,
    "left": 20,
    "top": 276
  },
  "iphoneXXs11Pro2_rectangle18": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(187, 226, 191, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(187, 226, 191, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(187, 226, 191, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(187, 226, 191, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(187, 226, 191, 1)",
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 31,
    "height": 4,
    "left": 107,
    "top": 276
  },
  "iphoneXXs11Pro2_rectangle22": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(187, 226, 191, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(187, 226, 191, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(187, 226, 191, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(187, 226, 191, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(187, 226, 191, 1)",
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 32,
    "height": 4,
    "left": 247,
    "top": 276
  },
  "iphoneXXs11Pro2_rectangle24": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(187, 226, 191, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(187, 226, 191, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(187, 226, 191, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(187, 226, 191, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(187, 226, 191, 1)",
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 4,
    "height": 33,
    "left": 275,
    "top": 404
  },
  "iphoneXXs11Pro2_rectangle25": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(187, 226, 191, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(187, 226, 191, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(187, 226, 191, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(187, 226, 191, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(187, 226, 191, 1)",
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 30,
    "height": 6,
    "left": 247,
    "top": 431
  },
  "iphoneXXs11Pro2_rectangle19": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(187, 226, 191, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(187, 226, 191, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(187, 226, 191, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(187, 226, 191, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(187, 226, 191, 1)",
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 4,
    "height": 26,
    "left": 107,
    "top": 278
  },
  "iphoneXXs11Pro2_rectangle20": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(187, 226, 191, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(187, 226, 191, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(187, 226, 191, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(187, 226, 191, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(187, 226, 191, 1)",
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 4,
    "height": 33,
    "left": 107,
    "top": 404
  },
  "iphoneXXs11Pro2_rectangle21": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(187, 226, 191, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(187, 226, 191, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(187, 226, 191, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(187, 226, 191, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(187, 226, 191, 1)",
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 27,
    "height": 6,
    "left": 111,
    "top": 431
  },
  "iphoneXXs11Pro2_rectangle23": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(187, 226, 191, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(187, 226, 191, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(187, 226, 191, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(187, 226, 191, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(187, 226, 191, 1)",
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 4,
    "height": 28,
    "left": 275,
    "top": 276
  },
  "iphoneXXs11Pro2_pleaseScanTheBarcodeHere": {
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
    "width": 200,
    "height": 19,
    "left": 94,
    "top": 464
  },
  "iphoneXXs11Pro2_x6": {
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
    "width": 78,
    "height": 78,
    "left": 20,
    "top": 434
  },
  "iphoneXXs11Pro2_x1679dba9": {
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
    "width": 259,
    "height": 46,
    "left": 65,
    "top": 181
  },
  "iphoneXXs11Pro2_typeTheBarCodeNumber": {
    "opacity": 0.5670920014381409,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(157, 120, 83, 1)",
    "fontSize": 12,
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
    "width": 146,
    "height": 30,
    "left": 94,
    "top": 196
  },
  "iphoneXXs11Pro2_xfea3464f": {
    "opacity": 0.37380701303482056,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 24,
    "height": 24,
    "left": 70,
    "top": 192
  }
});

export {Scan}