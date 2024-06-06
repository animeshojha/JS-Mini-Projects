const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(
  ".grant-location-container"
);
const searchForm = document.querySelector("[data-searchform]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const error = document.querySelector(".error");

let currentTab = userTab;
const your_api_key = "4b61de33a8c4f29d4268e62eec2c7632";
currentTab.classList.add("current-tab");
getFromSessionStorage();

function switchTab(clickedTab) {
  if (clickedTab !== currentTab) {
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");

    if (!searchForm.classList.contains("active")) {
      userInfoContainer.classList.remove("active");
      grantAccessContainer.classList.remove("active");
      searchForm.classList.add("active");
    } else {
      searchForm.classList.remove("active");
      userInfoContainer.classList.remove("active");
      getFromSessionStorage();
    }
  }
}

userTab.addEventListener("click", () => {
  switchTab(userTab);
});

searchTab.addEventListener("click", () => {
  switchTab(searchTab);
});

// Check if coordinates are already present in session storage
function getFromSessionStorage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");
  if (!localCoordinates) {
    grantAccessContainer.classList.add("active");
  } else {
    const coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
  }
}

async function fetchUserWeatherInfo(coordinates) {
  const { lat, lon } = coordinates;
  grantAccessContainer.classList.remove("active");
  loadingScreen.classList.add("active");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${your_api_key}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather data not available (${response.status})`);
    }
    const data = await response.json();
    loadingScreen.classList.remove("active");
    error.classList.remove("active");
    userInfoContainer.classList.add("active");

    renderWeatherInfo(data);
  } catch (err) {
    console.error("Error fetching weather info by coordinates:", err);
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    error.classList.add("active");
  }
}

function renderWeatherInfo(weatherInfo) {
  const cityName = document.querySelector("[data-cityName]");
  const countryIcon = document.querySelector("[data-countryIcon]");
  const desc = document.querySelector("[data-weatherDesc]");
  const weatherIcon = document.querySelector("[data-weatherIcon]");
  const temp = document.querySelector("[data-temp]");
  const windSpeed = document.querySelector("[data-windSpeed]");
  const humidity = document.querySelector("[data-humidity]");
  const cloudiness = document.querySelector("[data-clouds]");

  cityName.innerText = weatherInfo?.name;
  countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
  desc.innerText = weatherInfo?.weather?.[0]?.description;
  weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
  temp.innerText = `${weatherInfo?.main?.temp} °C`;
  windSpeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
  humidity.innerText = `${weatherInfo?.main?.humidity}%`;
  cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by your browser");
  }
}

function showPosition(position) {
  const userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };

  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
  fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityName = searchInput.value;
  if (cityName === "") return;
  fetchSearchWeatherInfo(cityName);
});

async function fetchSearchWeatherInfo(city) {
  loadingScreen.classList.add("active");
  userInfoContainer.classList.remove("active");
  grantAccessContainer.classList.remove("active");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${your_api_key}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather data not available (${response.status})`);
    }
    const data = await response.json();
    loadingScreen.classList.remove("active");
    error.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
  } catch (err) {
    console.error("Error fetching weather info by city:", err);
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    error.classList.add("active");
  }
}
