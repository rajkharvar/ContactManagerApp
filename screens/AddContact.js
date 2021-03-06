import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  ScrollView,
  KeyboardAvoidingView
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

class AddContact extends Component {
  static navigationOptions = {
    title: 'Add Contact'
  };
  constructor(props) {
    super(props);
    this.state = {
      fnmae: '',
      lname: '',
      phonenumber: '',
      email: '',
      address: ''
    };
  }

  addContact = async () => {
    if (
      this.state.fname !== '' &&
      this.state.lname !== '' &&
      this.state.email !== '' &&
      this.state.phonenumber !== '' &&
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
      await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(contact))
        .then(() => {
          this.props.navigation.goBack();
          console.log(`firstName: ${this.state.fname}`);
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
          <KeyboardAvoidingView>
            <Form>
              <Item floatingLabel style={{ marginTop: 20 }}>
                <Label>First Name</Label>
                <Input
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={fname => this.setState({ fname })}
                />
              </Item>
              <Item floatingLabel style={{ marginTop: 20 }}>
                <Label>Last Name</Label>
                <Input
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={lname => this.setState({ lname })}
                />
              </Item>
              <Item floatingLabel style={{ marginTop: 20 }}>
                <Label>Phone Number</Label>
                <Input
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='decimal-pad'
                  onChangeText={phonenumber => this.setState({ phonenumber })}
                />
              </Item>
              <Item floatingLabel style={{ marginTop: 20 }}>
                <Label>Email</Label>
                <Input
                  returnKeyType={'next'}
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={email => this.setState({ email })}
                />
              </Item>
              <Item floatingLabel style={{ marginTop: 20 }}>
                <Label>Address</Label>
                <Input
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={address => this.setState({ address })}
                />
              </Item>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  primary
                  full
                  onPress={() => this.addContact()}
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
                    Add Contact
                  </Text>
                </Button>
              </View>
            </Form>
            <View style={{ flex: 1, backgroundColor: '#fff', height: 400 }} />
          </KeyboardAvoidingView>
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}
export default AddContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  }
});
