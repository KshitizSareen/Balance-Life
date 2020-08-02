/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SignIn from './components/SignIn.js';
import Signup from './components/SignUp.js';
import Sheets from './components/Items.js';
import SheetList from './components/ItemList.js';
import BalanceSheet from './components/BalanceSheet.js';
import Items from './components/IncomeandExpense.js';

var F = Dimensions.get('window'),
  R = F.width,
  A = F.height;
(R = parseInt(R)), (A = parseInt(A));
const V = createStackNavigator();
class App extends Component {
  getName = (t) => {
    return 'Daily' == t.Type
      ? 'Day ' + t.Name
      : 'Monthly' == t.Type
      ? 'Month ' + t.Name
      : 'Yearly' == t.Type
      ? 'Year ' + t.Name
      : void 0;
  };
  constructor(props) {
    super(props);

    this.state = {
      modal1visible: !1,
      model2visible: !1,
      route: null,
      navigation: null,
    };
  }
  componentDidMount() {
    this.setState({modal1visible: !1}), this.setState({modal2visible: !1});
  }

  render() {
    var t = this;
    return (
      <NavigationContainer>
        <Modal
          animationType="slide"
          transparent={!0}
          visible={this.state.modal1visible}>
          <View style={z.centeredView}>
            <View style={z.modalView}>
              <TouchableHighlight
                style={z.openButton}
                onPress={() => {
                  t.state.navigation.navigate('Create', {
                    token: t.state.route.params.token,
                    username: t.state.route.params.username,
                    item: null,
                    Operation: 'Create',
                    Sheet: t.state.route.params.item,
                  }),
                    t.setState({modal1visible: !1});
                }}>
                <Text style={z.textStyle}>Add Income or expense</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={z.openButton}
                onPress={() => {
                  NetInfo.fetch().then((n) => {
                    n.isConnected
                      ? fetch(
                          'https://balancesheet-application.herokuapp.com/app/items/',
                          {
                            method: 'GET',
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization:
                                'Token 93317ad305853e19da9bab7502c13cf96b772cdb',
                            },
                          },
                        )
                          .then((t) => {
                            return t.json();
                          })
                          .then((n) => {
                            n.forEach((n) => {
                              (n.SheetID != t.state.route.params.item.id &&
                                n.externalid != t.state.route.params.item.id) ||
                                fetch(
                                  'https://balancesheet-application.herokuapp.com/app/items/' +
                                    n.id +
                                    '/',
                                  {
                                    method: 'DELETE',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      Authorization:
                                        'Token 93317ad305853e19da9bab7502c13cf96b772cdb',
                                    },
                                  },
                                );
                            });
                          })
                          .then(() => {
                            fetch(
                              'https://balancesheet-application.herokuapp.com/app/sheets/' +
                                t.state.route.params.item.id +
                                '/',
                              {
                                method: 'DELETE',
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization:
                                    'Token 93317ad305853e19da9bab7502c13cf96b772cdb',
                                },
                              },
                            ).then(() => {
                              t.state.navigation.goBack();
                            });
                          })
                      : Alert.alert('', 'Please connect to the internet');
                  }),
                    t.setState({modal1visible: !1});
                }}>
                <Text style={z.textStyle}>Delete BalanceSheet</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={z.openButton}
                onPress={() => {
                  t.setState({modal1visible: !1});
                }}>
                <Text style={z.textStyle}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={!0}
          visible={this.state.modal2visible}>
          <View style={z.centeredView}>
            <View style={z.modalView}>
              <TouchableHighlight
                style={z.openButton}
                onPress={() => {
                  NetInfo.fetch().then((n) => {
                    n.isConnected
                      ? null != t.state.route.params.item
                        ? (fetch(
                            'https://balancesheet-application.herokuapp.com/app/items/' +
                              t.state.route.params.item.id +
                              '/',
                            {
                              method: 'DELETE',
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization:
                                  'Token 93317ad305853e19da9bab7502c13cf96b772cdb',
                              },
                            },
                          ),
                          t.state.navigation.goBack())
                        : Alert.alert(
                            '',
                            'You cannot delete an item during creation of a component',
                          )
                      : Alert.alert('', 'Please connect to the internet');
                  }),
                    t.setState({modal2visible: !1});
                }}>
                <Text style={z.textStyle}>Delete Income or expense</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={z.openButton}
                onPress={() => {
                  t.setState({modal2visible: !1});
                }}>
                <Text style={z.textStyle}> Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <V.Navigator>
          <V.Screen
            name="Auth"
            component={SignIn}
            options={{
              title: 'Welcome',
              headerStyle: {backgroundColor: '#F0f0f7'},
            }}
          />
          <V.Screen
            name="Signup"
            component={Signup}
            options={{
              title: 'Welcome',
              headerStyle: {backgroundColor: '#F0f0f7'},
            }}
          />
          <V.Screen
            name="Items"
            component={Sheets}
            options={{
              title: 'Balance Sheets',
              headerStyle: {backgroundColor: '#F0f0f7'},
            }}
          />
          <V.Screen
            name="ItemListView"
            component={SheetList}
            options={{
              title: 'Balance Sheets',
              headerStyle: {backgroundColor: '#F0f0f7'},
            }}
          />
          <V.Screen
            name="Sheets"
            component={BalanceSheet}
            options={(n) => {
              var o = n.route,
                l = n.navigation;
              return {
                title: 'Balance Sheet For ' + t.getName(o.params.item),
                headerStyle: {backgroundColor: '#F0f0f7'},
                headerTitleStyle: {fontSize: 20},
                headerRight: () => {
                  return (
                    <TouchableOpacity
                      style={{margin: 10}}
                      onPress={() => {
                        t.setState({modal1visible: !0}),
                          t.setState({route: o}),
                          t.setState({navigation: l});
                      }}>
                      <FontAwesomeIcon icon={faEllipsisV} size="30" />
                    </TouchableOpacity>
                  );
                },
                headerRightContainerStyle: {margin: 10},
              };
            }}
          />
          <V.Screen
            name="Create"
            component={Items}
            options={(n) => {
              var o = n.route,
                l = n.navigation;
              return {
                title: 'Add Income or Expense',
                headerStyle: {backgroundColor: '#F0f0f7'},
                headerRight: () => {
                  return (
                    <TouchableOpacity
                      style={{margin: 10}}
                      onPress={() => {
                        t.setState({modal2visible: !0}),
                          t.setState({route: o}),
                          t.setState({navigation: l});
                      }}>
                      <FontAwesomeIcon icon={faEllipsisV} size="30" />
                    </TouchableOpacity>
                  );
                },
                headerRightContainerStyle: {margin: 10},
              };
            }}
          />
        </V.Navigator>
      </NavigationContainer>
    );
  }
}
export default App;
z = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#F3EBF6',
    alignContent: 'center',
    alignSelf: 'center',
    paddingTop: 0.25 * A,
  },
  modalView: {
    margin: 0.1 * R,
    backgroundColor: '#F0f0f7',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 5,
    color: '#fff',
    backgroundColor: '#E040FB',
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 10,
    paddingTop: 10,
    fontFamily: 'sans-serif',
    alignSelf: 'center',
    fontSize: 13,
    shadowRadius: 20,
    margin: 10,
  },
  textStyle: {color: 'white', fontWeight: 'bold', textAlign: 'center'},
  modalText: {marginBottom: 15, textAlign: 'center'},
});
