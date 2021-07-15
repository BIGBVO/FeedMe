import React, {Component} from 'react';
import {TouchableHighlight, StyleSheet, Text, View,ScrollView, TouchableOpacity, Image as ReactImage, FlatList,StatusBar } from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';

class Home extends Component { 
  constructor(props) {
      super(props);
      this.state = {
        nutrition_list:this.props.nutrition_list
      };
      console.log("here");
      console.log(this.props);
  }


  _keyExtractor = (item, index) => item.id;

  render(){

    const renderItem = ({ item }) => {
      return (
        <View key = {item._id}>
            <ReactImage style={styles.poster} source={{uri:item.Description + '.png'}}/> 
            <Text style={styles.ingridientName}> {item.Description} </Text> 
          </View>
      );
    };


     return (
        <ScrollView  style={styles.home}>
        <Svg style={styles.home_x17071a14b} preserveAspectRatio="none" viewBox="-784.2504272460938 8.750411987304688 375.5004577636719 245.83204650878906" fill="rgba(140, 187, 25, 1)"><SvgPath d="M -409.5019226074219 253.8324584960938 C -410.2632446289062 250.3275451660156 -411.42626953125 247.1829071044922 -412.9586791992188 244.4859161376953 C -414.3712463378906 242.0002746582031 -416.0212707519531 240.0447692871094 -417.8628540039062 238.6736907958984 C -419.7998962402344 237.2314605712891 -421.8646545410156 236.5001831054688 -423.9998779296875 236.5001831054688 L -768.9996337890625 236.5001831054688 C -771.1354370117188 236.5001831054688 -773.2005004882812 237.2314605712891 -775.1375732421875 238.6736907958984 C -776.9797973632812 240.0459136962891 -778.6298217773438 242.0014190673828 -780.041748046875 244.4859161376953 C -781.5715942382812 247.1792297363281 -782.7345581054688 250.3212280273438 -783.4984741210938 253.8247680664062 L -783.5004272460938 9.500411987304688 L -409.5000305175781 9.500411987304688 L -409.4999694824219 253.8322296142578 L -409.5019226074219 253.8324584960938 Z"  /></Svg>
        <View  style={styles.home_x22}>
            <View style={styles.home_x22_x13}></View>
            <ReactImage  source={require('../assets/x3736e299c.png')} style={styles.home_x22_x3736e299c} />
            <TouchableHighlight onPress={this.props.barCode}>
                <ReactImage source={require('../assets/x3.png')} style={styles.home_x22_x3} />
            </TouchableHighlight>

            <TouchableOpacity onPress={this.props.userProfile}>
              <ReactImage source={require('../assets/x.png')} style={styles.home_x22_x} />
            </TouchableOpacity>
            
        </View>
        <View style={styles.MovieContainerGrid}>
            <FlatList style={styles.FlatlistStyles} data={this.props.nutrition_list} numColumns={3} renderItem={renderItem}
            keyExtractor={this._keyExtractor} />
          </View> 
        <Text style={styles.home_preference} >Allergy List</Text>
        <Svg style={styles.home_x1} preserveAspectRatio="none" viewBox="0 -2.5 54 5" fill="transparent"><SvgPath d="M 0 0 L 54 0"  /></Svg>

        <Text onPress={this.props.removePreference}  style={styles.home_edit}>
          Edit
          </Text>
          

        <ReactImage source={require('../assets/feedme.png')} style={styles.home_feedme} />
        <Text style={styles.home_healthyLifeHereIAm}>Healthy Life Here I am</Text>
        <ReactImage source={require('../assets/x7.png')} style={styles.home_x7} />
    </ScrollView>
     )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    flexWrap: 'wrap'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    paddingBottom: 30
  },
  content: {
    flex: 1,                            // Take up all available space
    justifyContent: 'center',           // Center vertically
    alignItems: 'center',               // Center horizontally
    backgroundColor: '#000',            // Darker background for content area
  },
  // Content text
  text: {
    marginHorizontal: 20,               // Add horizontal margin
    color: 'rgba(255, 255, 255, 0.75)', // Semi-transparent text
    textAlign: 'center',                // Center
    fontFamily: 'Avenir',
    fontSize: 18,
  },
  MovieContainerGrid:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    "opacity": 1,
    "position": "absolute",
    "marginTop": 280,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "left" : 20,
    "top" : 40
  },
  FlatlistStyles:{
    flexWrap: 'wrap'
  },
  poster:{
    flex:1,
    width: 75,
    height: 75,
    resizeMode: 'contain',
    "position": "relative",
    marginHorizontal: 25,
    marginBottom:5,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  ingridientName:{
    flex:1,
    "color": "rgba(172, 134, 96, 1)",
    "fontSize": 18,
    "marginTop": 5,
    "fontWeight": "500",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "center",
    "position": "relative",
    marginBottom:10
  },

  "home": {
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
    "width": 410,
    "height": 900,
    "left": 0,
    "top": 0
  },
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
  "home_x22": {
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
    "left": 12,
    "top": 780
  },
  "home_x22_x13": {
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
  "home_x22_x3736e299c": {
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
  "home_x22_x3": {
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
  "home_x22_x": {
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
  "home_x42": {
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
    "width": 190,
    "height": 92,
    "left": 35,
    "top": 314
  },
  "home_x42_x40": {
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
    "width": 168,
    "height": 92,
    "left": 0,
    "top": 0
  },
  "home_x42_x40_eggs": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(172, 134, 96, 1)",
    "fontSize": 18,
    "fontWeight": "700",
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
    "width": 39,
    "height": 21,
    "left": 16,
    "top": 71
  },
  "home_x42_x40_xa4d07fb3": {
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
    "width": 71,
    "height": 71,
    "left": 0,
    "top": 0
  },
  "home_x42_x40_fish": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(172, 134, 96, 1)",
    "fontSize": 18,
    "fontWeight": "700",
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
    "width": 34,
    "height": 21,
    "left": 134,
    "top": 70
  },
  "home_x42_x93f442ed": {
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
    "width": 73,
    "height": 48,
    "left": 117,
    "top": 13
  },
  "home_preference": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(172, 134, 96, 1)",
    "fontSize": 18,
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
    "width": 100,
    "height": 19,
    "left": 30,
    "top": 251
  },
  "home_x1": {
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
  "home_edit": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(172, 134, 96, 1)",
    "fontSize": 18,
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
    "width": 40,
    "height": 19,
    "left": 328,
    "top": 251
  },
  "home_feedme": {
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
    "width": 130,
    "height": 130,
    "left": 20,
    "top": 65
  },
  "home_healthyLifeHereIAm": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(112, 112, 112, 1)",
    "fontSize": 24,
    "fontWeight": "600",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "left",
    "lineHeight": 30,
    "width": 234,
    "height": 47,
    "left": 140,
    "top": 110
  },
  "home_x7": {
    "opacity": 0.6,
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
    "left": 65,
    "top": 400
  }
});

export {Home};