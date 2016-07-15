<?php
  if(!isset($_COOKIE["Weather_Anupam_Place"])){
    setcookie("Weather_Anupam_Place", "Not Set", time() + (86400 * 30 * 12 * 10), "/");
  }
  if(!isset($_COOKIE["Weather_Anupam_Remember"])){
    setcookie("Weather_Anupam_Remember", "No", time() + (86400 * 30 * 12 * 10), "/");
  }
  if(!isset($_COOKIE["Weather_Anupam_Unit"])){
    setcookie("Weather_Anupam_Unit", "c", time() + (86400 * 30 * 12 * 10), "/");
  }
?>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="css/normalize.css"/>
    <link rel="stylesheet" type="text/css" href="css/weather-icons.css"/>
    <link rel="stylesheet" type="text/css" href="css/ionicons.css"/>
    <link rel="stylesheet" type="text/css" href="css/main.css"/>

    <link rel="icon" type="image/png" href="img/favicon.png" />
    
    <meta property="og:image" content="http://labs.anupamm.com/Weather/img/favicon.png" />
    <meta http-equiv:"content-type" content="text/html;charset=UTF-8" />
    <meta charset="UTF-8" /> 
    <meta name="description" content="Weather tells you about the weather based on your location. You can also change location based on an easy search engine. This is a simple yet elegant weather app. " />
    <meta property="og:description" content="Weather tells you about the weather based on your location. You can also change location based on an easy search engine. This is a simple yet elegant web app." />
    <meta name="keywords" content="Best Weather, Best Weather App,Best,Weather,App,Forecast,Anupam,Majhi,Anupam Majhi,portfolio,blog,india,web,developer,anupammajhi,anupamfx,volvo,designer,computer,science,engineer,server,resume,lab,experiment" />
    <meta name="author" content="Anupam Majhi" />
    <meta property="og:type" content="article" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weather | Anupam Majhi | LAB &raquo; labs.AnupamM.com</title>
    <meta property="og:title" content="Weather | Anupam Majhi | LAB &raquo; labs.AnupamM.com" />
    <!--



 __          __  _                            _         
 \ \        / / | |                          | |        
  \ \  /\  / /__| | ___ ___  _ __ ___   ___  | |_ ___   
   \ \/  \/ / _ \ |/ __/ _ \| '_ ` _ \ / _ \ | __/ _ \  
    \  /\  /  __/ | (_| (_) | | | | | |  __/ | || (_) | 
     \/  \/ \___|_|\___\___/|_| |_| |_|\___|  \__\___/  
                                                        
  

888       888                   888    888                       
888   o   888                   888    888                       
888  d8b  888                   888    888                       
888 d888b 888  .d88b.   8888b.  888888 88888b.   .d88b.  888d888 
888d88888b888 d8P  Y8b     "88b 888    888 "88b d8P  Y8b 888P"   
88888P Y88888 88888888 .d888888 888    888  888 88888888 888     
8888P   Y8888 Y8b.     888  888 Y88b.  888  888 Y8b.     888     
888P     Y888  "Y8888  "Y888888  "Y888 888  888  "Y8888  888     
                                                                 

  _  _   ___   _____   ___ _   _ _  _     _ 
 | || | /_\ \ / / __| | __| | | | \| |   | |
 | __ |/ _ \ V /| _|  | _|| |_| | .` |   |_|
 |_||_/_/ \_\_/ |___| |_|  \___/|_|\_|   (_)
                               
                               
                                            
CREATED BY ----------------------------

 +-+-+-+-+-+-+ +-+-+-+-+-+
 |A|n|u|p|a|m| |M|a|j|h|i|
 +-+-+-+-+-+-+ +-+-+-+-+-+





-->


</head>
<body>

	<div id="topnav">

		<div id="header" class="center"><h2>Weather</h2></div>
		
	</div>
	<div id="topnav2">
		<div id="location">
			<h4></h4>
			<h6></h6>
		</div>
		
	</div>
<div id="loading" class="center"></div>
<div id="bodySearchBox" class="center"  style="display:none;">
	<form id="bodySearchForm">
		<input id="bodySearchInput" selectionStart="10" placeholder="Search Location" type="text" autocomplete="off">
		<input id="bodySearchSubmit" type="submit" value="Go">
	</form>
	<div id="bodySearchSugg">
		<ul>
		</ul>
	</div>
</div>


	<div id="mainContent" style="display:none;">	
	<div id="col1">
		<div id="todayMain">
			
			<div id="TempDisplay">
				<div id="TodayTemp">
					<h1></h1><h6></h6>
				</div>
				<div id="TodayHiLo">
					<p>Lo </p> <h6></h6> &nbsp;&nbsp;&nbsp;&nbsp; <p>Hi</p> <h6></h6>
				</div>
				<div id="TodayCondition">
					<h6></h6>
				</div>
			</div>
			<div id="WeatherIcon">
				<i class="wi wi-na"></i>
			</div>
		</div>
		<div id="moreLess" class="" onclick="moreLess()"></div> 
		<div id="todaymore">
			<div id="todayWind">
				<div id="MoreName"><h6>Wind</h6></div>
				<div id="MoreValue">
					<div class="valueTable">
						<div id="feels" class="valueRow"><div class="valueCell"><p>Feels Like </p></div><div class="valueCell"><h6></h6></div></div>
						<div id="direction" class="valueRow"><div class="valueCell"><p>Direction </p></div><div class="valueCell"><h6></h6></div></div>
						<div id="speed" class="valueRow"><div class="valueCell"><p>Speed </p></div><div class="valueCell"><h6></h6></div></div>
					</div>
				</div>
				
			</div>
			<div id="todayAtmosphere">
				<div id="MoreName"><h6>Atmosphere</h6></div>
				<div id="MoreValue">
					<div class="valueTable">
						<div id="humidity" class="valueRow"><div class="valueCell"><p>Humidity </p></div><div class="valueCell"><h6></h6></div></div> 
						<div id="pressure" class="valueRow"><div class="valueCell"><p>Pressure </p></div><div class="valueCell"><h6></h6></div></div>
						<div id="rising" class="valueRow"><div class="valueCell"><p>Rising </p></div><div class="valueCell"><h6></h6></div></div>
						<div id="visibility" class="valueRow"><div class="valueCell"><p>Visibility </p></div><div class="valueCell"><h6></h6></div></div>
					</div>
				</div>
			</div>
			<div id="todayAstronomy">
				<div id="MoreName"><h6>Astronomy</h6></div>
				<div id="MoreValue">
					<div class="valueTable">
						<div id="sunrise" class="valueRow"><div class="valueCell"><p>SunRise </p></div><div class="valueCell"><h6>7:02 am</h6></div></div>
						<div id="sunset" class="valueRow"><div class="valueCell"><p>Sunset </p></div><div class="valueCell"><h6>6:30 pm</h6></div></div>
					</div>
				</div>
			</div>
		</div>

	</div>
	<div id="col2">
		<div class="forecast">
			<div id="forecastDay1" class="forecastDay"><h6>Tomorrow</h6> <p></p></div>
			<div id="forecastIcon1" class="forecastIcon"><i class="wi wi-na"></i></div>
			<div id="forecastHi1" class="forecastHi"><h6></h6></div>
			<div id="forecastLo1" class="forecastLo"><h6></h6></div>
			<div id="forecastCondition1" class="forecastCondition"><h6></h6></div>
		</div>
		<div class="forecast">
			<div id="forecastDay2" class="forecastDay"><h6></h6> <p></p></div>
			<div id="forecastIcon2" class="forecastIcon"><i class="wi wi-na"></i></div>
			<div id="forecastHi2" class="forecastHi"><h6></h6></div>
			<div id="forecastLo2" class="forecastLo"><h6></h6></div>
			<div id="forecastCondition2" class="forecastCondition"><h6></h6></div>
		</div>
		<div class="forecast">
			<div id="forecastDay3" class="forecastDay"><h6></h6> <p></p></div>
			<div id="forecastIcon3" class="forecastIcon"><i class="wi wi-na"></i></div>
			<div id="forecastHi3" class="forecastHi"><h6></h6></div>
			<div id="forecastLo3" class="forecastLo"><h6></h6></div>
			<div id="forecastCondition3" class="forecastCondition"><h6></h6></div>
		</div>
		<div class="forecast">
			<div id="forecastDay4" class="forecastDay"><h6></h6> <p></p></div>
			<div id="forecastIcon4" class="forecastIcon"><i class="wi wi-na"></i></div>
			<div id="forecastHi4" class="forecastHi"><h6></h6></div>
			<div id="forecastLo4" class="forecastLo"><h6></h6></div>
			<div id="forecastCondition4" class="forecastCondition"><h6></h6></div>
		</div>
	</div>
	</div>
  <div id="locSearch" onclick="searchLoc()">
  </div>
	<div id="settingList" class="">
	    
		<h4>Settings</h4>
		<div class="setting"><h6>Unit </h6></div>
      <div id="unitBtn">
        <input type="button" class="TBtn" value="&deg;C">
        <input type="button" class="TBtn" value="&deg;F">
      </div>
		<div class="setting"><h6>Location </h6></div>
      <div id="SettLoc"><h6></h6>
        
        <button id="locBtn" class="TBtn" onclick="searchLocOnly()"><i class="icon ion-ios-location"></i></button>
        
      </div>
		<div class="setting"><h6>Remember </h6></div>
      <div id="remBtn">
        <input type="button" class="TBtn" value="Yes">
        <input type="button" class="TBtn" value="No">
      </div>

	</div>
  
	<div id="settingBtn" onclick="displaySettings()">
		<div id="sett1" class="greyRect"></div>
		<div id="sett2" class="greyRect"></div>
		<div id="sett3" class="greyRect"></div>
	</div>
  
  
  
  <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
  <script src="js/getData.js"></script>
  <script>
      /*getWeather("2295386" ,"c");*/
      var searchKey;
  </script>
</body>
</html>
