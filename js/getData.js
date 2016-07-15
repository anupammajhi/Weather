function setCookie(cname,cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (86400 * 30 * 12 * 10));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var GLB_place = getCookie("Weather_Anupam_Place").replace("+"," ");
var GLB_remember = getCookie("Weather_Anupam_Remember");
var GLB_unit = getCookie("Weather_Anupam_Unit");

$(document).ready(function(){
  
  if(GLB_unit == "c"){
    document.getElementById("unitBtn").getElementsByTagName("input")[0].classList.add("btnGreen");
    document.getElementById("unitBtn").getElementsByTagName("input")[1].classList.remove("btnGreen");
  }
  else if(GLB_unit == "f"){
    document.getElementById("unitBtn").getElementsByTagName("input")[0].classList.remove("btnGreen");
    document.getElementById("unitBtn").getElementsByTagName("input")[1].classList.add("btnGreen");
  }
    
  if(GLB_remember == "Yes"){
    document.getElementById("remBtn").getElementsByTagName("input")[0].classList.add("btnGreen");
    document.getElementById("remBtn").getElementsByTagName("input")[1].classList.remove("btnRed");
    if(getCookie("Weather_Anupam_Unit") != "Not Set"){
      getWeather( GLB_place,GLB_unit);
    }
    document.getElementById("SettLoc").getElementsByTagName("h6")[0].innerHTML = GLB_place;
  }
  else if(GLB_remember == "No"){
    document.getElementById("remBtn").getElementsByTagName("input")[0].classList.remove("btnGreen");
    document.getElementById("remBtn").getElementsByTagName("input")[1].classList.add("btnRed");
    document.getElementById("SettLoc").getElementsByTagName("h6")[0].innerHTML = "Not Set";
    if(navigator.geolocation){
    //MAIN STUFF
    var geosuccess = function(position){
      var curpos = position;
      var curlat = curpos.coords.latitude;
      var curlong = curpos.coords.longitude;
      
      var locXHttp = new XMLHttpRequest;
      
      locXHttp.onreadystatechange = function(){
        if(locXHttp.readyState == 4 && locXHttp.status == 200){
          var locDataJSON = JSON.parse(locXHttp.responseText);
          var CoordLoc;
          if(locDataJSON.results.length <= 0)
          {
            console.log("No Location Data from Google");
            document.getElementById("loading").style.display = "none";
            document.getElementById("bodySearchBox").style.display = "";
          } 
          else if(locDataJSON.results.length == 1)
          {
            CoordLoc = locDataJSON.results.formatted_address;
           
          }
           else if(locDataJSON.results.length <= 3)
          {
            CoordLoc = locDataJSON.results[0].formatted_address;
           
          }
          else{
            var CoordLocIndex = locDataJSON.results.length - 4;
            CoordLoc = locDataJSON.results[CoordLocIndex].formatted_address;
        
          }
          
          console.log("Detected : "+CoordLoc);
          getWeather( CoordLoc,GLB_unit);
          
          if(GLB_remember == "Yes"){
              setCookie("Weather_Anupam_Place",CoordLoc);
              document.getElementById("SettLoc").getElementsByTagName("h6")[0].innerHTML = CoordLoc;
          }
        }
      }
      
      locURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+curlat+","+curlong+"&key=AIzaSyCGGlPWFSqAlIdUH_MiVLeGHFCSYD548WQ";
      locXHttp.open("GET",locURL,"true");
      locXHttp.send();
      
    }
    
    var geoerror = function(){
      //GEO ERROR
      console.log('GEO Error occurred.');
      document.getElementById("loading").style.display = "none";
      document.getElementById("bodySearchBox").style.display = "";
    }
    
    navigator.geolocation.getCurrentPosition(geosuccess,geoerror,{timeout:10000});
    
  }
  else{
        //Geolocation Not Supported
        console.log('Could not detect Location : GeoLocation Off');
        document.getElementById("loading").style.display = "none";
        document.getElementById("bodySearchBox").style.display = "";
    }
  }
    
  
  
  

  
});


$("#bodySearchForm").submit(function(event){
            event.preventDefault();
            document.getElementById("loading").style.display = "";
            document.getElementById("mainContent").style.display = "none";
            document.getElementById("bodySearchBox").style.display = "none";
            
            var subPlace = $("#bodySearchInput").val();
            
            getWeather(subPlace,GLB_unit);
            
            setTimeout(function(){
              GLB_place = $("#location h4").text() + "," + $("#location h6").text();
              console.log(GLB_place);
              document.getElementById("SettLoc").getElementsByTagName("h6")[0].innerHTML = GLB_place;
              document.getElementById("bodySearchInput").value = GLB_place;
              setCookie("Weather_Anupam_Place",GLB_place);
              $("#bodySearchSugg ul").children().remove();
            },1000);
            
            
});

$("#unitBtn input:first-child").click(function(){
    setCookie("Weather_Anupam_Unit","c");
    GLB_unit = "c";
    document.getElementById("unitBtn").getElementsByTagName("input")[0].classList.add("btnGreen");
    document.getElementById("unitBtn").getElementsByTagName("input")[1].classList.remove("btnGreen");
    getWeather(GLB_place,GLB_unit);
});

$("#unitBtn input:last-child").click(function(){
    setCookie("Weather_Anupam_Unit","f");
    GLB_unit = "f";
    document.getElementById("unitBtn").getElementsByTagName("input")[0].classList.remove("btnGreen");
    document.getElementById("unitBtn").getElementsByTagName("input")[1].classList.add("btnGreen");
    getWeather(GLB_place,GLB_unit);
});

$("#remBtn input:first-child").click(function(){
    setCookie("Weather_Anupam_Remember","Yes");
    GLB_remember = "Yes";
    document.getElementById("remBtn").getElementsByTagName("input")[0].classList.add("btnGreen");
    document.getElementById("remBtn").getElementsByTagName("input")[1].classList.remove("btnRed");
});

$("#remBtn input:last-child").click(function(){
    setCookie("Weather_Anupam_Remember","No");
    GLB_remember = "No";
    document.getElementById("remBtn").getElementsByTagName("input")[0].classList.remove("btnGreen");
    document.getElementById("remBtn").getElementsByTagName("input")[1].classList.add("btnRed");
});


$("#bodySearchInput").focus(function(){
  
var SearchTimer = setInterval(function(e){
    
    if(($("#bodySearchInput").val().trim()) != searchKey ){
    searchKey= $("#bodySearchInput").val().trim();
      console.log("SearchKey : "+searchKey);
    getPlaces(searchKey);  
        
    }
    else{
      console.log("Stop Searching")
    }
},300);
  
  //When out of Search box : STOP timer
  
  $("#bodySearchInput").blur(function(){
    clearInterval(SearchTimer);
  })
  
})


function getPlaces(searchPlace){
  //document.getElementById("mainContent").style.display = "none";
  console.log("gP "+searchPlace);
  var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(6)%20where%20text%3D%22" + searchPlace +"%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
  
  gPxHttp = new XMLHttpRequest();
  gPxHttp.onreadystatechange = function(){
    if(gPxHttp.readyState == 4 && gPxHttp.status == 200){
      var queryObj = JSON.parse(gPxHttp.responseText);
      var gpCount = queryObj.query.count;
      if(searchPlace == searchKey){
        $("#bodySearchSugg ul").children().remove();
        console.log("Remove @ default AND SearchPlace : "+searchPlace);
      }
      
      if(gpCount == 0){

        console.log("ZERO");
      }
      else if(gpCount == 1){
          
          if(searchPlace == searchKey && queryObj.query.results.channel.item.title != "City not found"){
            
            gpCity = queryObj.query.results.channel.location.city;
              if(gpCity=="" || gpCity=='undefined' || gpCity == null){
                gpCity = "";
              }
              else{
                gpCity = gpCity
              }
            gpRegion = queryObj.query.results.channel.location.region;
              if(gpRegion=="" || gpRegion=='undefined' || gpRegion == null){
                gpRegion = "";
              }
              else{
                gpRegion = ","+gpRegion;
              }
            gpCountry = queryObj.query.results.channel.location.country;
              if(gpCountry=="" || gpCountry=='undefined' || gpCountry == null){
                gpCountry = "";
              }
              else{
                gpCountry = ","+gpCountry;
              }
            gpLocation = gpCity + gpRegion + gpCountry;
            
            var appendLi = "<li id='"+gpLocation+"'>"+gpLocation+"</li>"
            
            $("#bodySearchSugg ul").append(appendLi);
            console.log(gpLocation + "|| only 1");
            
          }
          
      }
      else if(gpCount > 1){
        for(var i=0;i<gpCount;i++){
          if(searchPlace == searchKey && queryObj.query.results.channel[i].item.title != "City not found"){
              gpCity = queryObj.query.results.channel[i].location.city;
                if(gpCity=="" || gpCity=='undefined' || gpCity == null){
                  gpCity = "";
                }
                else{
                  gpCity = gpCity
                }
              gpRegion = queryObj.query.results.channel[i].location.region;
                if(gpRegion=="" || gpRegion=='undefined' || gpRegion == null){
                  gpRegion = "";
                }
                else{
                  gpRegion = ","+gpRegion;
                }
              gpCountry = queryObj.query.results.channel[i].location.country;
                if(gpCountry=="" || gpCountry=='undefined' || gpCountry == null){
                  gpCountry = "";
                }
                else{
                  gpCountry = ","+gpCountry;
                }
              var gpLocation = gpCity + gpRegion + gpCountry;
              var locationId = "#"+gpLocation.replace(',',"").replace(',',"");
              var appendLi = "<li id='"+locationId+i+"'>"+gpLocation+"</li>"
              console.log(gpLocation + "|| " + i)
              $("#bodySearchSugg ul").append(appendLi);
          }
          
        }
        
      }
        $("#bodySearchSugg ul li").click(function(){
            document.getElementById("loading").style.display = "";
            document.getElementById("mainContent").style.display = "none";
            document.getElementById("bodySearchBox").style.display = "none";
            
          var clickPlace = $(this).text()
            document.getElementById("bodySearchInput").value = clickPlace;
            setCookie("Weather_Anupam_Place",clickPlace);
            GLB_place = clickPlace;
            document.getElementById("SettLoc").getElementsByTagName("h6")[0].innerHTML = clickPlace;
            
            getWeather( clickPlace,GLB_unit);
            $("#bodySearchSugg ul").children().remove();
            
        });
    }
  }
  gPxHttp.open("GET",url,true);
  gPxHttp.send();
  
}

function YJSONtoData(json){
	
     weatherObj =  JSON.parse(json);
     
	   var result = new Object();
	   if(weatherObj.query.count != 0){
     YCity =weatherObj.query.results.channel.location.city;
     YRegion =weatherObj.query.results.channel.location.region;
     YCountry =weatherObj.query.results.channel.location.country;
     		if(YCountry == "" || YCountry == 'undefined' || YCountry == null){
          YCountry = "";
        }
        else{
          if(!(YRegion == "" || YRegion == 'undefined' || YRegion == null)){
            YCountry = ","+YCountry;
          }
        }
        
        
     YUnitsDistance =weatherObj.query.results.channel.units.distance;
     YUnitsPressure =weatherObj.query.results.channel.units.pressure;
     YUnitsSpeed =weatherObj.query.results.channel.units.speed;
     YUnitsTemperature =weatherObj.query.results.channel.units.temperature;
     YWindChill =weatherObj.query.results.channel.wind.chill;
     YWindDirection =weatherObj.query.results.channel.wind.direction;
     YWindSpeed =weatherObj.query.results.channel.wind.speed;
     YAtmosphereHumidity =weatherObj.query.results.channel.atmosphere.humidity;
     YAtmospherePressure =weatherObj.query.results.channel.atmosphere.pressure;
     YAtmosphereRising =weatherObj.query.results.channel.atmosphere.rising;
     		if(YAtmosphereRising == "0"){
     			YAtmosphereRising = "Steady";
     		}
     		else if(YAtmosphereRising == "1"){
     			YAtmosphereRising = "Rising";
     		}
     		else if(YAtmosphereRising == "2"){
     			YAtmosphereRising = "Falling";
     		}
     		else{
     			YAtmosphereRising = "N.A.";
     		}
     YAtmosphereVisibility =weatherObj.query.results.channel.atmosphere.visibility;
     YAstronomySunrise =weatherObj.query.results.channel.astronomy.sunrise;
     YAstronomySunset =weatherObj.query.results.channel.astronomy.sunset;
     YNowTemp =weatherObj.query.results.channel.item.condition.temp;
     YNowCondition =weatherObj.query.results.channel.item.condition.code;
     YTodayCondition =weatherObj.query.results.channel.item.forecast[0].code;
     YTodayDate =weatherObj.query.results.channel.item.forecast[0].date;
     		YTodayDate = YTodayDate.substring(0,6);
     YTodayDay =weatherObj.query.results.channel.item.forecast[0].day;
     		YTodayDay = YTodayDay.toUpperCase();
     YTodayHigh =weatherObj.query.results.channel.item.forecast[0].high;
     YTodayLow =weatherObj.query.results.channel.item.forecast[0].low;
     YDay1Condition =weatherObj.query.results.channel.item.forecast[1].code;
     YDay1Date =weatherObj.query.results.channel.item.forecast[1].date;
     		YDay1Date = YDay1Date.substring(0,6);
     YDay1Day =weatherObj.query.results.channel.item.forecast[1].day;
     		YDay1Day = YDay1Day.toUpperCase();
     YDay1High =weatherObj.query.results.channel.item.forecast[1].high;
     YDay1Low =weatherObj.query.results.channel.item.forecast[1].low;
     YDay2Condition =weatherObj.query.results.channel.item.forecast[2].code;
     YDay2Date =weatherObj.query.results.channel.item.forecast[2].date;
     		YDay2Date = YDay2Date.substring(0,6);
     YDay2Day =weatherObj.query.results.channel.item.forecast[2].day;
		YDay2Day = YDay2Day.toUpperCase();
     YDay2High =weatherObj.query.results.channel.item.forecast[2].high;
     YDay2Low =weatherObj.query.results.channel.item.forecast[2].low;
     YDay3Condition =weatherObj.query.results.channel.item.forecast[3].code;     
     YDay3Date =weatherObj.query.results.channel.item.forecast[3].date;
     		YDay3Date = YDay3Date.substring(0,6);
     YDay3Day =weatherObj.query.results.channel.item.forecast[3].day;
     		YDay3Day = YDay3Day.toUpperCase();
     YDay3High =weatherObj.query.results.channel.item.forecast[3].high;
     YDay3Low =weatherObj.query.results.channel.item.forecast[3].low;
     YDay4Condition =weatherObj.query.results.channel.item.forecast[4].code;   
     YDay4Date =weatherObj.query.results.channel.item.forecast[4].date;
     		YDay4Date = YDay4Date.substring(0,6);
     YDay4Day =weatherObj.query.results.channel.item.forecast[4].day;
     		YDay4Day = YDay4Day.toUpperCase();
     YDay4High =weatherObj.query.results.channel.item.forecast[4].high;
     YDay4Low =weatherObj.query.results.channel.item.forecast[4].low;
				 
			result["YCity"] = YCity;
			result["YRegion"] = YRegion;
			result["YCountry"] = YCountry;
			result["YUnitsDistance"] = YUnitsDistance;
			result["YUnitsPressure"] = YUnitsPressure;
			result["YUnitsSpeed"] = YUnitsSpeed;
			result["YUnitsTemperature"] = YUnitsTemperature;
			result["YWindChill"] = YWindChill;
			result["YWindDirection"] = YWindDirection;
			result["YWindSpeed"] = YWindSpeed;
			result["YAtmosphereHumidity"] = YAtmosphereHumidity;
			result["YAtmospherePressure"] = YAtmospherePressure;
			result["YAtmosphereRising"] = YAtmosphereRising;
			result["YAtmosphereVisibility"] = YAtmosphereVisibility;
			result["YAstronomySunrise"] = YAstronomySunrise;
			result["YAstronomySunset"] = YAstronomySunset;
			result["YNowTemp"] = YNowTemp;
			result["YNowCondition"] = YNowCondition;
			result["YTodayCondition"] = YTodayCondition;
			result["YTodayDate"] = YTodayDate;
			result["YTodayDay"] = YTodayDay;
			result["YTodayHigh"] = YTodayHigh;
			result["YTodayLow"] = YTodayLow;
			result["YDay1Condition"] = YDay1Condition;
			result["YDay1Date"] = YDay1Date;
			result["YDay1Day"] = YDay1Day;
			result["YDay1High"] = YDay1High;
			result["YDay1Low"] = YDay1Low;
			result["YDay2Condition"] = YDay2Condition;
			result["YDay2Date"] = YDay2Date;
			result["YDay2Day"] = YDay2Day;
			result["YDay2High"] = YDay2High;
			result["YDay2Low"] = YDay2Low;
			result["YDay3Condition"] = YDay3Condition;
			result["YDay3Date"] = YDay3Date;
			result["YDay3Day"] = YDay3Day;
			result["YDay3High"] = YDay3High;
			result["YDay3Low"] = YDay3Low;
			result["YDay4Condition"] = YDay4Condition;
			result["YDay4Date"] = YDay4Date;
			result["YDay4Day"] = YDay4Day;
			result["YDay4High"] = YDay4High;
			result["YDay4Low"] = YDay4Low;
     }
    else{
      result = "error!!";
    }
	return result;

}

function getCondition(CCode,Type)
{

	var r = new Object;

	switch(CCode){
		case 0 : r =  ["wi-tornado","Tornado"]
			break;
		case 1 : r =  ["wi-storm-showers","Tropical Storm"]
			break;
		case 2 : r =  ["wi-hurricane","Hurricane"]
			break;
		case 3 : r =  ["wi-thunderstorm","Severe Thunderstorm"]
			break;
		case 4 : r =  ["wi-thunderstorm","Thunderstorm"]
			break;
		case 5 : r =  ["wi-rain-mix","Mixed Rain & Snow"]
			break;
		case 6 : r =  ["wi-sleet","Mixed Rain & Sleet"]
			break;
		case 7 : r =  ["wi-sleet","Mixed Snow & Sleet"]
			break;
		case 8 : r =  ["wi-raindrops","Freezing Drizzle"]
			break;
		case 9 : r =  ["wi-raindrops","Drizzle"]
			break;
		case 10 : r =  ["wi-rain","Freezing Rain"]
			break;
		case 11 : r =  ["wi-showers","Showers"]
			break;
		case 12 : r =  ["wi-showers","Showers"]
			break;
		case 13 : r =  ["wi-snow","Snow Flurries"]
			break;
		case 14 : r =  ["wi-snow","Light Snow Showers"]
			break;
		case 15 : r =  ["wi-snow-wind","Blowing Snow"]
			break;
		case 16 : r =  ["wi-snow","Snow"]
			break;
		case 17 : r =  ["wi-hail","Hail"]
			break;
		case 18 : r =  ["wi-sleet","Sleet"]
			break;
		case 19 : r =  ["wi-dust","Dust"]
			break;
		case 20 : r =  ["wi-fog","Foggy"]
			break;
		case 21 : r =  ["wi-day-haze","Haze"]
			break;
		case 22 : r =  ["wi-smoke","Smoky"]
			break;
		case 23 : r =  ["wi-strong-wind","Blustery"]
			break;
		case 24 : r =  ["wi-windy","Windy"]
			break;
		case 25 : r =  ["wi-snowflake-cold","Cold"]
			break;
		case 26 : r =  ["wi-cloudy","Cloudy"]
			break;
		case 27 : r =  ["wi-night-cloudy","Night Mostly Cloudy"]
			break;
		case 28 : r =  ["wi-day-cloudy","Day Mostly Cloudy"]
			break;
		case 29 : r =  ["wi-night-partly-cloudy","Night Partly Cloudy"]
			break;
		case 30 : r =  ["wi-day-sunny-overcast","Day Partly Cloudy"]
			break;
		case 31 : r =  ["wi-night-clear","Clear Night"]
			break;
		case 32 : r =  ["wi-day-sunny","Sunny"]
			break;
		case 33 : r =  ["wi-night-clear","Fair"]
			break;
		case 34 : r =  ["wi-day-sunny","Fair"]
			break;
		case 35 : r =  ["wi-hail","Mixed Rain & Hail"]
			break;
		case 36 : r =  ["wi-hot","Hot"]
			break;
		case 37 : r =  ["wi-thunderstorm","Isolated Thinderstorm"]
			break;
		case 38 : r =  ["wi-thunderstorm","Scattered Thunderstorms"]
			break;
		case 39 : r =  ["wi-thunderstorm","Scattered Thunderstorms"]
			break;
		case 40 : r =  ["wi-showers","Scattered Showers"]
			break;
		case 41 : r =  ["wi-snow","Heavy Snow"]
			break;
		case 42 : r =  ["wi-snow","Scattered Snow Showers"]
			break;
		case 43 : r =  ["wi-snow","Heavy Snow"]
			break;
		case 44 : r =  ["wi-night-partly-cloudy","Partly Cloudy"]
			break;
		case 45 : r =  ["wi-thunderstorm","Thundershowers"]
			break;
		case 46 : r =  ["wi-snow","Snow Showers"]
			break;
		case 47 : r =  ["wi-storm-showers","Isolated Thundershowers"]
			break;
		case 3200 : r =  ["wi-na","N.A."]
			break;
		default : r =  ["wi-alien","Oops!! Something Went Wrong!"]
	}
	
	if(Type == 'i'){
		return r[0];
	}
	else if(Type == "s"){
		return r[1];		
	}
	else{
		return "Error!";
	}
}



function buildData(result)
{
	document.getElementById("location").getElementsByTagName("h4")[0].innerHTML = result.YCity;
	document.getElementById("location").getElementsByTagName("h6")[0].innerHTML = result.YRegion + result.YCountry;
    document.getElementById("SettLoc").getElementsByTagName("h6")[0].innerHTML = result.YCity + ","+ result.YRegion + result.YCountry;
	document.getElementById("TodayTemp").getElementsByTagName("h1")[0].innerHTML = result.YNowTemp;
	document.getElementById("TodayTemp").getElementsByTagName("h6")[0].innerHTML = "&deg;" + result.YUnitsTemperature;
	document.getElementById("TodayHiLo").getElementsByTagName("h6")[0].innerHTML = result.YTodayLow + "&deg;" + result.YUnitsTemperature;
	document.getElementById("TodayHiLo").getElementsByTagName("h6")[1].innerHTML = result.YTodayHigh + "&deg;" + result.YUnitsTemperature;
	document.getElementById("TodayCondition").getElementsByTagName("h6")[0].innerHTML = getCondition(parseInt(result.YNowCondition),"s");
	document.getElementById("WeatherIcon").getElementsByTagName("i")[0].className = "wi "+ getCondition(parseInt(result.YNowCondition),"i");
	
	document.getElementById("feels").getElementsByTagName("h6")[0].innerHTML = result.YWindChill+"&deg;"+ result.YUnitsTemperature;
	document.getElementById("direction").getElementsByTagName("h6")[0].innerHTML = result.YWindDirection+"&deg";
	document.getElementById("speed").getElementsByTagName("h6")[0].innerHTML = result.YWindSpeed + result.YUnitsSpeed;
	document.getElementById("humidity").getElementsByTagName("h6")[0].innerHTML = result.YAtmosphereHumidity + "%"; 
	document.getElementById("pressure").getElementsByTagName("h6")[0].innerHTML = result.YAtmospherePressure + " " + result.YUnitsPressure;
	document.getElementById("rising").getElementsByTagName("h6")[0].innerHTML = result.YAtmosphereRising ;
	document.getElementById("visibility").getElementsByTagName("h6")[0].innerHTML = result.YAtmosphereVisibility + " " + result.YUnitsDistance;
	document.getElementById("sunrise").getElementsByTagName("h6")[0].innerHTML = result.YAstronomySunrise;
	document.getElementById("sunset").getElementsByTagName("h6")[0].innerHTML = result.YAstronomySunset;
	document.getElementById("forecastDay1").getElementsByTagName("p")[0].innerHTML = result.YDay1Day;
	document.getElementById("forecastDay2").getElementsByTagName("p")[0].innerHTML = result.YDay2Day;
	document.getElementById("forecastDay3").getElementsByTagName("p")[0].innerHTML = result.YDay3Day;
	document.getElementById("forecastDay4").getElementsByTagName("p")[0].innerHTML = result.YDay4Day;
	document.getElementById("forecastDay2").getElementsByTagName("h6")[0].innerHTML = result.YDay2Date;
	document.getElementById("forecastDay3").getElementsByTagName("h6")[0].innerHTML = result.YDay3Date;
	document.getElementById("forecastDay4").getElementsByTagName("h6")[0].innerHTML = result.YDay4Date;
	document.getElementById("forecastIcon1").getElementsByTagName("i")[0].className = "wi "+ getCondition(parseInt(result.YDay1Condition),"i");
	document.getElementById("forecastIcon2").getElementsByTagName("i")[0].className = "wi "+ getCondition(parseInt(result.YDay2Condition),"i");
	document.getElementById("forecastIcon3").getElementsByTagName("i")[0].className = "wi "+ getCondition(parseInt(result.YDay3Condition),"i");
	document.getElementById("forecastIcon4").getElementsByTagName("i")[0].className = "wi "+ getCondition(parseInt(result.YDay4Condition),"i");
	document.getElementById("forecastCondition1").getElementsByTagName("h6")[0].innerHTML = getCondition(parseInt(result.YDay1Condition),"s");
	document.getElementById("forecastCondition2").getElementsByTagName("h6")[0].innerHTML = getCondition(parseInt(result.YDay2Condition),"s");
	document.getElementById("forecastCondition3").getElementsByTagName("h6")[0].innerHTML = getCondition(parseInt(result.YDay3Condition),"s");
	document.getElementById("forecastCondition4").getElementsByTagName("h6")[0].innerHTML = getCondition(parseInt(result.YDay4Condition),"s");
	document.getElementById("forecastHi1").getElementsByTagName("h6")[0].innerHTML = result.YDay1High+"&deg;"+result.YUnitsTemperature;
	document.getElementById("forecastHi2").getElementsByTagName("h6")[0].innerHTML = result.YDay2High+"&deg;"+result.YUnitsTemperature;
	document.getElementById("forecastHi3").getElementsByTagName("h6")[0].innerHTML = result.YDay3High+"&deg;"+result.YUnitsTemperature;
	document.getElementById("forecastHi4").getElementsByTagName("h6")[0].innerHTML = result.YDay4High+"&deg;"+result.YUnitsTemperature;
	document.getElementById("forecastLo1").getElementsByTagName("h6")[0].innerHTML = result.YDay1Low+"&deg;"+result.YUnitsTemperature;
	document.getElementById("forecastLo2").getElementsByTagName("h6")[0].innerHTML = result.YDay2Low+"&deg;"+result.YUnitsTemperature;
	document.getElementById("forecastLo3").getElementsByTagName("h6")[0].innerHTML = result.YDay3Low+"&deg;"+result.YUnitsTemperature;
	document.getElementById("forecastLo4").getElementsByTagName("h6")[0].innerHTML = result.YDay4Low+"&deg;"+result.YUnitsTemperature;
	
}

function getWeather(place,unit){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			  var result = YJSONtoData(xhttp.responseText) ;
        if(result != "error!!"){
				  buildData(result);
          document.getElementById("loading").style.display = "none";
          document.getElementById("location").style.display = "";
          document.getElementById("mainContent").style.display = "";
          document.getElementById("bodySearchBox").style.display = "none";
          document.getElementById("locSearch").classList.remove("active");
        }
      else{
          document.getElementById("loading").style.display = "none";
          document.getElementById("location").getElementsByTagName("h4")[0].innerHTML = "Location Not Found!!"
          document.getElementById("location").getElementsByTagName("h6")[0].innerHTML = "Please Try Searching Some Other City..."
          document.getElementById("location").style.display = "";
          document.getElementById("mainContent").style.display = "none";
          document.getElementById("bodySearchBox").style.display = "";
          document.getElementById("bodySearchInput").value = place;
          document.getElementById("locSearch").classList.remove("active");
      }
				

		}
		
	};
	
	url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + place +"%22)%20and%20u%3D%22"+unit+"%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
	xhttp.open("GET",url,true);
	xhttp.send();
}

function moreLess(){
	var State = document.getElementById("todaymore").style.display;
	if(State != "none" && State != ""){
		document.getElementById("todaymore").style.display = "none";

	}
	else{
		document.getElementById("todaymore").style.display = "inline";
	}
		document.getElementById("moreLess").classList.toggle("rotated");
}


function displaySettings(){
	document.getElementById("settingList").classList.toggle("active");
	document.getElementById("sett1").classList.toggle("active");
	document.getElementById("sett2").classList.toggle("active");
	document.getElementById("sett3").classList.toggle("active");
}

function searchLoc(){
  if(document.getElementById("location").getElementsByTagName("h4")[0].innerHTML != ""){
      if(document.getElementById("locSearch").classList.contains("active") === true){
        document.getElementById("loading").style.display = "none";
        document.getElementById("mainContent").style.display = "";
        document.getElementById("location").style.display = "";
        document.getElementById("bodySearchBox").style.display = "none";
      }
      else{
        document.getElementById("loading").style.display = "none";
        document.getElementById("mainContent").style.display = "none";
        document.getElementById("location").style.display = "none";
        document.getElementById("bodySearchBox").style.display = "";
      }
    document.getElementById("locSearch").classList.toggle("active");
    document.getElementById("settingList").classList.remove("active");
    document.getElementById("sett1").classList.remove("active");
    document.getElementById("sett2").classList.remove("active");
    document.getElementById("sett3").classList.remove("active");
  }
  
}

function searchLocOnly(){
        
    document.getElementById("loading").style.display = "none";
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("location").style.display = "none";
    document.getElementById("bodySearchBox").style.display = "";
      
    
    document.getElementById("settingList").classList.remove("active");
    document.getElementById("sett1").classList.remove("active");
    document.getElementById("sett2").classList.remove("active");
    document.getElementById("sett3").classList.remove("active");
  
  if(document.getElementById("location").getElementsByTagName("h4")[0].innerHTML != ""){
    document.getElementById("locSearch").classList.toggle("active");
  }
  
}

