require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(cors());

app.get('/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    
    const weatherData = await weatherResponse.json();
    
    res.json({
      location: weatherData.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});