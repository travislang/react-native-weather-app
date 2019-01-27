import React from 'react';
import {
    Image,
    AlertIOS,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
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
        loading: false,
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.startButtonContainer}>
                    {!this.state.loading ? 
                        <TouchableOpacity onPress={this._handleStartPress}
                            style={styles.startButton}>
                            <Text style={styles.startText}>Get Weather</Text>
                        </TouchableOpacity>
                        :
                        <ActivityIndicator size="large" color="#83d8fc" />
                    }
                    
                </View>
                <Image
                    source={{ uri: this.state.backgroundUrl || 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80' }}
                    style={styles.backgroundImage} />
            </View>
        );
    }

    _handleStartPress = () => {
        console.log('hit');
        
        navigator.geolocation.getCurrentPosition((pos) => {
            this.setState({
                loading: true,
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
        fetch(`http://192.168.1.5:5000/api/weather/${this.state.location.lat}/${this.state.location.lng}`)
            .then(response => {
                return response.json()
            })
            .then(res => {
                this.setState({
                    tempData: {
                        realFeel: res.currently.apparentTemperature,
                        temp: res.currently.temperature,
                        tempSummary: res.currently.icon,
                        precipProbability: res.currently.precipProbability
                    }
                })
                this.getWeatherImage();
            })
            .catch(err => {
                console.log('error getting weather data', err);
            })

    }

    getWeatherImage = () => {
        console.log('this is summary of current temp', this.state.tempData.tempSummary);
        fetch(`http://192.168.1.5:5000/api/weather-image?summary=${this.state.tempData.tempSummary}`)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    loading: false,
                    backgroundUrl: result.urls.raw
                })
            })
            .catch(err => {
                console.log('error in get', err);

            })
    }
}

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
        alignItems: 'center',
    },
    startButton: {
        backgroundColor: 'rgba(0,0,0, 0.3)',
        borderRadius: 15,
    },
    startText: {
        padding: 20,
        fontSize: 25,
        color: '#fff',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 15,
        
    },
});
