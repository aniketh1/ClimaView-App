import request from "request";
import axios from "axios";

const apiKey = {
    BASE_URL: 'https://api.openweathermap.org/data/2.5/weather?q=',
    SECRET_KEY: '18a1bdf6617fff849b9c3ff01a77c50e'
};

const weatherData = (address, callback) => {
    const url = apiKey.BASE_URL + encodeURIComponent(address) + "&APPID=" + apiKey.SECRET_KEY;
    axios.get(url)
        .then(response => {
            callback(false, response.data);
        })
        .catch(error => {
            callback(true, "unable to fetch");
        });
};

export default weatherData;
