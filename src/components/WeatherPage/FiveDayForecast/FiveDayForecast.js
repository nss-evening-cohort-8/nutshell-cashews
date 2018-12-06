import createForecastCard from '../ForecastCard/forecastCard';

import './FiveDayForecast.scss';

const createFiveDayForecast = (forecastArray) => {
  let domString = '<ul class="forecast-array">';
  forecastArray.forEach((forecast) => {
    domString += createForecastCard(forecast);
  });
  domString += '</ul>';
  return domString;
};

export default createFiveDayForecast;
