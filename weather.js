
const btn = document.querySelector(".btn");
const api = {
    key: '09d233710c42233fa60fc9c8b5ba11e0',
    base: 'https://api.openweathermap.org/data/2.5/'
}
const search = document.querySelector(".search");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const date = document.querySelector(".date");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const weekday = ["Sunday", "Monay", "Tuesday", "Wednesday", "Thursday", "Friday"]
const body = document.body;
let dateObj = new Date;
setInterval(() => {
// CREATING THE DIGITAL CLOCK
function time() {
    let dateObj = new Date;
   let hour = dateObj.getHours()
    let minute = dateObj.getMinutes()
    if (minute < 10) {
       minutes.textContent = `0${minute}`  
    } else {
        minutes.textContent = `${minute}` 
    }
    hours.textContent = `${hour}` 
    }
    time();

// CREATING THE DATE
let month = months[dateObj.getMonth()]
let day = dateObj.getDate()
let days = weekday[dateObj.getDay()]
date.innerHTML = `${days}, ${day} ${month}`
    
if (dateObj.getHours() <= 18) {
    body.style.backgroundImage = `url("img/pic2.jpeg")`
    document.querySelector(".footer").style.color = 'black'
    document.querySelector(".time").style.color = 'black'
    document.querySelector(".weather").style.color = 'black'
}
}, 500);

// ADDING A WEATHER API
// ADDING EVENT LISTENER TO MY BUTTON
btn.addEventListener("click", () => {
    if (search.value === "") {
        alert("Please Enter a City")
    }
    else {
        getData()
    }
})

function getData() {
    fetch(`${api.base}weather?q=${search.value}&
    units=metric&appid=${api.key}`)
        .then(response => {
            return response.json();
        }).then(displayData);
    
    
}

function displayData(response) {
    if (response.cod === '404') {
        alert("City does not exist. please enter a valid city")
        search.value = "";
    }
    else {
        const city = document.querySelector(".location");
        city.innerText = `${response.name}, ${response.sys.country}`;

        let degree = (Math.round(response.main.temp - 273.15))
        const temp = document.querySelector(".weather-degree");
        temp.innerHTML = `${degree}°C`  
        
        const condition = document.querySelector(".weather-con");
        condition.innerText = `${response.weather[0].main}`

        let minDegree = (Math.round(response.main.temp_min - 273.15))
        let maxDegree = (Math.round(response.main.temp_max - 273.15))
        const range = document.querySelector(".temp-range");
        range.innerHTML = `${minDegree}°C/ ${maxDegree}°C`;

        const clouds = document.querySelector(".cloud");
        const cloudURL = "http://openweathermap.org/img/w/"
        clouds.src = cloudURL + response.weather[0].icon + ".png"; 
        
        search.value = "";
    }
    }
