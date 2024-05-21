Weather Feature
Overview
To enhance the user experience on the National Trust property information pages, I have implemented a feature that displays current weather information. This feature is designed to increase the likelihood of visitors planning their trips based on favorable weather conditions.

Key Features:
Random Display (A/B Testing): To assess the impact of this feature, I implemented logic to show the weather information to a random subset of users. This helps in measuring the effectiveness of this enhancement.

Real-Time Weather Data: I fetch real-time weather data using a reliable weather API and display it prominently on the property pages.
User-Friendly Design: The weather information is styled using modern web design practices to ensure it is visually appealing and easily readable. I used a combination of Tailwind CSS for styling and Font Awesome icons to represent different weather conditions.

Enhanced Details: Along with the weather conditions, I display the current temperature and the date and time of the forecast to provide users with detailed and relevant information.
This approach allows me to test the feature’s impact on user engagement without making significant changes to the existing website structure.

Implementation Details
A/B Testing: I used localStorage to store a flag that determines whether a user should see the weather information. This flag is set randomly the first time a user visits the page and is stored for subsequent visits.

Weather Data Fetching: I used the provided mock weather API to fetch weather data based on the geographical coordinates of the property. The data is then processed and displayed on the page.
Styling and Icons: I incorporated Tailwind CSS for a clean and modern design, and Font Awesome icons to visually represent different weather conditions such as sunny, rainy, and cloudy.
