import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableHighlight} from 'react-native';
import {Home} from '../components';
import {Loading} from '../components/common';
import axios from 'axios';

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          nutrition_id_list: [],
          nutrition_list:[],
          loading: true
        };
        this.scanner = this.scanner.bind(this);
        this.getNutritionList = this.getNutritionList.bind(this);
        this.getNutritionList();
    }
  
    getNutritionList() {
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
              console.log(response_tmp);
              this.state.nutrition_list.push(response_tmp.data);
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

    scanner(){
      this.props.scanner();
    }
  
    _keyExtractor = (item, index) => item.id;
  
    render(){
      if (this.state.loading) {
        return (
          <Loading size={'large'} />
         );
      } else {
      return (
        <Home
        jwt = {this.state.jwt}
        nutrition_list = {this.state.nutrition_list}
        addPreference = {this.props.addPreference}
        removePreference = {this.props.removePreference}
        scanPage = {this.props.scanPage}
        barCode = {this.props.barCode}
        deleteJWT = {this.props.deleteJWT}
        userProfile = {this.props.userProfile}
        />
      )
    }
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    },
    countContainer: {
      alignItems: "center",
      padding: 10
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
      padding: 10,
      justifyContent: 'center'
    },
    FlatlistStyles:{
      flexWrap: 'wrap'
    },
    poster:{
      width: 32,
      height: 32,
      margin:10
    }
  });
  
  export {HomePage};