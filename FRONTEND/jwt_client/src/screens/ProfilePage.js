import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableHighlight} from 'react-native';
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
import {Profile, ProfileEdit, ProfileEditPhone, ProfileVerifyPhone} from '../components';
import {Loading} from '../components/common';
import axios from 'axios';

export default class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          profiles: [],
          loading: true,
          jwt: this.props.jwt,
          page:0
        };
        this.getInfo = this.getInfo.bind(this);
        this.setProfileEdit = this.setProfileEdit.bind(this);
        this.setProfilePage = this.setProfilePage.bind(this);
        this.setProfilePhone = this.setProfilePhone.bind(this);
        this.setProfileVerify = this.setProfileVerify.bind(this);
        this.getInfo();
    }
  
    getInfo() {
        const headers = {
          'authorization': this.props.jwt
        };

        let promises = [];
        axios({
          method: 'GET',
          url: 'http://localhost:3000/api/user/profile',
          headers: headers,
        }).then((response) => {
         console.log(response.data)
         this.setState({profiles:response.data, loading: false});
        }).catch((error) => {
          console.log(error); 
        });
    }

    setProfileEdit() {
      this.setState({page:1});
    }

    setProfilePage() {
      this.setState({loading:true});
      this.getInfo();
      this.setState({page:0});
    }

    setProfilePhone() {
      this.setState({page:2});
    }

    setProfileVerify() {
      this.setState({page:3});
    }

  
    _keyExtractor = (item, index) => item.id;
  
    render(){
      if (this.state.loading) {
        return (
          <Loading size={'large'} />
         );
      } else if (this.state.page == 0){
      return (
        <Profile
        jwt = {this.state.jwt}
        profiles = {this.state.profiles}
        home = {this.props.home}
        scanPage = {this.props.scanPage}
        deleteJWT = {this.props.deleteJWT}
        setProfileEdit = {this.setProfileEdit}
        setProfilePage = {this.setProfilePage}
        barCode = {this.props.barCode}
        />
      )
    }
    else if (this.state.page == 1){
      return (
        <ProfileEdit
        jwt = {this.state.jwt}
        profiles = {this.state.profiles}
        home = {this.props.home}
        setProfileEdit = {this.setProfileEdit}
        setProfilePage = {this.setProfilePage}
        setProfilePhone = {this.setProfilePhone}
        scanPage = {this.props.scanPage}
        deleteJWT = {this.props.deleteJWT}
        />
      )
    } else if (this.state.page == 2) {
      return (
        <ProfileEditPhone
      jwt = {this.state.jwt}
      profiles = {this.state.profiles}
      home = {this.props.home}
      setProfileEdit = {this.setProfileEdit}
      setProfilePage = {this.setProfilePage}
      setProfilePhone = {this.setProfilePhone}
      setProfileVerify = {this.setProfileVerify}
      scanPage = {this.props.scanPage}
      deleteJWT = {this.props.deleteJWT}
      />
      )
    } else if (this.state.page == 3) {
      return (
        <ProfileVerifyPhone
      jwt = {this.state.jwt}
      profiles = {this.state.profiles}
      home = {this.props.home}
      setProfileEdit = {this.setProfileEdit}
      setProfilePage = {this.setProfilePage}
      setProfilePhone = {this.setProfilePhone}
      scanPage = {this.props.scanPage}
      deleteJWT = {this.props.deleteJWT}
      />
      )
    }
    }
  }
