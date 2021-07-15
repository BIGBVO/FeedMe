import React, {Component} from 'react';
import {TouchableHighlight, StyleSheet, Text, View,ScrollView, TouchableOpacity, Image as ReactImage, FlatList,StatusBar } from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import deviceStorage from '../services/deviceStorage';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

class FoodFlagRed extends Component{
    constructor(props){
        super(props);
        this.state = {
            food_name: '',
            bar_code: '',
            loading: false,
            process:false,
            safe: true,
            temp_access_token: '',
            nutritionID: [],  //food list
            nutrition_to_show:'',
            first_load_nutrition: true,
            first_print_nutrition: true,
            check: false,
            Nutritions: [],

            nutrition_id_list: [],  //preference list
            nutrition_list:[],

            allergen_info_for_user:[],  //the allergen information
            allergem_to_show: '',
            // food_info: "",
        };
        this.checkPreference = this.checkPreference.bind(this)
        this.loadBarCode = deviceStorage.loadBarCode.bind(this)
        // this.loadTempAccessToken = deviceStorage.loadTempAccessToken.bind(this)
        // this.loadNutritionID = deviceStorage.loadNutritionID.bind(this)
        this.getNutritionName = this.getNutritionName.bind(this)

        this.getFoodName = this.getFoodName.bind(this)
        this.loadBarCode();
        // this.loadTempAccessToken();
        // this.loadNutritionID();
        // this.loadTempAccessToken();
        console.log(this.props);
        
    }
    getNutritionName(nutritionIDList){
      console.log("get Nutrition Name called");
      let promises = []
      console.log(nutritionIDList.length);
      for (i = 0; i < nutritionIDList.length; i++) {
        console.log("for loop running");
        promises.push(axios.get('http://localhost:3000/api/nutrition/show_id',{
          params: { id: nutritionIDList[i]},
          headers: { authorization: this.props.jwt},
          }).then((response) => {
          this.state.nutritionID.push(response.data.Description);
          }).catch((error) => {
            console.log("error here");
            console.log(error);
          })
        )
      }
      Promise.all(promises).then(() =>  this.setState({
        loading: false
      }));  
      
    }

  async componentDidMount(){
    const value = await AsyncStorage.getItem('barCode');
    console.log("value");
    console.log(value);
    this.getFoodName(value);
    this.checkPreference(this.state.nutritionID);
}
async getFoodName(code){
    console.log("getFoodName called");
    const headers = {
      'authorization': this.props.jwt
    };

    axios.get(`http://localhost:3000/api/food/showFood/${code}`,{
              headers: { authorization: this.props.jwt},
    }).then((response) => {
      console.log("RESPONSE IS");
      console.log(response);
      this.setState({food_name: response.data.Name})
      this.setState({Nutritions : response.data.Nutritions});
      if(this.state.first_load_nutrition){
        console.log("it gets to here");
        this.getNutritionName(this.state.Nutritions, response);
        console.log("it also got to here");
        this.setState({first_load_nutrition: false}) 
        console.log(this.state.nutritionID);
        for(var i=0; i<this.state.nutritionID.length; i++){
          if(i==this.state.nutritionID){
            this.state.nutrition_to_show += this.state.nutritionID[i];
          }
          else{
            this.state.nutrition_to_show += this.state.nutritionID[i] + ' ,';
          }
        }
      } else {
        console.log("if not working");
      }
    }).catch((error) => {
      console.log("error retrieving love");
      console.log(error);
      this.setState({
        error: 'Error retrieving data',
        loading: false
      });
    });

}

    
    checkPreference(nutritionIDList){
      console.log("nutritionIDList:")
      console.log(nutritionIDList);
      //get all preference list
      
      const headers = {
        'authorization': this.props.jwt
      };

      let promises = [];
      axios({
        method: 'GET',
        url: 'http://localhost:3000/api/user/list_nutrition',
        headers: headers,
      }).then((response) => {
        for (var i = 0; i < response.data.nutrition_id_list.length; i++){
          promises.push(
            axios.get('http://localhost:3000/api/nutrition/show_id',{
              params: { id: response.data.nutrition_id_list[i] },
              headers: { authorization: this.props.jwt},
          }).then((response_tmp) => {
            console.log(response_tmp.data.Description)
            // console.log(nutritionIDList)
            for(var j=0; j<nutritionIDList.length; j++ ){
              // this.setState({
              //   check: true,
              // })
              this.state.check = true;
              console.log(this.state.check)
              console.log(nutritionIDList[j])
              if(response_tmp.data.Description == nutritionIDList[j]){
                // this.setState({
                //   safe: false,
                
                // })
                this.state.safe = false;
                this.state.allergen_info_for_user.push(response_tmp.data.Description);
                console.log(this.state.safe)
                // console.log(this.state.allergen_info_for_user)
              }
              console.log(this.state.safe)
              console.log(this.state.check)

              console.log(this.state.allergen_info_for_user)


            }

            // console.log(response_tmp);
            // this.state.nutrition_list.push(response_tmp.data);
            
          }).catch((error) => {
              console.log(error);
            })
          )
        }

      Promise.all(promises).then(() =>  this.setState({
        loading: false
      }));

     
      }).catch((error) => {
        console.log(error);
        this.props.deleteJWT();
        console.log(this.props.jwt)
        
      });


    }

    render(){
      const{safe, check} = this.state;
      console.log("safe:")
      console.log(safe);
      console.log("check:");
      console.log(check);
      this.state.nutrition_to_show = '';
      for(var i=0; i<this.state.nutritionID.length; i++){
        // if(i==this.state.nutritionID.length){
        //   this.state.nutrition_to_show += this.state.nutritionID[i];
        // }
        // else{
          this.state.nutrition_to_show += this.state.nutritionID[i] + '  ';
        // }
      }

      this.state.allergen_to_show = '';
      for(var i=0; i<this.state.allergen_info_for_user.length; i++){
        // if(i==this.state.allergen_info_for_user.length){
        //   this.state.allergen_to_show += this.state.allergen_info_for_user[i];
        // }
        // else{
          this.state.allergen_to_show += this.state.allergen_info_for_user[i] + '  ';
        // }
      }

  
    



        return(
        <View  style={styles.home}>
         <Svg style={styles.home_x17071a14b} preserveAspectRatio="none" viewBox="-784.2504272460938 8.750411987304688 375.5004577636719 245.83204650878906" fill="rgba(140, 187, 25, 1)"><SvgPath d="M -409.5019226074219 253.8324584960938 C -410.2632446289062 250.3275451660156 -411.42626953125 247.1829071044922 -412.9586791992188 244.4859161376953 C -414.3712463378906 242.0002746582031 -416.0212707519531 240.0447692871094 -417.8628540039062 238.6736907958984 C -419.7998962402344 237.2314605712891 -421.8646545410156 236.5001831054688 -423.9998779296875 236.5001831054688 L -768.9996337890625 236.5001831054688 C -771.1354370117188 236.5001831054688 -773.2005004882812 237.2314605712891 -775.1375732421875 238.6736907958984 C -776.9797973632812 240.0459136962891 -778.6298217773438 242.0014190673828 -780.041748046875 244.4859161376953 C -781.5715942382812 247.1792297363281 -782.7345581054688 250.3212280273438 -783.4984741210938 253.8247680664062 L -783.5004272460938 9.500411987304688 L -409.5000305175781 9.500411987304688 L -409.4999694824219 253.8322296142578 L -409.5019226074219 253.8324584960938 Z"  /></Svg>
        <Text style={styles.foodname}>{this.state.food_name} </Text> 
        


        <Text style={styles.preference} >Check With Preference & Info</Text>
        <Svg style={styles.home_x1} preserveAspectRatio="none" viewBox="0 -2.5 54 8" fill="transparent"><SvgPath d="M 0 0 L 54 0"  /></Svg>

        
        {!safe && check&&
        <Text style={styles.Opps1}>Opps!</Text>}
        {!safe && check &&
        <Text style={styles.Opps2}>It may contain your allergen!</Text>}
        {!safe && check &&
        <Text style={styles.Opps3}>Don't consume it :)</Text>}
        {!safe && check &&
        <ReactImage source={require('./assets/flagred.png')} style={styles.flag} />}


        {safe && check &&
        <Text style={styles.Opps2}>This food is safe for you!</Text>}
        {safe &&  check &&
        <Text style={styles.Opps3}>Be happy to consume it :)</Text>}
        {safe && check &&
        <ReactImage source={require('./assets/x6.png')} style={styles.flag} />}

        
        <TouchableHighlight onPress={this.props.home}>
        <ReactImage source={require('./assets/feedme.png')} style={styles.feedme} />
        </TouchableHighlight>

        <TouchableHighlight onPress={this.props.barCode}>
        <ReactImage source={require('./assets/back.png')} style={styles.back}/>
        </TouchableHighlight>


        { !safe && check &&
        <Text style={styles.info}>Allergen Information</Text>}
      
        { !safe && check &&
        <Text style={styles.details}>{this.state.allergen_to_show}</Text>}

        {/* <Text style={styles.info_all}>Contains</Text> */}
      

        <Text style={styles.details_all}>{this.state.nutrition_to_show}</Text>



        <ReactImage source={require('./assets/greenbox.png')} style={styles.greenbox} />

        <ReactImage source={require('./assets/x7.png')} style={styles.background} />
    </View>        
    
    );
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
   
    FlatlistStyles:{
      flexWrap: 'wrap'
    },
    poster:{
      flex:1,
      width: 71,
      height: 71,
      resizeMode: 'contain',
      "position": "relative",
      marginHorizontal: 25,
      marginTop: 10,
      marginBottom:5,
      justifyContent: 'center',
      paddingHorizontal: 30,
    },
  
    "background": {
        "opacity": 0.3,
        "position": "absolute",
        "marginTop": -40,
        "marginRight": 40,
        "marginBottom": 0,
        "marginLeft": -320,
        "borderTopLeftRadius": 0,
        "borderTopRightRadius": 0,
        "borderBottomLeftRadius": 0,
        "borderBottomRightRadius": 0,
        "width": 300,
        "height": 300,
        "left": 170,
        "top": 0
      },
    
  
    "home_x17071a14b": {
      "opacity": 0.5457370281219482,
      "position": "absolute",
      "marginTop": -485,
      "marginRight": 0,
      "marginBottom": 0,
      "marginLeft": -205,
      "paddingTop": 0,
      "paddingRight": 0,
      "paddingBottom": 0,
      "paddingLeft": 0,
      "width": 410,
      "height":290,
      "left": -0.5,
      "top": 0
    },

    "back": {
        "opacity": 1,
        "position": "absolute",
        "marginTop": -350,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": -330,
        "borderTopLeftRadius": 0,
        "borderTopRightRadius": 0,
        "borderBottomLeftRadius": 0,
        "borderBottomRightRadius": 0,
        "width": 40,
        "height": 40,
        "left": 145,
        "top": 62
      },

      "flag": {
        "opacity": 1,
        "position": "absolute",
        "marginTop": -170,
        "marginRight": 10,
        "marginBottom": 0,
        "marginLeft": -225,
        "borderTopLeftRadius": 0,
        "borderTopRightRadius": 0,
        "borderBottomLeftRadius": 0,
        "borderBottomRightRadius": 0,
        "width": 150,
        "height": 150,
        "left": 145,
        "top": 62
      },

      "feedme": {
        "opacity": 1,
        "position": "absolute",
        "marginRight": 10,
        "marginBottom": 0,
        "borderTopLeftRadius": 0,
        "borderTopRightRadius": 0,
        "borderBottomLeftRadius": 0,
        "borderBottomRightRadius": 0,
        "width": 140,
        "height": 140,
        "left": -165,
        "top": -390
      },


      "preference": {
        "opacity": 1,
        "position": "absolute",
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(172, 134, 96, 1)",
        "fontSize": 15,
        "fontWeight": "900",
        "fontStyle": "normal",
        "fontFamily": "Apple SD Gothic Neo",
        "textAlign": "center",
        "marginTop": -424,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": -220,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": 250,
        "height": 19,
        "left": 21,
        "top": 230
      },

      "foodname": {
        "opacity": 1,
        "position": "absolute",
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(172, 134, 96, 1)",
        "fontSize": 30,
        "fontWeight": "900",
        "fontStyle": "normal",
        "fontFamily": "Apple SD Gothic Neo",
        "textAlign": "center",
        "marginTop": -560,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": -100,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": 250,
        "height": 40,
        "left": 50,
        "top": 200
      },

      // "info": {
      //   "opacity": 1,
      //   "position": "absolute",
      //   "backgroundColor": "rgba(255, 255, 255, 0)",
      //   "color": "rgba(180, 134, 96, 1)",
      //   "fontSize": 17,
      //   "fontWeight": "900",
      //   "fontStyle": "normal",
      //   "fontFamily": "Apple SD Gothic Neo",
      //   "textAlign": "center",
      //   "marginTop": -424,
      //   "marginRight": 0,
      //   "marginBottom": 0,
      //   "marginLeft": 0,
      //   "paddingTop": 0,
      //   "paddingRight": 0,
      //   "paddingBottom": 0,
      //   "paddingLeft": 0,
      //   "width": 250,
      //   "height": 19,
      //   "left": 21,
      //   "top": 251
      // },

      "greenbox": {
        "opacity": 1,
        "position": "absolute",
        "marginTop": -200,
        "marginRight": 10,
        "marginBottom": 0,
        "marginLeft": -315,
        "borderTopLeftRadius": 0,
        "borderTopRightRadius": 0,
        "borderBottomLeftRadius": 0,
        "borderBottomRightRadius": 0,
        "width": 150,
        "height": 8,
        "left": 145,
        "top": 45
      },


      "Opps1": {
        "opacity": 1,
        "position": "absolute",
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(172, 134, 96, 1)",
        "fontSize": 20,
        "fontWeight": "900",
        "fontStyle": "normal",
        "fontFamily": "Apple SD Gothic Neo",
        "textAlign": "center",
        "marginTop": -210,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": -150,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": 250,
        "height": 40,
        "left": 21,
        "top": 251
      },
      "Opps2": {
        "opacity": 1,
        "position": "absolute",
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(172, 134, 96, 1)",
        "fontSize": 19,
        "fontWeight": "900",
        "fontStyle": "normal",
        "fontFamily": "Apple SD Gothic Neo",
        "textAlign": "center",
        "marginTop": -180,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": -190,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": 350,
        "height": 40,
        "left": 21,
        "top": 251
      },

      "Opps3": {
        "opacity": 1,
        "position": "absolute",
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(172, 134, 96, 1)",
        "fontSize": 19,
        "fontWeight": "900",
        "fontStyle": "normal",
        "fontFamily": "Apple SD Gothic Neo",
        "textAlign": "center",
        "marginTop": -155,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": -190,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": 350,
        "height": 40,
        "left": 21,
        "top": 251
      },

      "info": {
        "opacity": 1,
        "position": "absolute",
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(172, 134, 96, 1)",
        "fontSize": 20,
        "fontWeight": "900",
        "fontStyle": "normal",
        "fontFamily": "Apple SD Gothic Neo",
        "textAlign": "center",
        "marginTop": -90,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": -190,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": 350,
        "height": 40,
        "left": 21,
        "top": 251
      },

      "details": {
        "opacity": 1,
        "position": "absolute",
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(172, 134, 96, 1)",
        "fontSize": 20,
        "fontWeight": "900",
        "fontStyle": "normal",
        "fontFamily": "Apple SD Gothic Neo",
        "textAlign": "center",
        "marginTop": -60,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": -190,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": 350,
        "height": 40,
        "left": 21,
        "top": 251
      },


      "info_all": {
        "opacity": 1,
        "position": "absolute",
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(172, 134, 96, 1)",
        "fontSize": 18,
        "fontWeight": "900",
        "fontStyle": "normal",
        "fontFamily": "Apple SD Gothic Neo",
        "textAlign": "center",
        "marginTop": -400,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": -180,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": 350,
        "height": 40,
        "left": 21,
        "top": 251
      },

      "details_all": {
        "opacity": 1,
        "position": "absolute",
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(172, 134, 96, 1)",
        "fontSize": 19,
        "fontWeight": "900",
        "fontStyle": "normal",
        "fontFamily": "Apple SD Gothic Neo",
        "textAlign": "center",
        "marginTop": -520,
        "marginRight": -10,
        "marginBottom": 0,
        "marginLeft": -150,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": 350,
        "height": 40,
        "left": 48,
        "top": 220
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
      "left": 0,
      "top": 734
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
      "width": 32,
      "height": 32,
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
      "width": 32,
      "height": 32,
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
      "width": 32,
      "height": 32,
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
      "fontSize": 15,
      "fontWeight": "900",
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
      "width": 250,
      "height": 19,
      "left": 21,
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
      "fontSize": 15,
      "fontWeight": "500",
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
      "width": 26,
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
      "width": 101,
      "height": 101,
      "left": 145,
      "top": 62
    },

    "home_PageName": {
        "opacity": 1,
        "position": "absolute",
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(112, 112, 112, 1)",
        "fontSize": 20,
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontFamily": "Apple SD Gothic Neo",
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
        "left": 120,
        "top": 173.5
      },

      


    "home_x7": {
      "opacity": 0.12139099836349487,
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
      "left": 52,
      "top": 393
    }
  });


export {FoodFlagRed};




