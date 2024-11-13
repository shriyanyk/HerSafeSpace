// Initialize the map
var map = L.map('map').setView([40.73061, -73.935242], 12); // Example: New York

// Add OpenStreetMap tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Mock data with only unsafe and caution locations
var locations = [
  { lat: 40.752776, lon: -73.977946, safety: 'Caution' },  // Yellow
  { lat: 40.712776, lon: -74.005974, safety: 'Unsafe' },  // Red
  { lat: 40.748817, lon: -73.985428, safety: 'Unsafe' }  // Red
];

// Function to get circle colors for different safety levels
function getCircleColor(safety) {
  if (safety === 'Caution') {
    return 'yellow';
  } else if (safety === 'Unsafe') {
    return 'red';
  }
  return '';
}

// Function to add dynamic size to circular markers based on zoom level
function addDynamicMarker(location) {
  // Create a circle marker with default size
  var marker = L.circleMarker([location.lat, location.lon], {
    color: getCircleColor(location.safety), // Set color based on safety
    fillColor: getCircleColor(location.safety),
    fillOpacity: 0.6,
    radius: 12 // Default size, will be updated based on zoom level
  }).addTo(map);

  // Add popup to marker
  marker.bindPopup(`<b>Location:</b> (${location.lat}, ${location.lon})<br><b>Safety Status:</b> ${location.safety}`);
  
  // Update the marker size dynamically based on the zoom level
  map.on('zoom', function () {
    var zoomLevel = map.getZoom();
    var newRadius = 12 + zoomLevel * 2; // Increase size with zoom level
    marker.setRadius(newRadius); // Dynamically change the size of the circle
  });
}

// Add the safety markers to the map
locations.forEach(function(location) {
  addDynamicMarker(location);
});
