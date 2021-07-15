import React, {Component} from 'react';
import {Loading} from '../components/common';
import axios from 'axios';
import {BarCode} from '../components'
import {FoodFlagRed} from '../components'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default class FlagRed extends Component{
    constructor(props){
        super(props);
        this.state = {
            // food_id: "",
            // food_name: "",
            loading: false,
            jwt: this.props.jwt

        };
        this.home = this.home.bind(this);
        // this.getFoodName = this.getFoodName.bind(this);
        // this.getFoodName();
    }

    home(){
        this.props.home();
    }

    // getFoodName(){
    //     const headers = {
    //         'authorization': this.props.jwt
    //     };

    //     axios({
    //         method: 'GET',
    //         url: ''
    //     })



    // }
    render(){
        if (this.state.loading) {
          return (
            <Loading size={'large'} />
           );
        } else {
        return (
          <FoodFlagRed
          jwt = {this.state.jwt}
          nutrition_list = {this.state.nutrition_list}
          addPreference = {this.props.addPreference}
          deleteJWT = {this.props.deleteJWT}
          home = {this.props.home}
          removePreference = {this.props.removePreference}
          scanPage = {this.props.scanPage}
          scanner = {this.props.scanner}
          barCode = {this.props.barCode}
          />
        )
      }
      }
}

export{FlagRed};
