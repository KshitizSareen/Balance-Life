import React, {Component} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
var b = Dimensions.get('window'),
  T = b.width,
  S = b.height;
(T = parseInt(T)), (S = parseInt(S));
class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }
  render() {
    return (
      <View style={C.Background}>
        <View style={C.container}>
          <View style={C.textContainer}>
            <Text style={C.sign}>Sign up</Text>
            <TextInput
              placeholder="    username"
              style={C.textinput}
              onChangeText={(n) => {
                this.setState({username: n});
              }}
              value={this.state.username}
            />
            <TextInput
              placeholder="    password"
              style={C.textinput}
              secureTextEntry={!0}
              onChangeText={(n) => {
                this.setState({password: n});
              }}
              value={this.state.password}
            />
          </View>
          <TouchableOpacity
            style={C.button}
            onPress={() => {
              NetInfo.fetch().then((n) => {
                n.isConnected
                  ? fetch(
                      'https://balancesheet-application.herokuapp.com/app/users/',
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          username: this.state.username.toLowerCase(),
                          password: this.state.password,
                        }),
                      },
                    ).then((n) => {
                      n.ok
                        ? (Alert.alert('', 'Signup Succesful'),
                          fetch(
                            'https://balancesheet-application.herokuapp.com/app/sheets/',
                            {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization:
                                  'Token 93317ad305853e19da9bab7502c13cf96b772cdb',
                              },
                              body: JSON.stringify({
                                Name: new Date().getUTCDate(),
                                Type: 'Daily',
                                Username: this.state.username.toLowerCase(),
                              }),
                            },
                          ),
                          fetch(
                            'https://balancesheet-application.herokuapp.com/app/sheets/',
                            {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization:
                                  'Token 93317ad305853e19da9bab7502c13cf96b772cdb',
                              },
                              body: JSON.stringify({
                                Name: new Date().getUTCMonth() + 1,
                                Type: 'Monthly',
                                Username: this.state.username.toLowerCase(),
                              }),
                            },
                          ),
                          fetch(
                            'https://balancesheet-application.herokuapp.com/app/sheets/',
                            {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization:
                                  'Token 93317ad305853e19da9bab7502c13cf96b772cdb',
                              },
                              body: JSON.stringify({
                                Name: new Date().getUTCFullYear(),
                                Type: 'Yearly',
                                Username: this.state.username.toLowerCase(),
                              }),
                            },
                          ))
                        : Alert.alert('', 'Username already exists');
                    })
                  : Alert.alert('', 'Please connect to the internet');
              });
            }}>
            <Text style={{fontSize: 22, color: '#f2f2f2'}}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Auth');
            }}>
            <Text
              style={{
                marginTop: 10,
                textDecorationLine: 'underline',
                color: '#8C55AA',
                left: 3,
                alignSelf: 'center',
              }}>
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Signup;
C = StyleSheet.create({
  sign: {
    paddingTop: 0.06 * S,
    color: '#8C55A9',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 23,
    alignSelf: 'center',
  },
  Background: {
    flex: 1,
    backgroundColor: '#F3EBF9',
    alignContent: 'center',
    paddingTop: 0.1 * S,
    paddingBottom: 0.1 * S,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    color: 'white',
  },
  container: {
    width: 0.8 * T,
    backgroundColor: '#f5f5f5',
    alignSelf: 'center',
    paddingTop: 0.02 * S,
    paddingLeft: 0.02 * T,
    paddingRight: 0.02 * T,
    paddingBottom: 0.02 * S,
    height: 0.6 * S,
    borderRadius: 15,
    shadowRadius: 35,
  },
  textstyleUsername: {fontSize: 24, fontWeight: '100'},
  textstylePassword: {marginTop: 20, fontSize: 24, fontWeight: '100'},
  textinput: {
    width: '76%',
    color: 'rgb(38,50,56)',
    fontWeight: '700',
    fontSize: 14,
    backgroundColor: 'rgba(136, 126, 126, 0.04)',
    padding: 10,
    borderRadius: 20,
    marginTop: 0.06 * S,
    alignSelf: 'center',
    fontFamily: 'sans-serif',
  },
  boxContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 5,
  },
  buttonContainer: {alignSelf: 'center'},
  button: {
    borderRadius: 5,
    color: '#fff',
    backgroundColor: '#E040FB',
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 10,
    paddingTop: 10,
    fontFamily: 'sans-serif',
    fontSize: 13,
    shadowRadius: 20,
    alignItems: 'center',
    width: '76%',
    alignSelf: 'center',
    marginTop: 0.12 * T,
  },
});
