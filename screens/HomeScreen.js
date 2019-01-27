import React from 'react';
import {
    Image,
    AlertIOS,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { WebBrowser } from 'expo';
import devEnv from '../devEnv';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    state = {
        backgroundUrl: '',
        location: {
            lat: '',
            lng: ''
        },
        tempData: {
            realFeel: '',
            temp: '',
            tempSummary: '',
            precipProbability: ''
        }
    }
    componentDidMount() {
        
        // fetch('https://api.unsplash.com/photos/random', {
        //     method: 'GET',
        //     headers: {
        //         Authorization: `Client-ID ${devEnv.DARKSKY_API}`
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
                <View style={styles.startButtonContainer}>
                    <TouchableOpacity onPress={this._handleStartPress}>
                        <Text style={styles.startText}>Get Weather</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.startButtonContainer}>
                    <Text>{this.state.location.lat}</Text>
                </View>
                <Image
                    source={{ uri: this.state.backgroundUrl || 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80' }}
                    style={styles.backgroundImage} />
            </View>
        );
    }

    _handleStartPress = () => {
        // AlertIOS.alert('Sync Complete', 'All your data are belong to us.');
        navigator.geolocation.getCurrentPosition((pos) => {
            this.setState({
                location: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
            })
            this.getCurrentWeather();
        })
    };

    getCurrentWeather = () => {
        console.log('in getCurrentWeather');
        console.log(this.state.location);
        fetch(`http://192.168.1.5:5000/api/weather/${this.state.location.lat}/${this.state.location.lng}`)
            .then(response => {
                return response.json()
            })
            .then(res => {
                // this.setState({
                //     tempData: {
                //         realFeel: res.currently.apparentTemperature,
                //         temp: res.currently.temperature,
                //         tempSummary: res.currently.icon,
                //         precipProbability: res.currently.precipProbability
                //     }
                // })
                console.log(res);
            })
            .catch(err => {
                console.log('error in darksky api call', err);
            })

    }
}

// "currently": Object {
// [02:44:03]     "apparentTemperature": -23.91,
// [02:44:03]     "cloudCover": 0,
// [02:44:03]     "dewPoint": -18.85,
// [02:44:03]     "humidity": 0.79,
// [02:44:03]     "icon": "clear-night",
// [02:44:03]     "nearestStormBearing": 221,
// [02:44:03]     "nearestStormDistance": 153,
// [02:44:03]     "ozone": 366.72,
// [02:44:03]     "precipIntensity": 0,
// [02:44:03]     "precipProbability": 0,
// [02:44:03]     "pressure": 1024.2,
// [02:44:03]     "summary": "Clear",
// [02:44:03]     "temperature": -14.38,
// [02:44:03]     "time": 1548578643,
// [02:44:03]     "uvIndex": 0,
// [02:44:03]     "visibility": 10,
// [02:44:03]     "windBearing": 325,
// [02:44:03]     "windGust": 5.84,
// [02:44:03]     "windSpeed": 3.3,
// [02:44:03]   },


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        

    },
    startButtonContainer: {
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    startText: {
        padding: 20,
        fontSize: 25,
        color: '#fff',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 15
    },
});
