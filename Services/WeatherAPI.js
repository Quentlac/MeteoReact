
const TOKEN = "62d6e1c38a90560f9e9dd9c5369e0ccbb6def272b69d2b5ea80574b5937b9d87";

export function getWeatherForecastByCity(insee){

    const url = "https://api.meteo-concept.com/api/forecast/daily?token=" + TOKEN + "&insee=" + insee;

    return fetch(url).then((data) => data.json());

}

export function getCurrentWeatherByCity(insee){
    const url = "https://api.meteo-concept.com/api/observations/around?token=" + TOKEN + "&insee=" + insee;

    return fetch(url).then((data) => data.json());
}