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
  Picker,
} from 'react-native';
var b = Dimensions.get('window'),
  v = b.width,
  E = b.height;
(v = parseInt(v)), (E = parseInt(E));
class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: '',
      Type: !1,
      Amount: 0,
      Recurrence: !1,
      itemid: '',
    };
  }
  componentDidMount() {
    'Update' == this.props.route.params.Operation &&
    null != this.props.route.params.item
      ? this.setState({
          Name: this.props.route.params.item.Name,
          Type: this.props.route.params.item.Type,
          Amount: this.props.route.params.item.Amount,
          Recurrence: 'None' != this.props.route.params.item.Recurrence,
          itemid: this.props.route.params.item.id + '/',
        })
      : this.setState({
          Name: '',
          Type: !1,
          Amount: 0,
          Recurrence: !1,
          itemid: '',
        });
  }
  render() {
    var t = this;
    return (
      <View style={I.Body}>
        <Text style={I.text}>Name: </Text>
        <TextInput
          style={I.textinput}
          value={this.state.Name}
          onChangeText={(l) => {
            t.setState({Name: l});
          }}
        />
        <Text style={I.text}>Type: </Text>
        <Picker
          style={I.picker}
          selectedValue={this.state.Type}
          onValueChange={(l) => {
            t.setState({Type: l});
          }}>
          <Picker.Item label="Income" value={!0} />
          <Picker.Item label="Expense" value={!1} />
        </Picker>
        <Text style={I.text}>Amount: </Text>
        <TextInput
          style={I.textinput}
          value={this.state.Amount.toString()}
          onChangeText={(l) => {
            t.setState({Amount: l});
          }}
          keyboardType="number-pad"
        />
        <Text style={I.text}>Recurrence: </Text>
        <Picker
          style={I.picker}
          selectedValue={this.state.Recurrence}
          onValueChange={(l) => {
            t.setState({Recurrence: l});
          }}>
          <Picker.Item label="Yes" value={!0} />
          <Picker.Item label="No" value={!1} />
        </Picker>
        <TouchableOpacity
          style={I.button}
          onPress={() => {
            '' != t.state.Name
              ? parseInt(t.state.Amount) && parseInt(t.state.Amount) >= 0
                ? (t.setState({Amount: parseInt(t.state.Amount)}),
                  parseInt(t.state.Amount) > 1e9
                    ? Alert.alert('', 'Please enter a smaller number')
                    : NetInfo.fetch().then((l) => {
                        l.isConnected
                          ? fetch(
                              'https://balancesheet-application.herokuapp.com/app/items/' +
                                t.state.itemid,
                              {
                                method: '' == t.state.itemid ? 'POST' : 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization:
                                    'Token 93317ad305853e19da9bab7502c13cf96b772cdb',
                                },
                                body: JSON.stringify({
                                  Name: t.state.Name,
                                  Type: t.state.Type,
                                  Amount: t.state.Amount,
                                  Username: t.props.route.params.username,
                                  SheetID: t.props.route.params.Sheet.id,
                                  Recurrence:
                                    1 == t.state.Recurrence
                                      ? t.props.route.params.Sheet.Type
                                      : 'None',
                                }),
                              },
                            ).then((l) => {
                              t.props.navigation.goBack();
                            })
                          : Alert.alert('', 'Please connect to the internet');
                      }))
                : Alert.alert('', 'Please enter a proper number in Amount')
              : Alert.alert('', 'Name cannot be empty');
          }}>
          <Text style={I.text1}>
            {'Update' == this.props.route.params.Operation
              ? 'Update'
              : 'Create'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Items;
var I = StyleSheet.create({
  Body: {flex: 1, backgroundColor: '#F3EBF6', alignContent: 'center'},
  text1: {
    color: 'rgb(38,50,56)',
    fontWeight: '700',
    fontSize: 20,
    paddingTop: 10,
    borderRadius: 20,
    marginBottom: 0.01 * E,
    fontFamily: 'sans-serif',
  },
  text: {
    width: '76%',
    color: 'rgb(38,50,56)',
    fontWeight: '700',
    fontSize: 20,
    paddingTop: 10,
    borderRadius: 20,
    marginBottom: 0.01 * E,
    fontFamily: 'sans-serif',
    marginLeft: 0.1 * v,
    marginRight: 0.1 * v,
  },
  textinput: {
    width: '80%',
    color: 'rgb(38,50,56)',
    fontWeight: '700',
    fontSize: 14,
    backgroundColor: 'rgba(136, 126, 126, 0.04)',
    padding: 10,
    borderRadius: 20,
    marginBottom: 0.01 * E,
    alignSelf: 'center',
    fontFamily: 'sans-serif',
  },
  picker: {
    width: '76%',
    color: 'rgb(38,50,56)',
    fontWeight: '700',
    fontSize: 14,
    backgroundColor: 'rgba(136, 126, 126, 0.04)',
    padding: 10,
    borderRadius: 20,
    marginBottom: 0.01 * E,
    alignSelf: 'center',
    fontFamily: 'sans-serif',
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#A040FB',
    paddingBottom: 10,
    paddingTop: 10,
    fontFamily: 'sans-serif',
    fontSize: 13,
    shadowRadius: 20,
    alignItems: 'center',
    width: '76%',
    alignSelf: 'center',
    marginTop: 0.02 * E,
  },
});
