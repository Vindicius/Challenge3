//mapbox api
mapboxgl.accessToken = 'pk.eyJ1IjoiZmVybHVjaTIiLCJhIjoiY2tvazkyaXptMDM5ZTJwcm1sZW1lcGxoNyJ9.fJvwUDAUZ6zpISneIJ1GgQ';
var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: [5.508852, 52.142480], 
    zoom: 9 
});

var lat;
var long;

var searchLocation = new MapboxGeocoder({ 
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,

    getItemValue: e => {
        long = e['center'][0];
        lat = e['center'][1];
        document.getElementsByClassName('mapboxgl-ctrl-geocoder--input').value = e['place_name']; //lat
        return e['place_name'];
    }
});


//Weatherbit api voor herkennen weercondities(op advies van een medestudent deze gebruikt ipv de gebruikte api in de lessen)

const key = '09a75e1975e749bd9d44b0eb6d7dbf5c'; //Key voor API weather
var temp = document.getElementById('showWeatherTemp');
var weatherIcon = document.getElementById('weatherIcon');
weatherIcon.src = 'images/errorIcon.svg'; // default img