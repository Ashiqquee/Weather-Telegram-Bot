const express = require('express');
const telegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('dotenv').config();


const app = express();

app.get('/', (req, res) => {
    res.send('Weather App Created By Ashiqquee')
})


const token = process.env.TELEGRAM_TOKEN;

const bot = new telegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userInput = msg.text;

    try {

        if (msg.text == "/start") {
            bot.sendMessage(chatId, "Welcome To Weather Checking Bot Created By Ashiqquee");
        } else {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=0fbad7d5ac8fec3c6e0d2ca74f32a557`
            );
            const data = response.data;
            const weather = data.weather[0].description;
            const temperature = data.main.temp - 273.15;
            const city = data.name;
            const humidity = data.main.humidity;
            const pressure = data.main.pressure;
            const windSpeed = data.wind.speed;
            const message = `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}°C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;

            bot.sendMessage(chatId, message);
        }
    } catch (error) {
        bot.sendMessage(chatId, "City doesn't exist.");
    }

    // bot.sendMessage(chatId,"Welcome To Weather Checking Bot Created By Ashiqquee");
})

app.listen(4000)