import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';

class ViewContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      phonenumber: '',
      email: '',
      address: ''
    };
  }
  static navigationOptions = {
    title: ''
  };
  componentDidMount() {
    let key = this.props.navigation.getParam('key', '1');
    this.fetchContactDetails(key);
  }

  fetchContactDetails = async key => {
    await AsyncStorage.getItem(key).then(data => {
      let contact = JSON.parse(data);
      this.setState({
        fname: contact.fname,
        lname: contact.lname,
        phonenumber: contact.phonenumber,
        email: contact.email,
        address: contact.address
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#74B9FF'
          }}
        >
          <Text style={{ fontSize: 60, color: '#fff' }}>
            {this.state.fname[0]}
            {this.state.lname[0]}
          </Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#336699' }}>{this.state.fname}</Text>
          <Text style={{ color: '#336699' }}>{this.state.lname}</Text>
          style={{ color: '#336699' }}
        </View>
      </View>
    );
  }
}
export default ViewContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
