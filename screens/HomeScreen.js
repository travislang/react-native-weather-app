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
                {this.state.tempData.realFeel ?
                <View style={styles.weatherCard}>
                    <View style={styles.weatherCardTemps}>
                        <View style={styles.tempGroup}>
                            <Text style={styles.weatherCardText}>
                                {Math.round(this.state.tempData.realFeel)}
                                &deg; F
                            </Text>
                            <Text style={styles.textSubHeading}>Feels Like</Text>
                        </View>
                        <View style={styles.tempGroup}>
                            <Text style={styles.weatherCardText}>
                                {Math.round(this.state.tempData.precipProbability)}
                                %
                            </Text>
                                <Text style={styles.textSubHeading}>Precip Chance</Text>
                        </View>
                    </View>
                    <View style={styles.tempSummary}>
                        <Text style={styles.weatherCardSummaryText}>
                            {this.state.tempData.tempSummary}
                        </Text>
                    </View>
                </View>
                :
                <View></View>
                }
                <View style={styles.aboutCard}>
                    <Text style={{ color: '#9e9e9e', textAlign: 'center'}}>Weather data provided by DarkSky API & images supplied by Unsplash API</Text>
                </View>
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
                let tempSummary;
                switch (res.currently.icon) {
                    case 'clear-day':
                        tempSummary = 'Clear Day :)'
                        break;
                    case 'clear-night':
                        tempSummary = 'Clear Evening :)'
                        break;
                    case 'rain':
                        tempSummary = 'rain'
                        break;
                    case 'snow':
                        tempSummary = 'snowing'
                        break;
                    case 'sleet':
                        tempSummary = 'sleet'
                        break;
                    case 'wind':
                        tempSummary = 'wind'
                        break;
                    case 'fog':
                        tempSummary = 'fog'
                        break;
                    case 'cloudy':
                        tempSummary = 'cloudy'
                        break;
                    case 'partly-cloudy-day':
                        tempSummary = 'partly Cloudy'
                        break;
                    case 'partly-cloudy-night':
                        tempSummary = 'partly Cloudy Evening'
                        break;
                    default:
                        tempSummary = 'A lovely Day'
                }
                this.setState({
                    tempData: {
                        realFeel: res.currently.apparentTemperature,
                        temp: res.currently.temperature,
                        tempSummary: tempSummary,
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
        backgroundColor: 'rgba(3,169,244, 0.25)',
        borderRadius: 15,
    },
    startText: {
        padding: 20,
        fontSize: 25,
        color: '#fff',
        borderWidth: 1.5,
        borderColor: '#fff',

        borderRadius: 15,
    },
    weatherCard: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        marginTop: 25,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    weatherCardTemps: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    weatherCardText: {
        fontSize: 35,
        color: '#fff',
    },
    tempGroup: {
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
    },
    textSubHeading: {
        color: '#fff'
    },
    tempSummary: {
        alignItems: 'center',
        marginTop: 15
    },
    weatherCardSummaryText: {
        fontSize: 20,
        color: '#fff',
        borderRadius: 5,
    },
    aboutCard: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.15)',
        alignItems: 'center',
        color: '#e0e0e0'
    },
});
