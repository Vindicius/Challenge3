//mapbox api meerendeel vanuit de lessen meegenomen
mapboxgl.accessToken = 'pk.eyJ1IjoiZmVybHVjaTIiLCJhIjoiY2tvazkyaXptMDM5ZTJwcm1sZW1lcGxoNyJ9.fJvwUDAUZ6zpISneIJ1GgQ';
var map = new mapboxgl.Map({
    container: 'map', style: 'mapbox://styles/mapbox/streets-v11', center: [5, 52], zoom: 9});

var lat;
var lon;
var searchLocation = new MapboxGeocoder({ 
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    getItemValue: e => {
        lon = e['center'][0];
        lat = e['center'][1];
        document.getElementsByClassName('mapboxgl-ctrl-geocoder--input').value = e['place_name']; 
        return e['place_name'];
    }
});
document.getElementById('search').appendChild(searchLocation.onAdd(map));//zoekbalk

//Weatherbit api voor herkennen weercondities(op advies van een medestudent deze gebruikt ipv de gebruikte api in de lessen)

var token = '09a75e1975e749bd9d44b0eb6d7dbf5c'; //Token voor de weer api
var temp = document.getElementById('showTemp');
var weather = document.getElementById('weather');
var showSafety = document.getElementById('showSafety');

weather.src = 'img/error.png'// dit stond ook in de switch maar hier werkte het niet(omdat dit dan constant opnieuw de error.png eraan zou hangen wat visueel op de website te zien is)
function showWeatherCode(){
	fetch('https://api.weatherbit.io/v2.0/current?lat=' + lat + '&lon=' + lon + '&key=' + token + '&include=minutely')// dit is de geven link van de site waarmee het weer van de gekozen locatie wordt opgehaald(hier worden dan de variabelen lat en lon vanuit mapbox gehaald)
// Deze code geeft dan een response in json zoals hier te zien: https://www.weatherbit.io/api/weather-current, Daar is dan 1 data punt in genaamt "code" waar de huidige weercode voor de gegeven locatie staat
	.then(res=> res.json())

	.then(data => {
		temp.innerHTML = data['data'][0].temp + ' Celcius';//hier word de temperatuur uit de string response gehaald(voor de structuur hiervan zie de eerder gegeven site)
		var code = data['data'][0].weather.code;// content van de weer code wordt uit de string opgehaald
		switch(true){
			case code >= 200 && code <=233:
				weather.src = 'img/thunder.png';
				showSafety.innerHTML = 'Hier landen is gevaarlijk!';
			break;
			case code >= 300 && code <=522:
				weather.src = 'img/rain.png';
				showSafety.innerHTML = 'Hier landen is gevaarlijk!';
			break;
			case code >= 600 && code <=623:
				weather.src = 'img/snow.png';
				showSafety.innerHTML = 'Hier landen is mogelijk maar erg glad!';
			break;
			case code >= 700 && code <=751:
				weather.src = 'img/fog.png';
				showSafety.innerHTML = 'Hier landen is mogelijk maar er is verminderd zicht!';
			break;
			case code == 800 || code == 801:
				weather.src = 'img/sun.png';
				showSafety.innerHTML = 'Hier landen is Veilig!';
			break;
			case code >= 802 && code <=804:
				weather.src = 'img/fog.png';
				showSafety.innerHTML = 'Hier landen is mogelijk maar er is verminderd zicht!';
			break;
			default:// deze default geeft de png niet weer, daarom dit nogmaals buiten deze functie geschreven
			weather.src = 'img/error.png';
			break;
		}
	})
.catch(err => temp.innerHTML = ' - °C')
// .catch(err => showSafety.innerHTML = 'Kies een potentiële landingsplaats!') beetje vervelend omdat ik dit wilde gebruiken om te defaulten als er nog geen tekst in dit element stond maar krijg het niet werkend
}

showWeatherCode()
setInterval(showWeatherCode, 1500);//de code outut werkt niet zonder interval, ik wilde deze meer tijd geven om de api niet te belasten maar dit bleek de output tegen te houden