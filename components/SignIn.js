import React, {Component} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  TextInput,
  CheckBox,
} from 'react-native';
var x = Dimensions.get('window'),
  S = x.width,
  b = x.height;
(S = parseInt(S)), (b = parseInt(b));
class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      rememberme: 'false',
    };
  }
  fillItems = async () => {
    var username = await AsyncStorage.getItem('username');
    if (username != null) {
      this.setState({username, username});
    }
    var password = await AsyncStorage.getItem('password');
    if (password != null) {
      this.setState({password, password});
    }
    var rememberme = await AsyncStorage.getItem('rememberme');
    if (rememberme != null) {
      this.setState({rememberme, rememberme});
    }
  };
  fetchItems = async () => {
    if ('true' == this.state.rememberme) {
      AsyncStorage.setItem('username', this.state.username);
      AsyncStorage.setItem('password', this.state.password);
      AsyncStorage.setItem('rememberme', 'true');
    } else {
      AsyncStorage.setItem('username', '');
      AsyncStorage.setItem('password', '');
      AsyncStorage.setItem('rememberme', 'false');
    }
  };

  componentDidMount() {
    this.fillItems();
  }
  render() {
    return (
      <View style={styles.Background}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.sign}> Log in</Text>
            <TextInput
              placeholder="    username"
              style={styles.textinput}
              onChangeText={(value) => {
                this.setState({username: value});
              }}
              value={this.state.username}
            />
            <TextInput
              placeholder="    password"
              style={styles.textinput}
              secureTextEntry={true}
              onChangeText={(value) => {
                this.setState({password: value});
              }}
              value={this.state.password}
            />
          </View>
          <View style={styles.boxContainer}>
            <CheckBox
              value={'false' != this.state.rememberme}
              onValueChange={(value) => {
                this.setState({
                  rememberme: false == value ? 'false' : 'true',
                });
              }}
            />
            <Text style={{fontSize: 16, alignSelf: 'center'}}>Remember Me</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              NetInfo.fetch().then((state) => {
                state.isConnected
                  ? fetch(
                      'https://balancesheet-application.herokuapp.com/auth/',
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
                    ).then((res) => {
                      if (!res.ok) {
                        Alert.alert('', 'Invalid Credentials');
                      } else {
                        this.fetchItems(),
                          this.props.navigation.navigate('Items', {
                            username: this.state.username.toLowerCase(),
                            token: res.token,
                          });
                      }
                    })
                  : Alert.alert('', 'Please connect to the internet');
              });
            }}>
            <Text style={{fontSize: 22, color: '#f2f2f2'}}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Signup');
            }}>
            <Text
              style={{
                marginTop: 5,
                textDecorationLine: 'underline',
                color: 'rgb(38,50,56)',
                left: 3,
                alignSelf: 'center',
                marginTop: 15,
              }}>
              Sign up Instead
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default SignIn;
styles = StyleSheet.create({
  sign: {
    paddingTop: 0.06 * b,
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
    paddingTop: 0.1 * b,
    paddingBottom: 0.1 * b,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    color: 'white',
  },
  container: {
    width: 0.8 * S,
    backgroundColor: '#f5f5f5',
    alignSelf: 'center',
    paddingTop: 0.02 * b,
    paddingLeft: 0.02 * S,
    paddingRight: 0.02 * S,
    paddingBottom: 0.02 * b,
    height: 0.6 * b,
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
    marginTop: 0.06 * b,
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
    marginTop: 0.12 * S,
  },
});
