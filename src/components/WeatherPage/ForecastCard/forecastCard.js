import './forecastCard.scss';

const createForecastCard = (forecast) => {
  const domString = `
    <li class="forecast-team-${forecast.team.toLowerCase()} ${forecast.subsitute ? 'forecast-card-subsitute' : ''}">
      <div class="img-holder">
        <img class="forecast-img" src="${forecast.picture}">
      </div>
      <h3 class="forecast-name">${forecast.name}</h3>
      <h5 class="forecast-position-${forecast.position.toLowerCase()}">${forecast.position}</h5>
    </li>
  `;

  return domString;
};

export default createForecastCard;
