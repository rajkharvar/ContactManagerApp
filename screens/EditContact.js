import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class EditContact extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Edit Contact</Text>
      </View>
    );
  }
}
export default EditContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
