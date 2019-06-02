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
import { Card, CardItem, Button, Item, ListItem } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

class ViewContact extends Component {
  static navigationOptions = {
    title: 'Contact Details'
  };
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

  // Send Email
  sendMail = email => {
    let message = `mailto:${email}`;
    Linking.canOpenURL(message)
      .then(supported => {
        if (!supported) {
          Alert.alert('Mail service not supported in this device');
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
              {this.state.fname[0].toUpperCase()}{' '}
              {this.state.lname[0].toUpperCase()}
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
          <ListItem itemDivider>
            <Text>Phone</Text>
          </ListItem>
          <ListItem style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.contactText}>{this.state.phonenumber}</Text>
            </View>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => this.callNumber(this.state.phonenumber)}
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#336699',
                  color: '#336699',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <FontAwesome
                  name='phone'
                  size={30}
                  style={{ color: '#336699' }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => this.sendMsg(this.state.phonenumber)}
              >
                <AntDesign
                  name='message1'
                  size={25}
                  style={{ color: '#336699', alignSelf: 'center' }}
                />
              </TouchableOpacity>
            </View>
          </ListItem>

          <ListItem itemDivider>
            <Text>E-mail</Text>
          </ListItem>
          <ListItem style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.contactText}>{this.state.email}</Text>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => this.sendMail(this.state.email)}
              >
                <Entypo
                  name='mail-with-circle'
                  size={25}
                  style={{ color: '#336699' }}
                />
              </TouchableOpacity>
            </View>
          </ListItem>
          <ListItem itemDivider>
            <Text>Address</Text>
          </ListItem>
          <ListItem>
            <View style={{ flex: 1 }}>
              <Text style={styles.contactText}>{this.state.address}</Text>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <TouchableOpacity style={styles.iconContainer}>
                <Entypo
                  name='location'
                  size={20}
                  color='#336699'
                  style={{ color: '#336699' }}
                />
              </TouchableOpacity>
            </View>
          </ListItem>
        </Card>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            style={{
              marginVertical: 18,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderWidth: 2,
              borderColor: '#74B9FF'
            }}
            onPress={() => this.editContact(this.state.key)}
          >
            <Text
              style={{
                color: '#336699',
                fontSize: 18,
                fontWeight: '500'
              }}
            >
              Edit Contact
            </Text>
          </Button>
          <Button
            title='Remove Contact'
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: '#E44236',
              backgroundColor: '#fff'
            }}
            onPress={() => this.removeContact(this.state.key)}
          >
            <Text
              style={{
                color: '#B83227',
                fontSize: 18,
                fontWeight: '500'
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
    color: '#47535E'
  },
  iconContainer: {
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#336699',
    color: '#336699',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  }
});
