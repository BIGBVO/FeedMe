import React, {Component} from 'react';
import {View} from 'react-native';
import {Login, Registration, FoodFlagRed, FoodFlagGreen, FoodInfo, ForgetPhoneGetPhoneVerifyCode, Start, ForgetPhoneVerificationCode, RegisterGetPhoneVerifyCode, RegisterVerificationCode} from '../components';
import { PasswordChange } from '../components/PasswordChange';
import {FlagRed} from './FlagRed';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: 0, 
      /*
      0 start page;
      1 registration page; 
      2 login page; 
      3 verifyPhoneNum (get verify code) page due to forget the phone number
      4 verification page (check whether the code is correct) due to forget the phone number
      5 verifyPhoneNum (get verify code) page due to forget the registration
      6 verification page (check whether the code is correct) due to the registration

    */
    };
    this.whichForm = this.whichForm.bind(this);
    this.authRegis = this.authRegis.bind(this);
    this.authLogin = this.authLogin.bind(this);
    this.authForgetPhoneGetVerify = this.authForgetPhoneGetVerify.bind(this);
    this.authForgetPhoneVerification = this.authForgetPhoneVerification.bind(this);
    this.authRegisterPhoneGetVerify = this.authRegisterPhoneGetVerify.bind(this);
    this.authRegisterPhoneVerification = this.authRegisterPhoneVerification.bind(this);
    this.authPasswordChange = this.authPasswordChange.bind(this);
    
    //just for test
    this.redFlag = this.redFlag.bind(this);
  }

  whichForm() {    
    if(this.state.showLogin == 0){
      return(
        <Start 
        authLogin={this.authLogin}
        authRegisterPhoneGetVerify={this.authRegisterPhoneGetVerify}  

        />
      );
    }

    else if(this.state.showLogin == 1){
      return(
        <Registration newJWT={this.props.newJWT }         
        authLogin={this.authLogin}
        authRegis={this.authRegis}
        authForgetPhoneGetVerify={this.authForgetPhoneGetVerify}       
        />
      );
    }

    else if(this.state.showLogin == 2){
      return(
        <Login newJWT={this.props.newJWT}  
        authRegis={this.authRegis}
        authForgetPhoneGetVerify={this.authForgetPhoneGetVerify} 
        authRegisterPhoneGetVerify ={this.authRegisterPhoneGetVerify}
        redFlag = {this.redFlag}      //just for test

        />
      );
    }

    else if(this.state.showLogin == 3){
      return(
        <ForgetPhoneGetPhoneVerifyCode newJWT={this.props.newJWT} 
        authLogin={this.authLogin}
        authRegis={this.authRegis}
        authForgetPhoneGetVerify = {this.authForgetPhoneGetVerify}
        authForgetPhoneVerification = {this.authForgetPhoneVerification}
        authRegisterPhoneGetVerify ={this.authRegisterPhoneVerification}

        />
      );
    }

    else if(this.state.showLogin == 4){
      return(
        <ForgetPhoneVerificationCode newJWT = {this.props.newJWT}
        authForgetPhoneGetVerify = {this.authForgetPhoneGetVerify}
        authPasswordChange={this.authPasswordChange}
        />
      )
    }

    else if(this.state.showLogin == 5){
      return(
        <RegisterGetPhoneVerifyCode 
        authLogin={this.authLogin}
        authRegisterPhoneVerification = {this.authRegisterPhoneVerification}
        />
      )
    }

    else if(this.state.showLogin == 6){
      return(
        <RegisterVerificationCode newJWT = {this.props.newJWT}
        authRegisterPhoneGetVerify={this.authRegisterPhoneGetVerify}
        authRegisterPhoneVerification = {this.authForgetPhoneVerification}
        authRegis={this.authRegis}

        />
      )
    }

    else if(this.state.showLogin == 7) {
      return(
        <PasswordChange newJWT = {this.props.newJWT}
        authLogin={this.authLogin}
        />
      )
    }

        //just for test
    else if(this.state.showLogin == 8) {
      return(
        <FlagRed 
        newJWT = {this.props.newJWT}
        authLogin={this.authLogin}
        />
      )
    }
  }

  authStart() {
    this.setState({
      showLogin: 0
    })
  }
  authRegis() {
    this.setState({
      showLogin: 1,
    });
  }
  
  authLogin() {
    this.setState({
      showLogin: 2,
    });
  }

  authForgetPhoneGetVerify(){
    this.setState({
      showLogin: 3,
    });
  }

  authForgetPhoneVerification(){
    this.setState({
      showLogin: 4,
    });
  }

  authRegisterPhoneGetVerify(){
    this.setState({
      showLogin: 5,
    });
  }

authRegisterPhoneVerification(){
  this.setState({
    showLogin: 6,
  });
}

authPasswordChange(){
  this.setState({
    showLogin: 7,
  });
}

//just for test
redFlag(){
  this.setState({
    showLogin: 8,
  })
}

  render() {
    return <View style={styles.container}>{this.whichForm()}</View>;
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
