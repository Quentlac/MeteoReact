import React from 'react';
import {View, StyleSheet, Image, Text, FlatList, ScrollView, Platform} from 'react-native';
import ForecastWeatherItem from "./ForecastWeatherItem";
import {getCurrentWeatherByCity, getWeatherForecastByCity} from "../Services/WeatherAPI";
import moment from "moment";

class MainWeather extends React.Component{


    _displayCurrentIconWeather(){
        let icon;

        if(this.state.currentWeather <= 1){
            icon = require("../assets/sun.png");
        }
        else if(this.state.currentWeather <= 3){
            icon = require("../assets/cloudsun.png");
        }
        else if(this.state.currentWeather <= 7){
            icon = require("../assets/cloud.png");
        }
        else{
            icon = require("../assets/rain.png");
        }

        return (<Image style={styles.weatherIcon} source={icon}></Image>);
    }

    _displayTips(){
        let tips = "";
        let firstTips = true;

        if(this.state.currentTemp <= 20) {
            tips = tips.concat("Il fait froid, pensez à bien vous habiller");
            firstTips = false;
        }
        else if(this.state.currentTemp >= 30){
            tips = tips.concat("Il fait très chaud ! Pensez à bien vous rafraîchir 🥵");
            firstTips = false;
        }

        if(this.state.probaRain > 40) {
            if(!firstTips){
                tips = tips.concat(" et à prendre un parapluie ! ☔");
            }
            else
                tips = tips.concat("Il risque de pleuvoir, n'oubliez pas votre parapluie ! ☔");

            firstTips = false;

        }

        else if(this.state.sun_hours > 6){
            if(!firstTips){
                tips = tips.concat(" et à prendre des lunettes de soleil ! 🌞");
            }
            else
                tips = tips.concat("Le soleil est de sortie ! Oubliez pas vos lunettes de soleil ! 🌞");

            firstTips = false;
        }

        if(this.state.wind > 30){
            if(!firstTips){
                tips = tips.concat(" Ahh ! Et gare au vent aussi, ça souffle vraiment dehors ! 🌪️");
            }
            else
                tips = tips.concat("Gare à vous, le vent est violent aujourd'hui ! 🌪️");

            firstTips = false;
        }

        return tips;
    }

    _refreshWeather(){
        getWeatherForecastByCity(38185).then((data) => {
            this.setState({
                currentWeather: data.forecast[0].weather,
                probaRain: data.forecast[0].probarain,
                sun_hours: data.forecast[0].sun_hours,
                wind: data.forecast[0].wind10m,
                weatherForecast: data.forecast.slice(1, 8)
            });
            console.log(this.state.weatherInfo);
        });

        getCurrentWeatherByCity(38185).then((data) => {
            this.setState({
                currentTemp: data[0].observation.temperature.value
            })
        })
    }

    handleDisplayDayDetails = (id) => {

        this.props.navigation.navigate("DayWeather", {data: this.state.weatherForecast.slice()[id]});

    }

    constructor(props) {
        super(props);

        this.week = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        this.state = {
            city: "Grenoble",
        }

        this._refreshWeather();
    }

    render(){

        return(
            <View style={styles.root}>
                    <View style={styles.currentWeatherView}>
                        {this._displayCurrentIconWeather()}
                        <Text style={styles.currentInfoWeather}>🌡️{this.state.currentTemp}°C  | {this.state.probaRain}% 🌧️ | {this.state.wind} km/h 🌪️</Text>
                        <Text style={styles.tips}>{this._displayTips()}</Text>
                    </View>
                    <View style={styles.forecastWeatherView}>
                        <FlatList
                            style={{ height: 50 }}
                            data={this.state.weatherForecast}
                            renderItem={({item}) => <ForecastWeatherItem
                                id={this.state.weatherForecast.findIndex((a) => item == a)}
                                tempMin={item.tmin}
                                tempMax={item.tmax}
                                weatherType={item.weather}
                                day={
                                    this.week[moment(item.datetime).format("d")]
                                }
                                onPress={this.handleDisplayDayDetails}
                            ></ForecastWeatherItem>}></FlatList>
                    </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({

   root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        backgroundColor: "#094860",


   },

    currentWeatherView: {
        paddingTop: 10,
        alignItems: "center",
        paddingBottom: 10
    },

    forecastWeatherView: {
       flex: 4
    },

    weatherIcon: {
        height: 120,
        width: 120,
        margin: 10,
        resizeMode: "contain"
    },

    currentInfoWeather: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#c1f1ef",
        padding: 2
    },

    tips: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        margin: 20,
        padding: 10,
        backgroundColor: "rgba(46,129,194,0.57)",
        borderRadius: 10,
        maxWidth: 350
    }

});



export default MainWeather;