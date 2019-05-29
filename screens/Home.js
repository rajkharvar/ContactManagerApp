import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  FlatList
} from 'react-native';
import { Card } from 'native-base';

class Home extends Component {
  static navigationOptions = {
    title: 'Contacts'
  };
  constructor(props) {
    super(props);
    this.state = {
      allContacts: []
    };
  }

  componentWillMount() {
    // This is required if the User adds a new Contact should be updated to Home screen As well

    this.props.navigation.addListener('willFocus', () => {
      this.getAllContacts();
    });
  }

  getAllContacts = async () => {
    try {
      await AsyncStorage.getAllKeys()
        .then(keys => {
          AsyncStorage.multiGet(keys).then(result => {
            this.setState({
              allContacts: result.sort((a, b) => {
                if (JSON.parse(a[1]).fname < JSON.parse(b[1]).fname) {
                  return -1;
                }
                if (JSON.parse(a[1]).fname > JSON.parse(b[1]).fname) {
                  return 1;
                }
                return 0;
              })
            });
          });
        })
        .catch(error => {
          console.log('Error caught while retrieving data', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <FlatList
            data={this.state.allContacts}
            renderItem={({ item }) => {
              contact = JSON.parse(item[1]);
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ViewContact', {
                      key: item[0].toString()
                    })
                  }
                >
                  <Card>
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 50,
                          marginVertical: 12,
                          backgroundColor: '#336699',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0.7
                        }}
                      >
                        <Text style={{ fontSize: 40, color: '#fff' }}>
                          {contact.fname[0].toUpperCase()}
                        </Text>
                      </View>
                      <View style={{ marginLeft: 12, flexDirection: 'column' }}>
                        <Text
                          style={{
                            color: '#336699',
                            fontSize: 24,
                            marginTop: 20
                          }}
                        >
                          {contact.fname} {contact.lname}
                        </Text>
                        <Text
                          style={{
                            color: '#336699',
                            paddingTop: 12,
                            fontSize: 18
                          }}
                        >
                          {contact.phonenumber}
                        </Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => item[0].toString()}
          />
        </View>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddContact')}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addButtonContainer: {
    flex: 1,
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 40,
    height: 70,
    width: 70,
    backgroundColor: '#336699',
    borderColor: '#fff',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 40
  }
});
