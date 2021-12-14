function displayTemperature(response) {
	console.log(response.data);

	let cityElement = document.querySelector("#city");
	let temperatureElement = document.querySelector("#temperature");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let descriptionElement = document.querySelector("#description");

	cityElement.innerHTML = response.data.name;
	temperatureElement.innerHTML = Math.round(response.data.main.temp);
	humidityElement.innerHTML = response.data.main.humidity;
	windElement.innerHTML = Math.round(response.data.wind.speed);
	descriptionElement.innerHTML = response.data.weather[0].description;
}

let city = "London";

let apiKey = "3ef1c4739274de1e0c3fc584c54fc2ec";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
