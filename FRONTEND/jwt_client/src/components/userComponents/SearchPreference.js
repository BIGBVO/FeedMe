import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image as ReactImage, FlatList, ScrollView, TouchableHighlight} from 'react-native';
import Svg from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import axios from 'axios';
import {AddPreference} from './AddPreference';

class SearchPreference extends Component { 
  constructor(props) {
      super(props);
      this.state = {
        search_list: this.props.search_list,
      };
      this.addPreference = this.addPreference.bind(this);
      this.back = this.back.bind(this);
  }

  back(){
    this.setState({search_list: []});
  }

  addPreference(item){
    console.log(item._id);
    console.log(this.props.jwt);
    axios.post('http://localhost:3000/api/user/add_nutrition/',{
      NutritionID: item._id
    },
    {
      headers: {
        authorization: this.props.jwt
      },
    }).then((response) => {
      console.log(response.data.message);
      if (response.data.message == "Nutrition added successfully!"){
        this.props.home();
      } else {
          alert('This item is already in your preference');
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render(){
    const {search_list} = this.state;

    const renderList = ({item}) => {
      return (
        <View key = {item._id}>
            <TouchableHighlight onPress={() => this.addPreference(item)} >
              <ReactImage style={styles.poster} source={{uri: item.Description + '.png'}}/> 
            </TouchableHighlight>
            <Text style={styles.ingridientName}> {item.Description} </Text> 
        </View> 
      )
    }

    if (search_list.length > 0){
      return (
        <View style={styles.home}>
          <Svg style={styles.home_x17071a14b} preserveAspectRatio="none" viewBox="-784.2504272460938 8.750411987304688 375.5004577636719 245.83204650878906" fill="rgba(140, 187, 25, 1)"><SvgPath d="M -409.5019226074219 253.8324584960938 C -410.2632446289062 250.3275451660156 -411.42626953125 247.1829071044922 -412.9586791992188 244.4859161376953 C -414.3712463378906 242.0002746582031 -416.0212707519531 240.0447692871094 -417.8628540039062 238.6736907958984 C -419.7998962402344 237.2314605712891 -421.8646545410156 236.5001831054688 -423.9998779296875 236.5001831054688 L -768.9996337890625 236.5001831054688 C -771.1354370117188 236.5001831054688 -773.2005004882812 237.2314605712891 -775.1375732421875 238.6736907958984 C -776.9797973632812 240.0459136962891 -778.6298217773438 242.0014190673828 -780.041748046875 244.4859161376953 C -781.5715942382812 247.1792297363281 -782.7345581054688 250.3212280273438 -783.4984741210938 253.8247680664062 L -783.5004272460938 9.500411987304688 L -409.5000305175781 9.500411987304688 L -409.4999694824219 253.8322296142578 L -409.5019226074219 253.8324584960938 Z"  /></Svg>
          <ReactImage source={require('../assets/feedme.png')} style={styles.home_feedme} />
          <Text style={styles.home_healthyLifeHereIAm}>Ingridient List</Text>
          <ReactImage source={require('../assets/x7.png')} style={styles.home_x7} />
          <Text onPress={this.back}  style={styles.home_edit}>
              Back
            </Text>
          <ScrollView style = {styles.MovieContainerGrid}>
            <FlatList style={styles.FlatlistStyles} data={search_list} numColumns={3} renderItem={renderList}
              keyExtractor={this._keyExtractor} />    
          </ScrollView> 
        </View>
      )
    } else {
      return (
        <AddPreference
        jwt = {this.props.jwt}
        list = {this.props.list}
        deleteJWT = {this.props.deleteJWT}
        home = {this.props.home}
        />
      )
    }
  }
}

const styles = StyleSheet.create({

  "searchButton": {
    "opacity": 1,
    "backgroundColor": "rgba(140, 187, 25, 1)",
    "borderTopLeftRadius": 5,
    "borderTopRightRadius": 5,
    "borderBottomLeftRadius": 5,
    "borderBottomRightRadius": 5,
    "width": 90,
    "height": 36,
    "textAlign": "center",
    "color": "rgba(242, 237, 237, 1)",
    "left": 290,
    "top": -35
  },

  "search": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(242, 237, 237, 1)",
    "fontSize": 18,
    "fontWeight": "bold",
    "fontStyle": "normal",
    "fontFamily": "AppleGothic",
    "textAlign": "center",
    "width": 100,
    "height": 25,
    "top": 8,
    "left" : -4
  },

  "input": {
    "opacity": 1,
    "backgroundColor": "transparent",
    "width": 130,
    "height": 38,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(112, 112, 112, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(112, 112, 112, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(112, 112, 112, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(112, 112, 112, 1)",
    "borderTopLeftRadius": 10,
    "borderTopRightRadius": 10,
    "borderBottomLeftRadius": 10,
    "borderBottomRightRadius": 10,
    left: 150,
    top: 3,
  },

  MovieContainerGrid:{
    flex: 1,
    padding: 10,
    flexWrap: 'wrap',
    "opacity": 1,
    "position": "relative",
    "marginTop": 290,
    "left" : 20
  },
  FlatlistStyles:{
    flexWrap: 'wrap',
    position: "relative",
    marginTop: 10,
    marginBottom: 20,
    alignContent: 'center'
  },
  poster:{
    flex:1,
    width: 80,
    height: 80,
    resizeMode: 'contain',
    "position": "relative",
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 5,
    justifyContent: 'center',
  },

  ingridientName:{
    flex:1,
    "color": "rgba(172, 134, 96, 1)",
    "fontSize": 18,
    "marginTop": 5,
    "marginBottom": 15,
    "fontWeight": "500",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "center",
    "position": "relative"
  },

  "home": {
    "opacity": 1,
    "position": "relative",
    "backgroundColor": "rgba(255, 255, 255, 1)",
    "width": 450,
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
    "width": 500,
    "height": 250,
    "left": -0.5,
    "top": -1.5
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
    "left": 40,
    "top": 70
  },
  "home_healthyLifeHereIAm": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(112, 112, 112, 1)",
    "fontSize": 33,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "left",
    "lineHeight": 50,
    "width": 250,
    "height": 100,
    "left": 170,
    "top": 103
  },
  "Allergen": {
    "backgroundColor": "rgba(140, 187, 25, 0.8)",
    "color": "rgba(255, 255, 255, 1)",
    "fontSize": 25,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "center",
    "width": 120,
    "height": 30,
    "marginLeft": 10,
    "marginTop": 10,
    "marginBottom": 25
  },
  "Diet": {
    "backgroundColor": "rgba(140, 187, 25, 0.8)",
    "color": "rgba(255, 255, 255, 1)",
    "fontSize": 25,
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "center",
    "lineHeight": 30,
    "width": 100,
    "height": 30,
    "marginLeft": 10,
    "marginTop": 10,
    "marginBottom": 15
  },
  "home_x7": {
    "opacity": 0.7,
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
    "left": 85,
    "top": 390
  },
  "home_edit": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(172, 134, 96, 1)",
    "fontSize": 18,
    "fontWeight": "900",
    "fontStyle": "normal",
    "fontFamily": "Apple SD Gothic Neo",
    "textAlign": "center",
    "width": 40,
    "height": 19,
    "left": 50,
    "top": 260
  },
});

export {SearchPreference};