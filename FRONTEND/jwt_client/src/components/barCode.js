import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Dimensions,
    TextInput
} from 'react-native';
import {Input, TextLink, Loading, Button } from './common';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class BarCode extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            barcodeValue:'', 
            scaned: false,
            nutritionID: [],
            
            
        }
        this.scanBarcode = this.scanBarcode.bind(this)
        this.getFood = this.getFood.bind(this)
        this.getNutritionName = this.getNutritionName.bind(this)
        this.getBarcodeManual = this.getBarcodeManual.bind(this)
    }

    
    
    scanBarcode(e) {
        let that = this
        if(!that.state.scaned){
            that.setState({
                barcodeValue: e.data,
                scaned: true
            })
            console.log('scanned')
            deviceStorage.saveItem('barCode', e.data);
            this.props.redFlag()
        }
    }
    
   getBarcodeManual(){
    const { barcodeValue } = this.state;
   
    if(barcodeValue == '') {
        alert("No barcode entered")

    }
    else {
        deviceStorage.saveItem('barCode', barcodeValue);
        // deviceStorage.saveItem('tempAccessToken', response.data.token);
        // deviceStorage.saveItem('request_id', response.data.result.request_id);
        // this.getFood(barcodeValue)
        
        this.props.redFlag()
    }
   }
   
   getNutritionName(nutritionIDList){
    //console.log(code)
    let promises = []
    for (i = 0; i < nutritionIDList.length; i++) {
        promises.push(
            axios.post('http://localhost:3000/api/nutrition/show_id',{
                NutritionID: nutritionIDList[i]
              },
              {
                headers: {
                  authorization: this.props.jwt
                },
              }).then((response_tmp) => {
                console.log(typeof response_tmp.data.Description)
                this.state.nutritionID.push(response_tmp.data.Description);
                }).catch((error) => {
                  console.log(error);
                })
        )
    }
    // deviceStorage.saveItem('nutritionID', nutritionID);
    Promise.all(promises).then(() =>  alert(this.state.nutritionID));


}




getFood(code){
    const headers = {
      'authorization': this.props.jwt
    };
    axios({
      method: 'GET',
      url: `http://localhost:3000/api/food/showFood/${code}`,
      headers: headers,

    }).then((response) => {
    //   for (i = 0; i < response.data.Nutritions.length; i++) {
    //     this.getNutritionName(response.data.Nutritions[i])
    //   }
      this.getNutritionName(response.data.Nutritions)
    //   deviceStorage.saveItem('nutritionID', this.state.nutritionID);
      //this.saveFoodID(response.data.Nutritions);
      //this.getNutritionName(2)
      console.log(this.state.nutritionID)

    }).catch((error) => {
      this.setState({
        error: 'Error retrieving data',
        loading: false
      });
    });
}



render() { 
    const {barcodeValue} = this.state;
    return ( 
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <RNCamera
                    onBarCodeRead={this.scanBarcode}
                    onCameraReady={() => {
                        console.log('ready')
                    }}
                    permissionDialogTitle={'System Information'}
                    permissionDialogMessage={'This app needs to use camera'}
                    style={styles.scan_camera}
                >
                    <View style={styles.scan_cont_box}>
                    <View style={styleXD.input}>
                        <TextInput 
                        style={styleXD.inputBorder}
                        keyboardType = 'number-pad'
                        returnKeyType='done'
                        placeholder="Enter barcode here!!"
                        placeholderTextColor="rgba(242, 237, 237, 1)"
                        value={barcodeValue}
                        onChangeText={(barcodeValue) => this.setState({barcodeValue})}
                        />
                    </View>
                        <View style={styles.scan_cont_circle}>
                        </View>
                    </View>
                    <View style={styles.scan_info_box}>
                    
                    <TouchableOpacity style={styleXD.searchButton}>
                        <Text onPress = {this.getBarcodeManual} style={styleXD.backWords}>
                          Search
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styleXD.backButton}>
                        <Text onPress = {this.props.home} style={styleXD.backWords}>
                          Back
                        </Text>
                    </TouchableOpacity>
                    </View>
                </RNCamera>
            </SafeAreaView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scan_top_box: {
        position: "absolute",
        left: 20,
        top: 20,
        width: 24,
        height: 24
    },
    scan_camera: {
        flex: 1,
        height: windowHeight
    },
    scan_cont_box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    scan_cont_circle: {
        width: 260,
        height: 260,
        borderWidth: 1,
        borderColor: '#919191',
        backgroundColor: 'rgba(255,255,255,0.1)'
    },
    scan_circle_init: {
        width:250,
        height:1,
        backgroundColor:'#00ff00'
    },
    scan_info_box: {
        height: 100,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        width: windowWidth
    },
    scan_info: {
        color: '#fff'
    },

})

const styleXD = StyleSheet.create({
    "backButton": {
        "opacity": 1,
        "backgroundColor": "rgba(140, 187, 25, 1)",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom":0,
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
      "searchButton": {
        "opacity": 1,
        "backgroundColor": "rgba(140, 187, 25, 1)",
        "marginTop": -100,
        "marginRight": 0,
        "marginBottom":20,
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

      "backWords": {
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
        "left": 0,
        "top": -100
      },

      "input": {
        "opacity": 1,
        "backgroundColor": "transparent",
        "marginTop":35, 
        "alignSelf": "center",
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": 284,
        "height": 42,
        "borderTopWidth": 1,
        "borderTopColor": "rgba(242, 237, 237, 1)",
        "borderRightWidth": 1,
        "borderRightColor": "rgba(242, 237, 237, 1)",
        "borderBottomWidth": 1,
        "borderBottomColor": "rgba(242, 237, 237, 1)",
        "borderLeftWidth": 1,
        "borderLeftColor": "rgba(242, 237, 237, 1)",
        "borderTopLeftRadius": 15,
        "borderTopRightRadius": 15,
        "borderBottomLeftRadius": 15,
        "borderBottomRightRadius": 15,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 60,
        "marginLeft": 0,
      },

      "inputBorder": {
        "opacity": 1,
        "backgroundColor": "rgba(242, 237, 237, 1)",
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
        "color": "rgba(242, 237, 237, 1)",
        "fontSize": 15,
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontFamily": "AppleGothic",
        "textAlign": "center"
      },
  });

export {BarCode};


