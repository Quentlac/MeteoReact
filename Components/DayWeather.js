import React from "react";
import {Text, StyleSheet, View, Image, Platform, ScrollView} from "react-native";
import {Divider} from 'react-native-elements';

import moment from "moment";


class DayWeather extends React.Component{

    constructor(props) {
        super(props);

        this.wind_direction = ["Nord", "Nord-Est", "Est", "Sud-Est", "Sud", "Sud-Ouest", "Ouest", "Nord-Ouest"]
    }

    _displayDirectionWind(degrees){
        return this.wind_direction[Math.round((degrees - 20) / 40) % 9];
    }

    _displayIconWeather(){
        let icon;

        if(this.props.route.params.data.weather <= 1){
            icon = require("../assets/sun.png");
        }
        else if(this.props.route.params.data.weather <= 3){
            icon = require("../assets/cloudsun.png");
        }
        else if(this.props.route.params.data.weather <= 7){
            icon = require("../assets/cloud.png");
        }
        else{
            icon = require("../assets/rain.png");
        }

        return (<Image style={styles.weatherIcon} source={icon}></Image>);
    }

    render() {
        this.props.navigation.setOptions({title: "Météo du " + moment(this.props.route.params.data.datetime).format("DD/MM/YYYY") });

        return (
            <View style={styles.root}>
                <ScrollView>
                    <View style={styles.basicInfos}>
                        {this._displayIconWeather()}
                        <Text style={styles.temperature}>🌡️{this.props.route.params.data.tmin}°C / {this.props.route.params.data.tmax}°C</Text>
                    </View>

                    <View style={styles.detailledInfos}>
                        <View style={styles.infos}>
                            <Text style={styles.infoname}>🌪️ Vitesse du vent</Text>
                            <Text style={styles.infovalue}>{this.props.route.params.data.wind10m} km/h</Text>
                        </View>

                        <View style={styles.infos}>
                            <Text style={styles.infoname}>🌬️ Rafales de vent</Text>
                            <Text style={styles.infovalue}>{this.props.route.params.data.gust10m} km/h</Text>
                        </View>

                        <View style={styles.infos}>
                            <Text style={styles.infoname}>🧭 Direction du vent</Text>
                            <Text style={styles.infovalue}>{this._displayDirectionWind(this.props.route.params.data.dirwind10m)}</Text>
                        </View>

                        <Divider style={{marginVertical: 20}} orientation="horizontal"></Divider>

                        <View style={styles.infos}>
                            <Text style={styles.infoname}>🌧️ Précipitations</Text>
                            <Text style={styles.infovalue}>{this.props.route.params.data.rr10} mm</Text>
                        </View>

                        <View style={styles.infos}>
                            <Text style={styles.infoname}>☔ Probabilité pluie</Text>
                            <Text style={styles.infovalue}>{this.props.route.params.data.probarain} %</Text>
                        </View>

                        <Divider style={{marginVertical: 20}} orientation="horizontal"></Divider>

                        <View style={styles.infos}>
                            <Text style={styles.infoname}>🌞 Ensoleillement</Text>
                            <Text style={styles.infovalue}> {this.props.route.params.data.sun_hours} h</Text>
                        </View>

                        <Divider style={{marginVertical: 20}} orientation="horizontal"></Divider>

                        <View style={styles.infos}>
                            <Text style={styles.infoname}>❄️ Probabilité gel</Text>
                            <Text style={styles.infovalue}>{this.props.route.params.data.probafrost}%</Text>
                        </View>

                    </View>

                </ScrollView>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#094860",
        alignItems: "center"

    },

    basicInfos: {
        paddingTop: 10,
        alignItems: "center",
        paddingBottom: 10
    },

    weatherIcon: {
        height: 120,
        width: 120,
        margin: 10,
        resizeMode: "contain"
    },

    temperature: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#c1f1ef",
        padding: 2
    },

    detailledInfos: {
        backgroundColor: "rgba(46,129,194,0.57)",
        width: Platform.OS == 'web' ? 400 : "94%",
        marginHorizontal: Platform.OS == 'web' ? 0 : "3%",
        padding: 30,
        margin: 10,
        borderRadius: 20
    },

    infos: {
        flexDirection: "row",
        marginVertical: 10
    },

    infoname: {
        flex: 2,
        textAlign: "left",
        color: "white",
        fontSize: 15
    },

    infovalue: {
        flex: 1,
        textAlign: "right",
        color: "white",
        fontWeight: "bold",
        fontSize: 15
    }

});

export default DayWeather;