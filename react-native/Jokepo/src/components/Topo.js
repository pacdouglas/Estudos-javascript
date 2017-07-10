import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';

export default class Topo extends Component {
  render() {
    return (
      <View>
        <Image source={require("../../imgs/jokenpo.png")} />
      </View>
    );
  }
}