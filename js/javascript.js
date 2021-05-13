//mapbox api
mapboxgl.accessToken = 'pk.eyJ1IjoiZmVybHVjaTIiLCJhIjoiY2tvazkyaXptMDM5ZTJwcm1sZW1lcGxoNyJ9.fJvwUDAUZ6zpISneIJ1GgQ';
var map = new mapboxgl.Map({
    container: 'map', style: 'mapbox://styles/mapbox/streets-v11', center: [5, 52], zoom: 9});

var lat;
var long;

var searchLocation = new MapboxGeocoder({ 
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,

    getItemValue: e => {
        long = e['center'][0];
        lat = e['center'][1];
        document.getElementsByClassName('mapboxgl-ctrl-geocoder--input').value = e['place_name']; 
        return e['place_name'];
    }
});

//Weatherbit api voor herkennen weercondities(op advies van een medestudent deze gebruikt ipv de gebruikte api in de lessen)

var token = '09a75e1975e749bd9d44b0eb6d7dbf5c'; //Sleutel voor de weer api
var temp = document.getElementById('showTemp');
var weather = document.getElementById('weather');
weather.src = 'img/error.png'; // default img

document.getElementById('search').appendChild(searchLocation.onAdd(map));//zoekbalk