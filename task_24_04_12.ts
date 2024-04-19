import axios from 'axios';

interface WeatherResponse {
    location: {
        name: string;
        region: string;
        country: string;
    };
    current: {
        tempC: number;
        condition: {
            text: string;
            icon: string;
        };
    };
}

interface WeekDayWeather {
    date: string;
    weekDay: string;
    minTempC: number;
    maxTempC: number;
    condition: string;
}

const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let countryName: string;

rl.question(`What's your country? > `, (country: string) => {
    countryName = country;
    rl.close();
    fetchData()
});



async function fetchData(): Promise<void> {
    const API_URL: string = `http://api.weatherapi.com/v1/forecast.json?key=65732c03ccf442d2be4180019241204&q=${countryName}&days=7`
    const DAY_NAME_OF_WEEK_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const RESPONSE = await axios.get(API_URL);
    const MY_WEATHER: WeatherResponse = {
        location: {
            name: RESPONSE.data.location.name,
            region: RESPONSE.data.location.region,
            country: RESPONSE.data.location.country
        },
        current: {
            tempC: RESPONSE.data.current.temp_c,
            condition: {
                text: RESPONSE.data.current.condition.text,
                icon: RESPONSE.data.current.condition.icon
            }
        }
    }

    let myWeatherDays: Array<WeekDayWeather> = []

    for (let i = 0; i < 7; i++) {
        let date: Date = new Date(RESPONSE.data.forecast.forecastday[i].date)

        const WEATHER_DAY: WeekDayWeather = {
            date: RESPONSE.data.forecast.forecastday[i].date,
            weekDay: DAY_NAME_OF_WEEK_SHORT[date.getDay()],
            minTempC: RESPONSE.data.forecast.forecastday[i].day.mintemp_c,
            maxTempC: RESPONSE.data.forecast.forecastday[i].day.maxtemp_c,
            condition: RESPONSE.data.forecast.forecastday[i].day.condition.text
        }
        myWeatherDays.push(WEATHER_DAY)
    }

    let date = new Date()

    console.log(`${MY_WEATHER.location.name}, ${MY_WEATHER.location.region}, ${MY_WEATHER.location.country}`);
    console.log(`Current temperature is ${MY_WEATHER.current.tempC}\u00B0C`);
    console.log(`Current weather condition is > ${MY_WEATHER.current.condition.text}`);
    console.log();
    console.log(`There are given the weather forecast from ${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()} to ${new Date(new Date().setDate(new Date().getDate() + 7)).getDate()} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`);
    console.log();



    for (let _ = 0; _ < 12; _++) {
        process.stdout.write(" ");
    }


    for (let d of myWeatherDays) {
        process.stdout.write(d.weekDay);
        for (let _ = 0; _ < 9 - d.weekDay.length; _++) {
            process.stdout.write(" ");
        }
    }
    console.log();


    {
        process.stdout.write("Min temp");
        for (let _ = 0; _ < 4; _++) {
            process.stdout.write(" ");
        }
    }

    for (let d of myWeatherDays) {
        process.stdout.write(String(d.minTempC));
        for (let _ = 0; _ < 9 - String(d.minTempC).length; _++) {
            process.stdout.write(" ");
        }
    }
    console.log();


    {
        process.stdout.write("Max temp");
        for (let _ = 0; _ < 4; _++) {
            process.stdout.write(" ");
        }
    }

    for (let d of myWeatherDays) {
        process.stdout.write(String(d.maxTempC));
        for (let _ = 0; _ < 9 - String(d.maxTempC).length; _++) {
            process.stdout.write(" ");
        }
    }
    console.log();

}