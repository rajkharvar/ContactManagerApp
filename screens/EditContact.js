import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  ScrollView
} from 'react-native';
import {
  Content,
  Input,
  Item,
  Container,
  Label,
  Button,
  Form
} from 'native-base';

class EditContact extends Component {
  static navigationOptions = {
    title: 'Edit Contact'
  };
  constructor(props) {
    super(props);
    this.state = {
      fnmae: '',
      lname: '',
      phonenumber: '',
      email: '',
      address: '',
      key: ''
    };
  }

  // Setting all user data from
  componentDidMount() {
    let key = this.props.navigation.getParam('key', '');
    if (!key) {
      alert('Unable to edit Contact');
    } else {
      this.fetchFromLocalStorage(key);
    }
  }

  fetchFromLocalStorage = async key => {
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

  editContact = async () => {
    if (
      this.state.fname !== '' &&
      this.state.lname !== '' &&
      this.state.email !== '' &&
      this.state.phonenumber != 0 &&
      this.state.address !== ''
    ) {
      let contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        phonenumber: this.state.phonenumber,
        email: this.state.email,
        address: this.state.address
      };
      // Saving to Phone Storage
      await AsyncStorage.mergeItem(this.state.key, JSON.stringify(contact))
        .then(() => {
          this.props.navigation.goBack();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert('All Fields are mandatory');
    }
  };
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{ flex: 1 }}
      >
        <Container style={styles.container}>
          <ScrollView>
            <Form>
              <Item floatingLabel style={{ marginTop: 20 }}>
                <Label>First Name</Label>
                <Input
                  value={this.state.fname}
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={fname => this.setState({ fname })}
                />
              </Item>
              <Item floatingLabel style={{ marginTop: 20 }}>
                <Label>Last Name</Label>
                <Input
                  value={this.state.lname}
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={lname => this.setState({ lname })}
                />
              </Item>
              <Item floatingLabel style={{ marginTop: 20 }}>
                <Label>Phone Number</Label>
                <Input
                  value={this.state.phonenumber}
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='decimal-pad'
                  onChangeText={phonenumber => this.setState({ phonenumber })}
                />
              </Item>
              <Item floatingLabel style={{ marginTop: 20 }}>
                <Label>Email</Label>
                <Input
                  value={this.state.email}
                  returnKeyType={'next'}
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={email => this.setState({ email })}
                />
              </Item>
              <Item floatingLabel style={{ marginTop: 20 }}>
                <Label>Address</Label>
                <Input
                  value={this.state.address}
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={address => this.setState({ address })}
                />
              </Item>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  primary
                  full
                  onPress={() => this.editContact()}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 30
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20,
                      paddingHorizontal: 12,
                      paddingVertical: 6
                    }}
                  >
                    Edit Contact
                  </Text>
                </Button>
              </View>
            </Form>
          </ScrollView>
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}
export default EditContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  }
});
