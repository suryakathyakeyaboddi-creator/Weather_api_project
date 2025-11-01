let api ={
    key : "a7e73f91ea6f18fedae1704f82fdbffc",
    base : "https://api.openweathermap.org/data/2.5/"
}
let search=document.querySelector(".search");
let btn=document.querySelector(".submit");
btn.addEventListener("click",getInput);
function getInput(event){
    event.preventDefault(); //not necessary 
    if(event.type === "click"){
       getData(search.value)
       console.log(search.value);
    }
}
function getData(city){
    fetch(`${api.base}weather?q=${city}&appid=${api.key}`)
    .then(response =>{
        return response.json();
    }).then(displayData);
}
function displayData(response){
    console.log(response)
    if(response.cod === "404"){
        let error = document.querySelector(".error")
        error.textContent = "Please enter valid city name";
        search.value = "";
    }else{
        let city = document.querySelector(".city")
        city.textContent = `${response.name}, ${response.sys.country}`

        let today = new Date();
        let date = document.querySelector(".date")
        date.textContent = getDates(today)

        let temp = document.querySelector(".temp")
        temp.textContent = `Temp : ${Math.round(response.main.temp)} °C`

        let weather = document.querySelector(".weather")
        weather.textContent = `${response.weather[0].main}`

        let range = document.querySelector(".temp-range")
        range.textContent = `Temp-range : ${response.main.temp_min} °C / ${response.main.temp_max} °C`

        let wIcon = document.querySelector(".icon")
        let iconurl = "https://openweathermap.org/img/wn/"
        wIcon.src = `${iconurl}${response.weather[0].icon}@2x.png`
    }
}
function getDates(d){
    let months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let day = days[d.getDay()]
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear();
    return `${day},${date},${month},${year}`
}