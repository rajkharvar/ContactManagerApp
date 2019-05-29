import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Platform,
  Linking,
  Alert,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Card, CardItem, Button } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

class ViewContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: 'SampleText',
      lname: 'SampleText',
      phonenumber: 'SampleText',
      email: 'SampleText',
      address: 'SampleText',
      key: 'SampleText'
    };
  }
  componentWillMount() {
    this.props.navigation.addListener('willFocus', () => {
      let key = this.props.navigation.getParam('key', '');
      this.fetchContactDetails(key);
    });
  }

  // Getting all Contacts from Local Storage
  fetchContactDetails = async key => {
    await AsyncStorage.getItem(key).then(data => {
      let contact = JSON.parse(data);
      this.setState({
        fname: contact.fname,
        lname: contact.lname,
        phonenumber: contact.phonenumber,
        email: contact.email,
        address: contact.address,
        key: key
      });
    });
  };

  // Call Number
  callNumber = phone => {
    let phoneNumber;
    if (Platform.OS === 'ios') {
      phoneNumber = `telpromt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }

    // Does the device is able to call from dialer
    Linking.canOpenURL(phoneNumber).then(supported => {
      if (!supported) {
        Alert.alert('Unable to call from this device');
      } else {
        return Linking.openURL(phoneNumber);
      }
    });
  };

  // Send Message
  sendMsg = phone => {
    let message = `sms:${phone}`;
    Linking.canOpenURL(message)
      .then(supported => {
        if (!supported) {
          Alert.alert('Unable to redirect to messages');
        } else {
          return Linking.openURL(message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // RemoveContact
  removeContact = key => {
    Alert.alert('Delete Contact ?', `${this.state.fname} ${this.state.lname}`, [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel tapped')
      },
      {
        text: 'OK',
        onPress: async () => {
          await AsyncStorage.removeItem(key)
            .then(() => {
              this.props.navigation.goBack();
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    ]);
  };

  // Edit Contact
  editContact = key => {
    this.props.navigation.navigate('EditContact', { key: key });
  };

  render() {
    return (
      <ScrollView>
        <Card>
          <CardItem
            style={{
              backgroundColor: '#0A79DF',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontSize: 100, padding: 18, color: '#fff' }}>
              {this.state.fname[0]} {this.state.lname[0]}
            </Text>
          </CardItem>
          <CardItem
            style={{
              backgroundColor: '#74B9FF',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: '#fff'
              }}
            >
              {this.state.fname} {this.state.lname}
            </Text>
          </CardItem>
          <CardItem style={{ flexDirection: 'row' }}>
            <Text style={styles.contactText}>{this.state.phonenumber}</Text>
            <TouchableOpacity
              style={{ marginHorizontal: 18 }}
              onPress={() => this.callNumber(this.state.phonenumber)}
            >
              <FontAwesome name='phone' size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.sendMsg(this.state.phonenumber);
              }}
            >
              <Entypo name='new-message' size={30} />
            </TouchableOpacity>
          </CardItem>
          <CardItem style={{ flexDirection: 'row', marginVertical: 24 }}>
            <Text style={styles.contactText}>{this.state.email}</Text>
            <View style={{ right: 0 }}>
              <TouchableOpacity>
                <Entypo name='email' size={30} />
              </TouchableOpacity>
            </View>
          </CardItem>
          <CardItem style={{ flexDirection: 'row' }}>
            <Text style={styles.contactText}>{this.state.address}</Text>
            <Entypo
              name='location'
              size={30}
              color='#FFC733'
              style={{ borderColor: '#ccc', borderRadius: 15 }}
            />
          </CardItem>
        </Card>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            style={{ marginVertical: 18 }}
            primary
            full
            rounded
            onPress={() => this.editContact(this.state.key)}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 18
              }}
            >
              Edit Contact
            </Text>
          </Button>
          <Button
            title='Remove Contact'
            full
            danger
            rounded
            onPress={() => this.removeContact(this.state.key)}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 18
              }}
            >
              Remove Contact
            </Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}
export default ViewContact;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contactText: {
    fontSize: 24,
    color: '#336699'
  }
});
