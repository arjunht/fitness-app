import React from 'react';
import { View } from 'react-native';
import AddEntry from '../components/AddEntry';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View>
		<AddEntry />
      </View>
    );
  }
}