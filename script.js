"use strict";

const api_key = '0GKdzqk7Gl5x0GQeL5PnJhvAQC6awCIC';

document.getElementById('root').style.display = 'none';

const city_key = (city_name)=>{
	fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${api_key}&q=${city_name}`).then((response)=>{
		return response.json();
	}).then((data)=>{
		display_city_name(data[0].LocalizedName, data[0].Country.LocalizedName)
		weather_condition(data[0].Key);
		return data[0].Key;
	}).catch((error)=>{
		console.log('city key error has occured', error)
		display_error();
	});
}

const weather_condition = (city_key)=>{
	fetch(`https://dataservice.accuweather.com/currentconditions/v1/${city_key}?apikey=${api_key}`).then((response)=>{
		return response.json()
	}).then((data)=>{
		display_values(data[0].WeatherText, data[0].Temperature.Metric.Value + '&deg;C')
	}).catch((error)=>{
		console.log('weather condition error has occured', error)
	});
}

document.getElementById('button-addon2').addEventListener('click', ()=>{
	city_key(document.getElementById('user-input').value);
})
document.getElementById('user-input').addEventListener('keydown', (e)=>{
	if(e.keyCode === 13){
		city_key(document.getElementById('user-input').value);	
		document.getElementById('user-input').value = '';
	}
})
const display_city_name = (city, country)=>{
	document.getElementById('city').innerHTML = `${city.toUpperCase()}, ${country.toUpperCase()}`
}
const display_values = (weather, temperature)=>{
	document.getElementById('root').style.display = 'block'
	document.getElementById('condition').innerHTML = weather;
	document.getElementById('temperature').innerHTML = temperature;
}
const display_error = ()=>{
	document.getElementById('city').innerHTML = 'Please check the name';
}
