import React, {Component} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faList} from '@fortawesome/free-solid-svg-icons';
var S = Dimensions.get('window'),
  E = S.width,
  T = S.height;
(E = parseInt(E)), (T = parseInt(T));
class Sheets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DailySheets: [],
      MonthlySheets: [],
      YearlySheets: [],
    };
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      setTimeout(() => {
        NetInfo.fetch().then((n) => {
          if (n.isConnected) {
            this.getSheets();
          } else {
            Alert.alert('', 'Please connect to the internet');
          }
        });
      }, 50);
    });
  }
  getSheets = () => {
    fetch('https://balancesheet-application.herokuapp.com/app/sheets/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token 93317ad305853e19da9bab7502c13cf96b772cdb',
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        var o1 = new Array();
        var o2 = new Array();
        var o3 = new Array();
        for (var s = 0; s < resp.length; s++) {
          if (
            this.props.route.params.username == resp[s].Username &&
            resp[s].Type == 'Daily'
          )
            o1.push(resp[s]);
          else if (
            this.props.route.params.username == resp[s].Username &&
            resp[s].Type == 'Monthly'
          )
            o2.push(resp[s]);
          else if (
            this.props.route.params.username == resp[s].Username &&
            resp[s].Type == 'Yearly'
          )
            o3.push(resp[s]);
        }
        for (var i = 0; i < o1.length; i++) {
          for (var j = i + 1; j < o1.length; j++) {
            if (o1[i].id < o1[j].id) {
              var temp = o1[i];
              o1[i] = o1[j];
              o1[j] = temp;
            }
          }
        }
        for (var i = 0; i < o2.length; i++) {
          for (var j = i + 1; j < o2.length; j++) {
            if (o2[i].id < o2[j].id) {
              var temp = o2[i];
              o2[i] = o2[j];
              o2[j] = temp;
            }
          }
        }
        for (var i = 0; i < o3.length; i++) {
          for (var j = i + 1; j < o3.length; j++) {
            if (o3[i].id < o3[j].id) {
              var temp = o3[i];
              o3[i] = o3[j];
              o3[j] = temp;
            }
          }
        }
        this.setState({DailySheets: o1});
        this.setState({MonthlySheets: o2});
        this.setState({YearlySheets: o3});
      });
  };
  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    var t = this;
    return (
      <View style={w.body}>
        <View style={{flex: 0.33}}>
          <View style={w.sections}>
            <Text style={w.text}>Daily Balance Sheets</Text>
            <TouchableOpacity
              onPress={() => {
                t.props.navigation.navigate('ItemListView', {
                  username: t.props.route.params.username,
                  token: t.props.route.params.token,
                  type: 'Daily',
                });
              }}>
              <FontAwesomeIcon icon={faList} style={w.Image} size="30" />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal={true}
            data={this.state.DailySheets}
            renderItem={(n) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    return t.props.navigation.navigate('Sheets', {
                      username: t.props.route.params.username,
                      token: t.props.route.params.token,
                      item: n.item,
                    });
                  }}>
                  <View style={w.Sheets}>
                    <Text style={w.innerText}>{n.item.Name}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={{flex: 0.33}}>
          <View style={w.sections}>
            <Text style={w.text}>Monthly Balance Sheets</Text>
            <TouchableOpacity
              onPress={() => {
                t.props.navigation.navigate('ItemListView', {
                  username: t.props.route.params.username,
                  token: t.props.route.params.token,
                  type: 'Monthly',
                });
              }}>
              <FontAwesomeIcon icon={faList} size="30" />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal={!0}
            data={this.state.MonthlySheets}
            renderItem={(n) => {
              var o = n.item;
              return (
                <TouchableOpacity
                  onPress={() => {
                    return t.props.navigation.navigate('Sheets', {
                      username: t.props.route.params.username,
                      token: t.props.route.params.token,
                      item: o,
                    });
                  }}>
                  <View style={w.Sheets}>
                    <Text style={w.innerText}>{o.Name}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={{flex: 0.33}}>
          <View style={w.sections}>
            <Text style={w.text}>Yearly Balance Sheets</Text>
            <TouchableOpacity
              onPress={() => {
                t.props.navigation.navigate('ItemListView', {
                  username: t.props.route.params.username,
                  token: t.props.route.params.token,
                  type: 'Yearly',
                });
              }}>
              <FontAwesomeIcon icon={faList} size="30" />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal={!0}
            data={this.state.YearlySheets}
            renderItem={(n) => {
              var o = n.item;
              return (
                <TouchableOpacity
                  onPress={() => {
                    return t.props.navigation.navigate('Sheets', {
                      username: t.props.route.params.username,
                      token: t.props.route.params.token,
                      item: o,
                    });
                  }}>
                  <View style={w.Sheets}>
                    <Text style={w.innerText}>{o.Name}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
}
export default Sheets;
w = StyleSheet.create({
  body: {flex: 1, backgroundColor: '#F3EBF6', alignContent: 'center'},
  sections: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F2f2f2',
    backgroundColor: 'rgba(136, 126, 126, 0.04)',
  },
  text: {
    textAlign: 'left',
    fontSize: 24,
    width: '76%',
    color: 'rgb(38,50,56)',
    fontWeight: '700',
    fontSize: 14,
    borderRadius: 20,
    alignSelf: 'center',
    fontFamily: 'sans-serif',
  },
  Sheets: {
    width: 0.3 * E,
    height: 0.23 * T,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    margin: 10,
    borderColor: 'black',
    borderRadius: 10,
    borderRadius: 15,
    shadowRadius: 35,
    marginTop: 0.02 * T,
  },
  innerText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 0.1 * T,
    fontSize: 18,
    width: '76%',
    color: 'rgb(38,50,56)',
    fontWeight: '700',
    fontSize: 14,
    backgroundColor: 'rgba(136, 126, 126, 0.04)',
    padding: 10,
    borderRadius: 20,
    marginBottom: 0.1 * T,
    alignSelf: 'center',
    fontFamily: 'sans-serif',
  },
});
