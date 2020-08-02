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

var b = Dimensions.get('window'),
  v = b.width,
  S = b.height;
(v = parseInt(v)), (S = parseInt(S));
class SheetList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Sheets: [],
    };
  }
  ItemSeparatorComponent = () => {
    return (
      <View style={{height: 1, width: '100%', backgroundColor: '#ffff'}} />
    );
  };
  componentDidMount() {
    var t = this;
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      setTimeout(() => {
        NetInfo.fetch().then((n) => {
          n.isConnected
            ? fetch(
                'https://balancesheet-application.herokuapp.com/app/sheets/',
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
                  for (var o = new Array(), l = 0; l < n.length; l++)
                    n[l].Username == t.props.route.params.username &&
                      n[l].Type == t.props.route.params.type &&
                      o.push(n[l]);
                  for (var i = 0; i < o.length; i++) {
                    for (var j = i + 1; j < o.length; j++) {
                      if (o[i].id < o[j].id) {
                        var temp = o[i];
                        o[i] = o[j];
                        o[j] = temp;
                      }
                    }
                  }
                  t.setState({Sheets: o});
                })
            : Alert.alert('', 'Please connect to the internet');
        });
      }, 200);
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    var t = this;
    return (
      <View style={x.body}>
        <FlatList
          data={this.state.Sheets}
          renderItem={(n) => {
            var o = n.item;
            return (
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => {
                  return t.props.navigation.navigate('Sheets', {
                    username: t.props.route.params.username,
                    token: t.props.route.params.token,
                    item: o,
                  });
                }}>
                <View style={x.Sheets}>
                  <Text style={x.innerText}> {o.Name}</Text>
                </View>
                <View style={x.right}>
                  <Text style={x.Text}>{o.Name}</Text>
                  <Text style={x.Text}>{o.Type}</Text>
                  <Text style={x.Text}>{o.Amount}</Text>
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
export default SheetList;
x = StyleSheet.create({
  body: {flex: 1, backgroundColor: '#F3EBF6', alignContent: 'center'},
  Sheets: {
    width: 0.3 * v,
    height: 0.23 * S,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    margin: 10,
    borderColor: 'black',
    borderRadius: 10,
    borderRadius: 15,
    shadowRadius: 35,
  },
  innerText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 0.1 * S,
    fontSize: 18,
    width: '76%',
    color: 'rgb(38,50,56)',
    fontWeight: '700',
    fontSize: 14,
    backgroundColor: 'rgba(136, 126, 126, 0.04)',
    padding: 10,
    borderRadius: 20,
    marginBottom: 0.1 * S,
    alignSelf: 'center',
    fontFamily: 'sans-serif',
  },
  right: {alignSelf: 'center', marginLeft: 0.2 * v},
  Text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 10,
    fontSize: 18,
    width: '100%',
    color: 'rgb(38,50,56)',
    fontWeight: '700',
    fontSize: 14,
    backgroundColor: 'rgba(136, 126, 126, 0.04)',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
    fontFamily: 'sans-serif',
  },
});
