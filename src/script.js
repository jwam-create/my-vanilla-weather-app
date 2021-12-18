function displayDate(timestamp) {
	let date = new Date(timestamp);
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

function displayTemperature(response) {
	let cityElement = document.querySelector("#city");
	let temperatureElement = document.querySelector("#temperature");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let descriptionElement = document.querySelector("#description");
	let dateElement = document.querySelector("#date");
	let iconElement = document.querySelector("#icon");

	celsiusTemperature = Math.round(response.data.main.temp);

	cityElement.innerHTML = response.data.name;
	temperatureElement.innerHTML = Math.round(response.data.main.temp);
	humidityElement.innerHTML = response.data.main.humidity;
	windElement.innerHTML = Math.round(response.data.wind.speed);
	descriptionElement.innerHTML = response.data.weather[0].description;
	dateElement.innerHTML = displayDate(response.data.dt * 1000);
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
}

function search(city) {
	let apiKey = "3ef1c4739274de1e0c3fc584c54fc2ec";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

	axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#city-input");

	search(cityInputElement.value);
}

let form = document.querySelector("#search-input");
form.addEventListener("submit", handleSubmit);

function displayFarenheit(event) {
	event.preventDefault();

	let farenheitTemperature = Math.round(celsiusTemperature * (9 / 5) + 32);
	temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = farenheitTemperature;
	celsiusLink.classList.remove("active");
	farenheitLink.classList.add("active");
}

function displayCelsius(event) {
	event.preventDefault();

	temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = celsiusTemperature;
	farenheitLink.classList.remove("active");
	celsiusLink.classList.add("active");
}

let celsiusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

search("Paris");
