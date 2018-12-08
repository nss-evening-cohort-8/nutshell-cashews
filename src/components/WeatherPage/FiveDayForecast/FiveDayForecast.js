import $ from 'jquery';
// import createForecastCard from '../ForecastCard/forecastCard';
import weatherData from '../../../data/weatherData';
import './FiveDayForecast.scss';

// const createFiveDayForecast = (forecastArray) => {
//   let domString = '<ul class="forecast-array">';
//   forecastArray.forEach((forecast) => {
//     domString += createForecastCard(forecast);
//   });
//   domString += '</ul>';
//   return domString;
// };

const printForecast = (allWeatherDataObject) => {
  let forecastCardString = '';
  allWeatherDataObject.data.forEach((forecastCard) => {
    forecastCardString += `
    <li class="card mr-5 ml-5 forecastCard d-flex justify-content-center">
          <div class="text-center"><h4>${allWeatherDataObject.city_name}</h4></div>
          <div class="text-center"><h3>${forecastCard.temp}</h3></div>
          <div class="d-flex justify-content-center">
            <img id="forecastWeatherIcon" class="" src="https://www.weatherbit.io/static/img/icons/${forecastCard.weather.icon}.png">
          </div>
            <div class="d-inline-flex justify-content-center">
            <div class="ml-5 mr-3">
              <h4>hi: ${forecastCard.max_temp}</h4>
            </div>
            <div class="mr-5 ml-3">
              <h4>lo: ${forecastCard.min_temp}</h4>
            </div>
          </div>
          <div
        </div>
    </li>
    `;
    $('#forecast-container').html(forecastCardString);
  });
};

const getForecastLocation = (e) => {
  console.log(e);
  weatherData.getForecastWeatherData(e)
    .then((allWeatherDataObject) => {
      console.log(allWeatherDataObject);
      printForecast(allWeatherDataObject);
    })
    // console.log(result);
    // printSingleLocation(singleLocation);
    .catch((error) => {
      console.error('error in getting forecast location', error);
    });
};


export default { getForecastLocation };
