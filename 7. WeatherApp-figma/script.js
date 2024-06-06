console.log("hello animesh");
const API = "4b61de33a8c4f29d4268e62eec2c7632";
async function fetchWeatherDetail() {
  // let latitude=15.3333;
  // let longitude=74.0833;
  try {
    let city = "goa";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`
    );
    const data = await response.json();
    console.log("weather data:->", data);
  } catch (err) {
    console.log(err);
  }
}

async function get(){
    try{
        let latitude=15.6333;
        let longitude=18.3333;
        let result= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API}&units=metric`);
        let ans=await result.json();
        console.log(ans);
    }
    catch(err){
        console.log("code fat gya",err);
    }
   
}
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("nhi de rha location");
    }
}
function showPosition(position){
    let lat=position.coords.latitude;
    let longi=position.coords.longitude;
    console.log(lat);
    console.log(longi);
}