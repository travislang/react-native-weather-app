import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
    state = {
        backgroundUrl: ''
    }
    componentDidMount() {
        // fetch('https://api.unsplash.com/photos/random', {
        //     method: 'GET',
        //     headers: {
        //         Authorization: 'Client-ID 19526e60e3bb5510a26e80513d4486f9d2d9041827949985cedce4aea73b4521'
        //     },
        // })
        //     .then(response => response.json())
        //     .then(result => {
        //         console.log('this is result', result);

        //         this.setState({
        //             backgroundUrl: result.urls.raw
        //         })
        //     })
        //     .catch(err => {
        //         console.log('error in get', err);

        //     })
    }

  render() {
    return (
      <View style={styles.container}>
        <Image
            source={{ uri: this.state.backgroundUrl || 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' }}
            style={{ flex: 1 }} />
        <View style={styles.startButtonContainer}>
        <TouchableOpacity onPress={this._handleStartPress}>
            <Text style={styles.startText}>Help, it didn’t automatically reload!</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  _handleStartPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  startButtonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  startText: {
    fontSize: 14,
    color: '#fff',
  },
});
