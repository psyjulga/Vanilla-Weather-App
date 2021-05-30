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

function displayTemp(response) {
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
}

function search(city) {
  let unit = "metric";
  let apiKey = "521e636942417dbc233358cdf12445eb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayTemp);
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
  document.querySelector("#celsius").classList.remove("active");
  document.querySelector("#fahrenheit").classList.add("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#celsius").classList.add("active");
  document.querySelector("#fahrenheit").classList.remove("active");
}

let celsiusTemp = null;

document.querySelector("#search-form").addEventListener("submit", handleSubmit);
document
  .querySelector("#fahrenheit")
  .addEventListener("click", convertToFahrenheit);
document.querySelector("#celsius").addEventListener("click", convertToCelsius);

search("Berlin");
