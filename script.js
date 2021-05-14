
const spinner = document.querySelector('.spinner');
let center = document.querySelector('center') ; 
const dataContainer = document.getElementById('data')
function returnURL(location){
  return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=08472e9ee3e7baf68dd18b56d0c9ad2b`
} ;
let isFetching = false; 
async function fetchPlace(location){ 
  let url = returnURL(location)  ; 
  let response = await fetch(url) ; 
  let data = await response.json() ; 
  
  isFetching = false ; 
  console.log(data) ; 
  if(data.cod === 200){
    console.log('Success!') ;
     getAndSetData(data)
  }
  else {
    console.log('Failure')
    getAndSetData(false) ; 
  }
 
}
const form = document.getElementById('form') ; 
const input = document.querySelector('input') ; 
form.onsubmit = (e) => {
  e.preventDefault(); 
  isFetching = true ; 
  fetchPlace(input.value) ; 
} ; 

setInterval(() => {
  if(isFetching){
    document.querySelector('.loader').style.display = 'block' ; 
    input.setAttribute('disabled' , 'disabled')
  }
  else {
    document.querySelector('.loader').style.display = 'none' ; 
    input.removeAttribute('disabled') ; 
  }
})

function getAndSetData(data) {
  if(typeof data === 'object'){
    let {lat , lon} = data.coord ; 
    console.log(lat , lon) ; 
    let icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` ; 
    let {temp , temp_max , temp_min , feels_like} = data.main ; 
    dataContainer.innerHTML = `
    <h1>Co-ordinates</h1>
    <h2>Latitude:${lat}&#176;</h2>
    <h2>Longitude:${lon}&#176;</h2>
    <h1>Weather</h1>
    <img src = "${icon}"/>
    <h2>Weather:${(data.weather[0].description).toUpperCase()}</h2>
    <h1>Temperature</h1>
    <h2>Temperature:${Math.floor(temp - 273.15)}&#176;C</h2>
    <h2>Feels Like ${Math.floor(feels_like - 273.15)}&#176;C</h2>
    <h2>Max Temperature:${Math.floor(temp_max - 273.15)}&#176;C</h2>
    <h2>Min Temperature:${Math.floor(temp_min - 273.15)}&#176;C</h2>

        `
        SetBackground(temp - 273.15)
    //
  } 
  else {
    dataContainer.innerHTML = `
    <h1>404!</h1>
    <h2>We couldnt find the place you were searching for.</h2>
    `
  }
}

function SetBackground(temp) {
  if(temp <= 22){
    document.body.style.backgroundColor = 'rgb(0, 3, 151)'
  }
  else if(temp > 22 && temp <=30){
    document.body.style.backgroundColor = 'rgb(0, 110, 255)'
  }
  else {
    document.body.style.backgroundColor = "rgb(235, 147, 6)" ; 
  }
}
/**
 * Cooolllddd :- 
 * Moderate :- 
 * Hot :- 
 */
