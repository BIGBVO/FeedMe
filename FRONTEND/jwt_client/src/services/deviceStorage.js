import { AsyncStorage } from 'react-native';

const deviceStorage = {
    async saveItem(key, value) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.log('AsyncStorage' + key + 'Error: ' + error.message);
      }
    },

    async loadJWT() {
        try {
          const value = await AsyncStorage.getItem('id_token');
          if (value !== null) {
            this.setState({
              jwt: value,
              loading: false
            });
          } else {
            this.setState({
              loading: false
            });
          }
        } catch (error) {
          console.log('AsyncStorage load JWT Error: ' + error.message);
        }
      },

      async deleteJWT() {
        try{
          await AsyncStorage.removeItem('id_token')
          .then(
            () => {
              this.setState({
                jwt: ''
              })
            }
          );
        } catch (error) {
          console.log('AsyncStorage delete JWT Error: ' + error.message);
        }
      },

      async loadPhoneNumber() {
        try {
          const value = await AsyncStorage.getItem('phoneNumber');
          if (value !== null) {
            this.setState({
              phone_number: value,
              loading: false
            });
          } else {
            this.setState({
              loading: false
            });
          }
        } catch (error) {
          console.log('AsyncStorage load Phone Number Error: ' + error.message);
        }
      },


      async loadBarCode() {
        try {
          const value = await AsyncStorage.getItem('barCode');
          if (value !== null) {
            this.setState({
              bar_code: value,
              loading: false
            });
          } else {
            this.setState({
              loading: false
            });
          }
        } catch (error) {
          console.log('AsyncStorage load bar code Error: ' + error.message);
        }
      },

      // async loadNutritionID() {
      //   try {
      //     const value = await AsyncStorage.getItem('nutritionID');
      //     if (value !== null) {
      //       this.setState({
      //         nutritionID: value,
      //         loading: false
      //       });
      //     } else {
      //       this.setState({
      //         loading: false
      //       });
      //     }
      //   } catch (error) {
      //     console.log('AsyncStorage load nutrition ID Error: ' + error.message);
      //   }
      // },

      async deletePhoneNumber() {
        try{
          await AsyncStorage.removeItem('phoneNumber')
        } catch (error) {
          console.log('AsyncStorage remove Phone Number Error: ' + error.message);
        }
      },

      async loadRequestID() {
        try {
          const value = await AsyncStorage.getItem('request_id');
          if (value !== null) {
            this.setState({
              request_id: value,
            });
          } else {
            this.setState({
              loading: false
            });
          }
        } catch (error) {
          console.log('AsyncStorage load Request ID Error: ' + error.message);
        }
      },

      async deleteRequestID() {
        try{
          await AsyncStorage.removeItem('request_id')
        } catch (error) {
          console.log('AsyncStorage remove Request ID Error: ' + error.message);
        }
      },

      async loadTempAccessToken() {
        try {
          const value = await AsyncStorage.getItem('tempAccessToken');
          if (value !== null) {
            this.setState({
              temp_access_token: value,
              loading: false
            });
          } else {
            this.setState({
              loading: false
            });
          }
        } catch (error) {
          console.log('AsyncStorage load Temp Access Token Error: ' + error.message);
        }
      },

      async deleteTempAccessToken() {
        try{
          await AsyncStorage.removeItem('tempAccessToken')
        } catch (error) {
          console.log('AsyncStorage delete Temp Access Token Error: ' + error.message);
        }
      }
  };

export default deviceStorage;