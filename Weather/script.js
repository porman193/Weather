const API_KEY ='ac834068f20b319c8df6c4c00f4c6d64';
options={
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
 }
 const error = (err) => {
    alert("No se puede acceder a la geolocalización");
 }

 const init = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(initPosition,error,options);
    }
    else{
        alert("No se puede usar la geolocazación");
    }
}

function initPosition(position){
    console.log(position);
    const {latitude,longitude} = position.coords;
    const URL= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=es`;
    fetch(URL)
        .then(response => response.json())
        .then(data => weatherData(data))
}

function weatherData(data){
    console.log(data);
    const weatherInfo={
        location: data.name + ","+ data.sys.country,
        temperature: data.main.temp+" °C",
        pressure: data.main.pressure+"Pa",
        humidity: data.main.humidity+" %",
        description: data.weather[0].main,
        description_2:data.weather[0].description,
        date: getDate(),
    }
    Object.keys(weatherInfo).forEach(key =>{
        document.getElementById(key).textContent = weatherInfo[key];
    });
    const IMG_URL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    document.getElementById("weatherIcon").src = IMG_URL;

    cleanUp();
}

function getDate(){
    let date = new Date();
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
}

function cleanUp() {
    let hub = document.getElementById("weatherHub");
    let load = document.getElementById("load");

    load.style.display = "none";
    hub.style.display = "flex";
}

function searchByCity(){
    let hub = document.getElementById("weatherHub");
    let load = document.getElementById("load");
    let err = document.getElementById("error");

    hub.style.display = "none";
    load.style.display = "flex";

    const city= document.getElementById("search-city")
    const URL= `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}&units=metric&lang=es`;
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            err.style.display = "none";
            weatherData(data)})
        .catch(error => {
            hub.style.display = "none";
            load.style.display = "none";
            err.style.display = "flex";
            document.getElementById("error").textContent=" Ciudad No Encontrada";
        });
    city.value = "";
    city.setAttribute("placeholder","Buscar ciudad");
}

function run(event){
    if (event.keyCode=== 13){
        searchByCity();
    }
}

