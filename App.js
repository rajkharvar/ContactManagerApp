import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

// All screens
import Home from './screens/Home';
import EditContact from './screens/EditContact';
import ViewContact from './screens/ViewContact';
import AddContact from './screens/AddContact';

const stack = createStackNavigator(
  {
    Home: { screen: Home },
    EditContact: { screen: EditContact },
    ViewContact: { screen: ViewContact },
    AddContact: { screen: AddContact }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#336699'
      },
      headerTitleStyle: {
        color: '#fff'
      }
    }
  }
);

const App = createAppContainer(stack);
export default App;
