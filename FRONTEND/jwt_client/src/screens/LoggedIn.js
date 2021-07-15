import React, {Component} from 'react';
import {View} from 'react-native';
import AddPage from './AddPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import RemovePage from './RemovePage';
import ScanPage from './ScanPage';
import Scanner from './Scanner';
import FlagRed from './FlagRed';

export default class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      jwt : this.props.jwt
      /*
      0 Home page;
      1 Add Preference page; 
      2 Remove Preference page;
      3 scan panr
      4 bar code
      5 Profile Page
      6. Red Flag
      */
    };
    this.whichPage = this.whichPage.bind(this);
    this.addPreference = this.addPreference.bind(this);
    this.home = this.home.bind(this);
    this.removePreference = this.removePreference.bind(this);
    this.scanPage = this.scanPage.bind(this);
    this.barCode = this.barCode.bind(this);
    this.userProfile = this.userProfile.bind(this);
    this.redFlag = this.redFlag.bind(this);
    // this.greenFlag = this.greenFlag.bind(this);

  }

  whichPage() {  
    
    if(this.state.page == 0){
      return(
        <HomePage
        jwt = {this.state.jwt}
        addPreference = {this.addPreference}
        deleteJWT = {this.props.deleteJWT} 
        removePreference = {this.removePreference}
        barCode = {this.barCode}
        userProfile = {this.userProfile}
        />
      );
    }

    else if(this.state.page == 1){
      return(
        <AddPage 
        jwt = {this.state.jwt}
        home = {this.home}
        deleteJWT = {this.props.deleteJWT}
        removePreference = {this.removePreference}
        addPreferencePage = {this.addPreferencePage}
        profile = {this.userProfile}
        />
      );
    }

    else if(this.state.page == 2){
      return(
        <RemovePage
        jwt = {this.state.jwt}
        addPreference = {this.addPreference}
        deleteJWT = {this.props.deleteJWT}
        home = {this.home}
        profile = {this.userProfile}
/>
      )
    } 

    else if(this.state.page == 3){
      return(
        <ScanPage
        jwt = {this.state.jwt}
        //addPreference = {this.addPreference}
        deleteJWT = {this.props.deleteJWT}
        home = {this.home}
        barCode = {this.barCode}
        profile = {this.userProfile}
        redFlag = {this.redFlag}
/>
      )
    }

    else if(this.state.page == 4){
      return(
        <Scanner
        jwt = {this.state.jwt}
        addPreference = {this.addPreference}
        deleteJWT = {this.props.deleteJWT}
        home = {this.home}
        barCode = {this.barCode}
        profile = {this.userProfile}
        redFlag = {this.redFlag}
      />
      )
    }
        

    else if(this.state.page == 5){
      return(
        <ProfilePage
        jwt = {this.state.jwt}
        deleteJWT = {this.props.deleteJWT}
        home = {this.home}
        barCode = {this.barCode}
        />
      )
    }


    else if(this.state.page == 6){
      return(
        <FlagRed
        jwt = {this.state.jwt}
        deleteJWT = {this.props.deleteJWT}
        home = {this.home}
        scanPage = {this.scanPage}
        barCode = {this.barCode}
/>
      )
    }
  }

  home() {
    this.setState({
      page: 0,
    });
  }

  addPreference() {
    this.setState({
      page: 1
    })
  }

  removePreference(){
    this.setState({
      page: 2
    })
  }

  scanPage(){
    this.setState({
      page: 3
    })
  }

  barCode(){
    this.setState({
      page: 4
    })
  }

  userProfile(){
    this.setState({
      page: 5
    })
  }

  redFlag(){
    this.setState({
      page: 6
    })
  }
  
  render() {
    return <View style={styles.container}>{this.whichPage()}</View>;
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
