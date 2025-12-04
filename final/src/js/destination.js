import { getAPI, getJson, planetSchema } from './dataServices';
import { renderDestination, renderSlider } from './display';
import renderHeaderFooter from './headerfooter';
import { getParam } from './utils';

renderHeaderFooter();
await getDestination();

async function getDestination() {
  let name = getParam('name');
  let sliderName = '';
  
  console.log('Destination name from URL:', name);
  
  if (name) {
    sliderName = `slider-${name}`;
    renderSlider(sliderName);
    
    try {
      console.log('Fetching planet data...');
      
      // Get planet data from API
      let planetData = await getAPI(`/planets/?search=${name}`, planetSchema);
      console.log('Raw planet data:', planetData);
      
      let planetDescription = await getJson(name);
      console.log('Planet description:', planetDescription);

      // If planetData is an array, take the first item
      let planet = Array.isArray(planetData) ? planetData[0] : planetData;
      console.log('Processed planet data:', planet);

      // Update the HTML directly
      updateDestinationInfo(planet, planetDescription);
      
    } catch (error) {
      console.error('Error loading destination:', error);
      // Show sample data for testing
      showSampleData();
    }
  } else {
    sliderName = 'slider-home';
    renderSlider(sliderName);
    showHomeState();
  }
}

// Function to update HTML with destination information
function updateDestinationInfo(planetData, description) {
  console.log('Updating destination info with:', planetData);
  
  // Update main destination name
  const planetNameElement = document.getElementById('planet-name');
  if (planetNameElement) {
    planetNameElement.textContent = planetData.name || 'Unknown Destination';
  }

  // Update climate information
  const climateElement = document.getElementById('climate');
  if (climateElement) {
    climateElement.textContent = planetData.climate || 'Climate data not available';
    console.log('Climate set to:', planetData.climate);
  }

  // Update terrain information
  const terrainElement = document.getElementById('terrain');
  if (terrainElement) {
    terrainElement.textContent = planetData.terrain || 'Terrain data not available';
    console.log('Terrain set to:', planetData.terrain);
  }

  // Update population information
  const populationElement = document.getElementById('population');
  if (populationElement) {
    if (planetData.population && planetData.population !== 'unknown') {
      populationElement.textContent = formatPopulation(planetData.population);
    } else {
      populationElement.textContent = 'Population data not available';
    }
    console.log('Population set to:', planetData.population);
  }

  // Update description
  const descriptionElement = document.getElementById('destination-description');
  if (descriptionElement) {
    descriptionElement.textContent = description || 'No description available for this destination.';
  }

  // Update page title
  if (planetData.name) {
    document.title = `${planetData.name} | Nicaragua Adventure`;
  }
}

// Helper function to format population numbers
function formatPopulation(population) {
  if (!population || population === 'unknown') return 'Unknown';
  
  const popNumber = parseInt(population);
  if (isNaN(popNumber)) return population;
  
  if (popNumber >= 1000000) {
    return (popNumber / 1000000).toFixed(1) + ' million';
  } else if (popNumber >= 1000) {
    return (popNumber / 1000).toFixed(1) + ' thousand';
  }
  
  return popNumber.toLocaleString();
}

// Function to show sample data for testing
function showSampleData() {
  console.log('Showing sample data for testing');
  
  const planetNameElement = document.getElementById('planet-name');
  const climateElement = document.getElementById('climate');
  const terrainElement = document.getElementById('terrain');
  const populationElement = document.getElementById('population');
  const descriptionElement = document.getElementById('destination-description');

  if (planetNameElement) planetNameElement.textContent = 'Sample Destination';
  if (climateElement) climateElement.textContent = 'Tropical';
  if (terrainElement) terrainElement.textContent = 'Mountains and Beaches';
  if (populationElement) populationElement.textContent = '6.5 million';
  if (descriptionElement) descriptionElement.textContent = 'This is a sample description for testing purposes.';
}

// Function to show home state (when no specific destination is selected)
function showHomeState() {
  const planetNameElement = document.getElementById('planet-name');
  const climateElement = document.getElementById('climate');
  const terrainElement = document.getElementById('terrain');
  const populationElement = document.getElementById('population');
  const descriptionElement = document.getElementById('destination-description');

  if (planetNameElement) planetNameElement.textContent = 'Nicaragua Adventures';
  if (climateElement) climateElement.textContent = 'Select a destination';
  if (terrainElement) terrainElement.textContent = 'Select a destination';
  if (populationElement) populationElement.textContent = 'Select a destination';
  if (descriptionElement) {
    descriptionElement.textContent = 'Explore the beautiful destinations of Nicaragua. Select a destination from our slider to learn more about its climate, terrain, and local population.';
  }
}

// Debug: Check if elements exist on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded - checking elements:');
  console.log('Planet name element:', document.getElementById('planet-name'));
  console.log('Climate element:', document.getElementById('climate'));
  console.log('Terrain element:', document.getElementById('terrain'));
  console.log('Population element:', document.getElementById('population'));
  console.log('Description element:', document.getElementById('destination-description'));
});