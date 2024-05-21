 
(function() {
  // CSS injection function
  function injectCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }
 
  // Tailwind CSS and Font Awesome  injection
  injectCSS('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');
  injectCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
 
  // Delayed execution of the main script
  setTimeout(function() {
    // Function to determine whether to show weather information
    function shouldShowWeather() {
      if (localStorage.getItem('showWeather') === null) {
        const show = Math.random() < 0.5; // 50% chance
        localStorage.setItem('showWeather', show);
        console.log(`Initial decision: ${show ? 'Show' : 'Do not show'} weather information.`);
      } else {
        console.log('Using stored decision for weather information visibility.');
      }
      return JSON.parse(localStorage.getItem('showWeather'));
    }
 
    // Function to fetch weather data
    function getWeather(lat, lon) {
      const appid = 'a2ef86c41a'; // Mock API key
      const url = `https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=${appid}&lat=${lat}&lon=${lon}`;
 
      console.log(`Fetching weather data from: ${url}`);
     
      return fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Weather data fetched successfully:', data);
          return data;
        })
        .catch(error => console.error('Error fetching weather data:', error));
    }
 
    // Function to display weather data
    function displayWeather(weatherData) {
      console.log('Weather data structure:', weatherData);
 
      if (weatherData && weatherData.list && weatherData.list[0]) {
        const weatherDescription = weatherData.list[0].weather[0].description;
        const temperature = weatherData.list[0].main.temp.toFixed(1); // Format temperature to 1 decimal place
        const dateTime = new Date(weatherData.list[0].dt * 1000).toLocaleString(); // Convert timestamp to date and time
 
        //  Determine background color and icon based on weather description
        let bgColor, iconClass;
        if (weatherDescription.includes('rain')) {
          bgColor = 'bg-blue-200';
          iconClass = 'fas fa-cloud-showers-heavy';
        } else if (weatherDescription.includes('cloud')) {
          bgColor = 'bg-gray-200';
          iconClass = 'fas fa-cloud';
        } else if (weatherDescription.includes('sun')) {
          bgColor = 'bg-yellow-200';
          iconClass = 'fas fa-sun';
        } else {
          bgColor = 'bg-blue-200';
          iconClass = 'fas fa-wind';
        }
 
        const weatherContainer = document.createElement('div');
        weatherContainer.id = 'weather-info';
        weatherContainer.className = `${bgColor} text-black text-opacity-80 p-4 rounded-lg m-4 flex items-center space-x-4`;
        weatherContainer.innerHTML = `
          <div class="flex-shrink-0">
            <i class="${iconClass} text-3xl"></i>
          </div>
          <div>
            <h2 class="text-lg font-semibold">Weather Forecast</h2>
            <p class="text-base"><strong>Condition:</strong> ${weatherDescription}</p>
            <p class="text-base"><strong>Temperature:</strong> ${temperature}°C</p>
            <p class="text-base"><strong>Date & Time:</strong> ${dateTime}</p>
          </div>
        `;
        document.body.prepend(weatherContainer);
        console.log('Weather information displayed on the page.');
      } else {
        console.error('Weather data is not in the expected format:', weatherData);
      }
    }
 
    // Main script
    (function() {
      const lat = 52.350509; 
      const lon = -1.744616; 
 
      console.log('Script started.');
 
      if (shouldShowWeather()) {
        console.log('User selected to see weather information.');
        getWeather(lat, lon).then(weatherData => {
          displayWeather(weatherData);
        }).catch(error => {
          console.error('Error in weather feature flow:', error);
        });
      } else {
        console.log('User selected not to see weather information.');
      }
    })();
  }, 1000); // Delay to ensure CSS is loaded
})();
