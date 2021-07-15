import React, {Component} from 'react';
import {AddPreference} from '../components';
import {Loading} from '../components/common';
import axios from 'axios';

export default class AddPage extends Component { 
  constructor(props) {
      super(props);
      this.state = {
        list: [],
        allergen:[],
        diet: [],
        loading: true
      };
      this.getNutrition = this.getNutrition.bind(this);
      this.getNutrition();
  }

  getNutrition() {
      const headers = {
        'authorization': this.props.jwt
      };
      axios({
        method: 'GET',
        url: 'http://localhost:3000/api/nutrition/',
        headers: headers,
      }).then((response) => {
        console.log(response.data.response.length);
        for (var i = 0; i < response.data.response.length; i++){
          this.state.list.push(response.data.response[i])
          if (response.data.response[i].CategoryID == 0){
            this.state.allergen.push(response.data.response[i]);
          } else if (response.data.response[i].CategoryID == 1){
            this.state.diet.push(response.data.response[i]);
          }
        }
        this.setState({
          loading: false
        })
      }).catch((error) => {
        console.log(error); 
      });
  }

  render(){
    if (this.state.loading) {
      return (
        <Loading size={'large'} />
       );
    } else {
      return (
        <AddPreference
        jwt = {this.props.jwt}
        list = {this.state.list}
        deleteJWT = {this.props.deleteJWT}
        home = {this.props.home}
        />
      )
    }
  }
}
