document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`http://localhost:3000/weather?lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          
          document.getElementById('location').textContent = data.location;
          document.getElementById('temperature').textContent = `${Math.round(data.temperature)}°C`;
          document.getElementById('description').textContent = data.description;
        } catch (error) {
          document.getElementById('location').textContent = 'Error fetching weather data';
        }
      }, (error) => {
        document.getElementById('location').textContent = 'Unable to get location';
      });
    }
  });