import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ViewContact extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>View Contact</Text>
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
