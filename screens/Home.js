import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  FlatList
} from 'react-native';

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
              })
            });
            console.log(this.state.allContacts);
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
              return <Text>Jamboo</Text>;
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
