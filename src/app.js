function formatForecastDay(timestamp) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date(timestamp * 1000).getDay()];
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecastHTML = `<div class = "row">`;

  forecastData.forEach(function (forecast, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2 forecast-col">
    <div class="forecast-day"> ${formatForecastDay(forecast.dt)}</div>
    <img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png"
         alt="weather-icon"
         width="30"/>
    <div class="forecast-temps">
      <span class="temp-max"><span class="max">${Math.round(
        forecast.temp.max
      )}</span>°</span>
      <span class="temp-min"><span class="min">${Math.round(
        forecast.temp.min
      )}</span>°</span>
    </div>
    </div>  
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  document.querySelector("#forecast").innerHTML = forecastHTML;

  maxMinTemp = response.data.daily; // global variable // for c/f conversion
}

function formatDate(timeStamp) {
  let date = new Date(timeStamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function getForecast(coords) {
  let apiKey = "521e636942417dbc233358cdf12445eb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector("#celsius").classList.add("active");
  document.querySelector("#fahrenheit").classList.remove("active");
  celsiusTemp = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let unit = "metric";
  let apiKey = "521e636942417dbc233358cdf12445eb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  search(document.querySelector("#city-input").value);
}

function convertToFahrenheit(event) {
  event.preventDefault();

  document.querySelector("#temp").innerHTML = Math.round(
    (celsiusTemp * 9) / 5 + 32
  );

  let maxTempElements = document.querySelectorAll(".max"); // returns nodelist // similar to array

  maxTempElements[0].innerHTML = Math.round(
    (maxMinTemp[0].temp.max * 9) / 5 + 32
  );
  maxTempElements[1].innerHTML = Math.round(
    (maxMinTemp[1].temp.max * 9) / 5 + 32
  );
  maxTempElements[2].innerHTML = Math.round(
    (maxMinTemp[2].temp.max * 9) / 5 + 32
  );
  maxTempElements[3].innerHTML = Math.round(
    (maxMinTemp[3].temp.max * 9) / 5 + 32
  );
  maxTempElements[4].innerHTML = Math.round(
    (maxMinTemp[4].temp.max * 9) / 5 + 32
  );
  maxTempElements[5].innerHTML = Math.round(
    (maxMinTemp[5].temp.max * 9) / 5 + 32
  );

  let minTempElements = document.querySelectorAll(".min");

  minTempElements[0].innerHTML = Math.round(
    (maxMinTemp[0].temp.min * 9) / 5 + 32
  );
  minTempElements[1].innerHTML = Math.round(
    (maxMinTemp[1].temp.min * 9) / 5 + 32
  );
  minTempElements[2].innerHTML = Math.round(
    (maxMinTemp[2].temp.min * 9) / 5 + 32
  );
  minTempElements[3].innerHTML = Math.round(
    (maxMinTemp[3].temp.min * 9) / 5 + 32
  );
  minTempElements[4].innerHTML = Math.round(
    (maxMinTemp[4].temp.min * 9) / 5 + 32
  );
  minTempElements[5].innerHTML = Math.round(
    (maxMinTemp[5].temp.min * 9) / 5 + 32
  );

  document.querySelector("#celsius").classList.remove("active");
  document.querySelector("#fahrenheit").classList.add("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);

  let maxTempElements = document.querySelectorAll(".max");

  maxTempElements[0].innerHTML = Math.round(maxMinTemp[0].temp.max);
  maxTempElements[1].innerHTML = Math.round(maxMinTemp[1].temp.max);
  maxTempElements[2].innerHTML = Math.round(maxMinTemp[2].temp.max);
  maxTempElements[3].innerHTML = Math.round(maxMinTemp[3].temp.max);
  maxTempElements[4].innerHTML = Math.round(maxMinTemp[4].temp.max);
  maxTempElements[5].innerHTML = Math.round(maxMinTemp[5].temp.max);

  let minTempElements = document.querySelectorAll(".min");

  minTempElements[0].innerHTML = Math.round(maxMinTemp[0].temp.min);
  minTempElements[1].innerHTML = Math.round(maxMinTemp[1].temp.min);
  minTempElements[2].innerHTML = Math.round(maxMinTemp[2].temp.min);
  minTempElements[3].innerHTML = Math.round(maxMinTemp[3].temp.min);
  minTempElements[4].innerHTML = Math.round(maxMinTemp[4].temp.min);
  minTempElements[5].innerHTML = Math.round(maxMinTemp[5].temp.min);

  document.querySelector("#celsius").classList.add("active");
  document.querySelector("#fahrenheit").classList.remove("active");
}

let celsiusTemp = null;
let maxMinTemp = null;

document.querySelector("#search-form").addEventListener("submit", handleSubmit);
document
  .querySelector("#fahrenheit")
  .addEventListener("click", convertToFahrenheit);
document.querySelector("#celsius").addEventListener("click", convertToCelsius);

search("Berlin");
