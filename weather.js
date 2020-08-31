document.getElementById("getWeather").onclick = ()=>{
    let city = document.getElementById("inputCityName").value;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=b18e0da3d00c926a108e6cac51829623`)
    .then(data =>{
        return data.json()
        }).then(data2 =>{
            document.getElementById("inputCityName").style.backgroundColor="teal"
           document.getElementById("info").innerHTML=`
            <ul>
            <li>City : ${data2.name}</li>
            <li>Temperature in centigrades : ${data2.main.temp} </li>
            <li>Description : ${data2.weather[0].description} </li>
            </ul>`
    })
}