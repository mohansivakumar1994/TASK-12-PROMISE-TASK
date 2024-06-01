function fetchWeather(latitude, longitude, cityName) {
 const weatherDiv = document.getElementById(`${cityName.replace(/ /g, '')}Weather`);

 // Fetch data from OpenWeatherMap API
 fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8f2d8f43ddca35b0b520e5e5e06c4510&units=metric`)
     .then(response => response.json())
     .then(data => {
         // Update the weatherDiv with weather information
         weatherDiv.innerHTML = `
         <p id="dsply">Temperature: ${data.main.temp}°C</p>
         <p id="dsply">Weather: ${data.weather[0].main}</p>
         `;
     })
     .catch(error => console.error('Error fetching weather data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
 const cardsRow = document.getElementById('cardsRow');

 // Fetch data from restcountries API
 fetch('https://restcountries.com/v3.1/all')
     .then(response => response.json())
     .then(countries => {
         // Create card for each country
         countries.forEach(country => {
             const { name, capital, region, flags, latlng, cca2 } = country;
             const card = createCard(name.common, capital[0], region, flags.svg, latlng, cca2);
             cardsRow.appendChild(card);
         });
     })
     .catch(error => console.error('Error fetching country data:', error));

     function createCard(name, capital, region, flag, latlng, countrycode) {
     const cardCol = document.createElement('div');
     cardCol.className = 'col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-4';
 
     const card = document.createElement('div');
     card.className = 'card h-100';
 
     const cardHeader = document.createElement('div');
     cardHeader.className = 'card-header';
     cardHeader.textContent = name;
 
     const cardBody = document.createElement('div');
     cardBody.className = 'card-body';
     cardBody.id="crdbdy";
 
     const cardText = document.createElement('div');
     cardText.className = 'card-text';
     cardText.innerHTML = `
         <p>Capital: ${capital}</p>
         <p>Region: ${region}</p>
         <p>Country Code: ${countrycode}</p>
     `;
 
     const flagImg = document.createElement('img');
     flagImg.src = flag;
     flagImg.alt = name;
     flagImg.className = 'card-img-top'; 
 
     const weatherButton = document.createElement('button');
     weatherButton.className = 'btn btn-primary';
     weatherButton.textContent = 'Click for Weather';
     weatherButton.onclick = function() {
         fetchWeather(latlng[0], latlng[1], name);
     };
 
     const weatherDiv = document.createElement('div');
     weatherDiv.id = `${name.replace(/ /g, '')}Weather`;
 
     cardBody.appendChild(cardText);
     cardBody.appendChild(flagImg);
     cardBody.appendChild(weatherButton);
     cardBody.appendChild(weatherDiv);
 
     card.appendChild(cardHeader);
     card.appendChild(cardBody);
 
     cardCol.appendChild(card);
 
     return cardCol;
 }
 
});