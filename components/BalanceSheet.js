import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faDollarSign} from '@fortawesome/free-solid-svg-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
var token = null;
var username = null;
var item1 = null;
class Income extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Items: [],
      token: '',
      username: '',
      Amount: 0,
      item1: item1,
      itemid: 0,
    };
  }
  ItemSeparatorComponent = () => {
    return (
      <View style={{height: 1, width: '100%', backgroundColor: '#ffff'}} />
    );
  };
  componentDidMount() {
    var t = this;
    setTimeout(() => {
      t.setState({item1: item1});
    }, 10),
      (this._unsubscribe = this.props.navigation.addListener('focus', () => {
        setTimeout(() => {
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
                    for (
                      var o = new Array(), c = 0, u = t.state.item1.id, s = 0;
                      s < n.length;
                      s++
                    )
                      n[s].Username == username &&
                      1 == n[s].Type &&
                      n[s].SheetID == u
                        ? (o.push(n[s]), (c += n[s].Amount))
                        : n[s].Username == username &&
                          0 == n[s].Type &&
                          n[s].SheetID == u &&
                          (c -= n[s].Amount),
                        n[s].externalid == u && t.setState({itemid: n[s].id});
                    for (var i = 0; i < o.length; i++) {
                      for (var j = i + 1; j < o.length; j++) {
                        if (o[i].id < o[j].id) {
                          var temp = o[i];
                          o[i] = o[j];
                          o[j] = temp;
                        }
                      }
                    }

                    t.setState({Items: o}), t.setState({Amount: c});
                  })
                  .then(() => {
                    fetch(
                      'https://balancesheet-application.herokuapp.com/app/sheets/' +
                        t.state.item1.id +
                        '/',
                      {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization:
                            'Token 93317ad305853e19da9bab7502c13cf96b772cdb',
                        },
                        body: JSON.stringify({
                          Amount: t.state.Amount,
                        }),
                      },
                    );
                  })
                  .then(() => {
                    0 != t.state.itemid &&
                      fetch(
                        'https://balancesheet-application.herokuapp.com/app/items/' +
                          t.state.itemid +
                          '/',
                        {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                              'Token 93317ad305853e19da9bab7502c13cf96b772cdb',
                          },
                          body: JSON.stringify({
                            Amount:
                              t.state.Amount < 0
                                ? -t.state.Amount
                                : t.state.Amount,
                            Type: t.state.Amount >= 0,
                          }),
                        },
                      );
                  })
              : Alert.alert('', 'Please connect to the internet');
          });
        }, 50);
      }));
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    var t = this;
    return (
      <View style={j.body}>
        <Text style={j.text}>Amount: {this.state.Amount}</Text>
        <FlatList
          data={this.state.Items}
          renderItem={(o) => {
            var c = o.item;
            return (
              <TouchableOpacity
                onPress={() => {
                  0 != c.externalid
                    ? NetInfo.fetch().then((n) => {
                        n.isConnected
                          ? fetch(
                              'https://balancesheet-application.herokuapp.com/app/sheets/' +
                                c.externalid +
                                '/',
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
                                t.props.navigation.push('Sheets', {
                                  token: t.state.token,
                                  username: username,
                                  item: n,
                                });
                              })
                          : Alert.alert('', 'Please connect to the internet');
                      })
                    : t.props.navigation.navigate('Create', {
                        token: t.state.token,
                        username: username,
                        item: c,
                        Operation: 'Update',
                        Sheet: t.state.item1,
                      });
                }}>
                <View style={j.right}>
                  <Text style={j.innerText}>Name: {c.Name}</Text>
                  <Text style={j.innerText}>Amount: {c.Amount}</Text>
                  <Text style={j.innerText}>
                    Recurrence: {c.Recurrence.toString()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
        />
      </View>
    );
  }
}

class Expense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Items: [],
      token: '',
      username: '',
      Amount: 0,
      item1: item1,
      itemid: 0,
    };
  }
  ItemSeparatorComponent = () => {
    return (
      <View style={{height: 1, width: '100%', backgroundColor: '#ffff'}} />
    );
  };
  componentDidMount() {
    var t = this;
    setTimeout(() => {
      t.setState({item1: item1});
    }, 10),
      (this._unsubscribe = this.props.navigation.addListener('focus', () => {
        setTimeout(() => {
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
                    for (
                      var o = new Array(), c = 0, u = t.state.item1.id, s = 0;
                      s < n.length;
                      s++
                    )
                      n[s].Username == username &&
                      0 == n[s].Type &&
                      n[s].SheetID == u
                        ? (o.push(n[s]), (c -= n[s].Amount))
                        : n[s].Username == username &&
                          1 == n[s].Type &&
                          n[s].SheetID == u &&
                          (c += n[s].Amount),
                        n[s].externalid == u && t.setState({itemid: n[s].id});
                    for (var i = 0; i < o.length; i++) {
                      for (var j = i + 1; j < o.length; j++) {
                        if (o[i].id < o[j].id) {
                          var temp = o[i];
                          o[i] = o[j];
                          o[j] = temp;
                        }
                      }
                    }
                    t.setState({Items: o}), t.setState({Amount: c});
                  })
                  .then(() => {
                    fetch(
                      'https://balancesheet-application.herokuapp.com/app/sheets/' +
                        t.state.item1.id +
                        '/',
                      {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization:
                            'Token 93317ad305853e19da9bab7502c13cf96b772cdb',
                        },
                        body: JSON.stringify({
                          Amount: t.state.Amount,
                        }),
                      },
                    );
                  })
                  .then(() => {
                    0 != t.state.itemid &&
                      fetch(
                        'https://balancesheet-application.herokuapp.com/app/items/' +
                          t.state.itemid +
                          '/',
                        {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                              'Token 93317ad305853e19da9bab7502c13cf96b772cdb',
                          },
                          body: JSON.stringify({
                            Amount:
                              t.state.Amount < 0
                                ? -t.state.Amount
                                : t.state.Amount,
                            Type: t.state.Amount >= 0,
                          }),
                        },
                      );
                  })
              : Alert.alert('', 'Please connect to the internet');
          });
        }, 50);
      }));
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    var t = this;
    return (
      <View style={j.body}>
        <Text style={j.text}>Amount: {this.state.Amount}</Text>
        <FlatList
          data={this.state.Items}
          renderItem={(o) => {
            var c = o.item;
            return (
              <TouchableOpacity
                onPress={() => {
                  0 != c.externalid
                    ? NetInfo.fetch().then((n) => {
                        n.isConnected
                          ? fetch(
                              'https://balancesheet-application.herokuapp.com/app/sheets/' +
                                c.externalid +
                                '/',
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
                                t.props.navigation.push('Sheets', {
                                  token: t.state.token,
                                  username: username,
                                  item: n,
                                });
                              })
                          : Alert.alert('', 'Please connect to the internet');
                      })
                    : t.props.navigation.navigate('Create', {
                        token: t.state.token,
                        username: username,
                        item: c,
                        Operation: 'Update',
                        Sheet: t.state.item1,
                      });
                }}>
                <View style={j.right}>
                  <Text style={j.innerText}>Name: {c.Name}</Text>
                  <Text style={j.innerText}>Amount: {c.Amount}</Text>
                  <Text style={j.innerText}>
                    Recurrence: {c.Recurrence.toString()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
        />
      </View>
    );
  }
}
const Tab = createBottomTabNavigator();
class BalanceSheet extends Component {
  componentDidMount() {
    (token = this.props.route.params.token),
      (username = this.props.route.params.username),
      (item1 = this.props.route.params.item);
  }
  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'black',
        }}>
        <Tab.Screen
          name="Incomes"
          component={Income}
          options={{
            tabBarLabel: 'Incomes',
            tabBarIcon: () => (
              <FontAwesomeIcon icon={faDollarSign} color="green" size="30" />
            ),
          }}
        />
        <Tab.Screen
          name="Expenses"
          component={Expense}
          options={{
            tabBarLabel: 'Expenses',
            tabBarIcon: () => (
              <FontAwesomeIcon icon={faDollarSign} color="red" size="30" />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
export default BalanceSheet;
var j = StyleSheet.create({
  body: {flex: 1, backgroundColor: '#F3EBF6', alignContent: 'center'},
  innerText: {
    textAlignVertical: 'center',
    fontSize: 18,
    width: '76%',
    color: 'rgb(38,50,56)',
    fontWeight: '700',
    fontSize: 14,
    borderRadius: 20,
    fontFamily: 'sans-serif',
  },
  right: {margin: 5, justifyContent: 'space-evenly'},
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 10,
    fontSize: 18,
    width: '76%',
    color: 'rgb(38,50,56)',
    fontWeight: '700',
    fontSize: 14,
    backgroundColor: 'rgba(136, 126, 126, 0.04)',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    alignSelf: 'center',
    fontFamily: 'sans-serif',
  },
  Image1: {color: 'lightgreen'},
  Image2: {color: 'tomato'},
});
