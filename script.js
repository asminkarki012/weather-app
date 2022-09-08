//importing access token from secrets.js file
import {config} from './secrets.js'

async function getRandomImage(searchItem) {
  const clientID = config.UNSPLASH_CLIENTID;
  const endpoint = `https://api.unsplash.com/photos/random?client_id=${clientID}&query=${searchItem}`;
  const response = await fetch(endpoint);
  const randomImageData = await response.json();

  return randomImageData.urls.full;
}

document.querySelector('.search button').addEventListener('click', () =>
{getWeather();}
 );
 
document.querySelector('.search-bar').addEventListener('keyup', (event) => {
  if (event.key == 'Enter') {
    getWeather();
  }
});

async function getWeather(cityName) {
  let city;
  let input = document.querySelector('.search-bar');
  if (cityName) {
    city = cityName;
  } else {
    city = input.value;
  }
  const apiKey = config.OPENWEATHER_API_KEY;
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(endpoint);
  const weatherData = await response.json();
  input.value = '';
  displayWeather(weatherData);
}

function displayWeather(data) {
  const { name } = data;
  const { description, icon } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  //get unsplash random image using query as city name
  async function getUnsplashImageURL() {
    const result = await getRandomImage(name);
    document.body.style.backgroundImage = `url(${await result})`;
  }
  getUnsplashImageURL();

  document.querySelector('.city').innerText = `Weather in ${name}`;
  document.querySelector(
    '.icon'
  ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  document.querySelector('.temp').innerText = Math.ceil(temp) + '°C';
  document.querySelector('.description').innerText = description;
  document.querySelector('.humidity').innerText = `Humidity:${humidity}%`;
  document.querySelector('.wind').innerText = `Wind Speed:${speed} km/hr`;

  document.querySelector('.weather').classList.remove('loading');
}
getWeather('Kathmandu');


