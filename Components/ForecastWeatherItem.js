import React from "react";
import {View, StyleSheet, Image, Text, TouchableOpacity, Platform} from "react-native";



class ForecastWeatherItem extends React.Component{


    _displayWeatherIcon(){
        let icon;
        if(this.props.weatherType <= 1){
            icon = require("../assets/sun.png");
        }
        else if(this.props.weatherType <= 3){
            icon = require("../assets/cloudsun.png");
        }
        else if(this.props.weatherType <= 7){
            icon = require("../assets/cloud.png");
        }
        else{
            icon = require("../assets/rain.png");
        }

        return (<Image style={styles.weatherIcon} source={icon}></Image>);
    }

    render(){

        return(
            <TouchableOpacity style={styles.root} onPress={() => this.props.onPress(this.props.id)}>
                {this._displayWeatherIcon()}
                <Text style={styles.day}>{ this.props.day }</Text>
                <Text style={styles.temperature}>{this.props.tempMin}°C / {this.props.tempMax}°C</Text>
            </TouchableOpacity>
        );

    }


}


const styles = StyleSheet.create({

    root: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 3,
        padding: 10,
        backgroundColor: "rgba(238,238,238,0.26)",
        borderRadius: 10,
        width: Platform.OS == 'web' ? 400 : "94%",
        marginHorizontal: Platform.OS == 'web' ? 0 : "3%"
    },


    weatherIcon: {
        flex: 2,
        height: 50,
        resizeMode: "contain",

    },

    temperature: {
        flex: 4,

        fontWeight: "bold",
        fontSize: 15,
        textAlign: "right",
        color: "#daa77e",

    },

    day: {
        flex: 5,
        fontWeight: "bold",
        fontSize: 17,
        color: "#cdf5eb",
        paddingHorizontal: 10
    }



})


export default ForecastWeatherItem;