import React, {Component} from 'react';
import {Loading} from '../components/common';
import axios from 'axios';
import {Scan} from '../components';


export default class ScanPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        //   nutrition_id_list: [],
        //   nutrition_list:[],
          barcode: "",
          loading: false,
          jwt: this.props.jwt
        };
        this.home = this.home.bind(this);
        this.removePreference = this.removePreference.bind(this);
        //this.getPerferenceList = this.getPerferenceList.bind(this);
        //this.getPerferenceList();
    }
  
    home(){
      this.props.home();
    }

    removePreference(){
      this.props.removePreference();
    }

    // getPerferenceList() {
    //     const headers = {
    //       'authorization': this.props.jwt
    //     };

    //     let promises = [];
    //     axios({
    //       method: 'GET',
    //       url: 'http://192.168.0.87:3000/api/user/list_nutrition',
    //       headers: headers,
    //     }).then((response) => {
    //       for (var i = 0; i < response.data.nutrition_id_list.length; i++){
    //         promises.push(
    //           axios.post('http://192.168.0.87:3000/api/nutrition/show_id',{
    //           NutritionID: response.data.nutrition_id_list[i]
    //         },
    //         {
    //           headers: {
    //             authorization: this.props.jwt
    //           },
    //         }).then((response_tmp) => {
    //           this.state.nutrition_list.push(response_tmp.data);
    //           }).catch((error) => {
    //             console.log(error);
    //           })
    //         )
    //       }

    //     Promise.all(promises).then(() =>  this.setState({
    //       loading: false
    //     }));

       
    //     }).catch((error) => {
    //       console.log(error); 
    //     });

        
    // }
  
    render(){
      if (this.state.loading) {
        return (
          <Loading size={'large'} />
         );
      } else {
      return (
        <Scan
        jwt = {this.state.jwt}
        nutrition_list = {this.state.nutrition_list}
        addPreference = {this.props.addPreference}
        deleteJWT = {this.props.deleteJWT}
        home = {this.props.home}
        removePreference = {this.props.removePreference}
        barCode = {this.props.barCode}
        />
      )
    }
    }
  }
  

export {ScanPage};
