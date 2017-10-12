
// function updateClock() {
//   var d = new Date();
//   $('.clock').html(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
// }
// updateClock();
// setInterval(updateClock, 1000);

$(function() {
  setInterval(function(){
    var dt = new Date();
    //$('.time').text(dt);
  
    var sec_deg = dt.getSeconds() * (360/60);
    var min_deg = dt.getMinutes() * (360/60);
    var hr_deg = dt.getHours() * (360/12) + dt.getMinutes() * (360/60/12); 

    $('.clock .second-hand').css({'-webkit-transform':'rotate(' + sec_deg + 'deg)',	'-moz-transform':'rotate(' + sec_deg + 'deg)', '-o-transform':'rotate(' + sec_deg + 'deg)', '-ms-transform':'rotate(' + sec_deg + 'deg)', 'transform':'rotate(' + sec_deg  + 'deg)'});

    $('.clock .minute-hand').css({'-webkit-transform':'rotate(' + min_deg + 'deg)', '-moz-transform':'rotate(' + min_deg + 'deg)', '-o-transform':'rotate(' + min_deg + 'deg)', '-ms-transform':'rotate(' + min_deg + 'deg)', 'transform':'rotate(' + min_deg + 'deg)'});

    $('.clock .hour-hand').css({'-webkit-transform':'rotate(' + hr_deg + 'deg)', '-moz-transform':'rotate(' + hr_deg + 'deg)', '-o-transform':'rotate(' + hr_deg + 'deg)', '-ms-transform':'rotate(' + hr_deg + 'deg)', 'transform':'rotate(' + hr_deg + 'deg)'});
  
  }, 1000);
});


// $(document).ready(function() {
//   //confirm('Not working? Location access might be disabled.');
//   navigator.geolocation.getCurrentPosition(function(position) {
//     var latitude = position.coords.latitude;
//     var longitude = position.coords.longitude;
//     var Api = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
//       $.getJSON(Api, function(json) {
//         var icon = json.weather[0].icon;
//         var location =  json.name;
//         var temperature =  json.main.temp;
//         var weatherStatus = json.weather[0].description;
//         var country = json.sys.country;
     
//       console.log(json);
//       $(".location").html(location + " " + country);
//       $(".weather-icon").html("<p>" + "<img alt='icon' src=" + icon + ">");
//       $(".status").html(weatherStatus);
//       $(".temp").html(temperature);
//     });
//   });
// });
$(document).ready(function() {

  //confirm('Not working? Location access might be disabled.');
  navigator.geolocation.getCurrentPosition(function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var key = "63c2f3c72bac49c181d95500170310";
    var Api =
      "http://api.apixu.com/v1/forecast.json?key=" +
      key +
      "&q=" +
      latitude +
      "," +
      longitude +
      "";
    $.getJSON(Api, function(json) {
      var icon = "http:" + json.forecast.forecastday["0"].day.condition.icon;
      
      var icon1 = "http:" + json.forecast.forecastday["0"].hour["6"].condition.icon;
      var icon2 = "http:" + json.forecast.forecastday["0"].hour["12"].condition.icon;
      var icon3 = "http:" + json.forecast.forecastday["0"].hour["18"].condition.icon;
      var icon4 = "http:" + json.forecast.forecastday["0"].hour["0"].condition.icon;

      var weatherStatus = json.current.condition.text;
      var name = json.location.name;
      var region = json.location.region;
      //
      var iconObjects = {
        Clear: "https://s4.postimg.org/n2fso2e4d/SG3_PFVt.jpg",
        Sunny: "https://adena3ka2.files.wordpress.com/2017/04/4463518-sunshine-wallpapers.jpg?w=900&h=300&crop=1",
        /* Day and Night */
        "Partly cloudy":
          "https://skmusings.files.wordpress.com/2012/10/partlycloudy.jpg",
        /* Day || Night */
        Cloudy:
          "https://static.pexels.com/photos/768/sky-clouds-cloudy-ray-of-sunshine.jpg",
        /* Day || Night */
        Overcast:
          "https://static.pexels.com/photos/768/sky-clouds-cloudy-ray-of-sunshine.jpg",
        Mist: "https://i.ytimg.com/vi/zs2UBzaoc2Y/maxresdefault.jpg", // Day
        "Patchy rain possible":
          "https://c1.staticflickr.com/7/6125/6001185409_9d8c770255_b.jpg",
        "Patchy snow possible":
          "https://lh3.ggpht.com/725Jpnqt4WWLI-bmaD8PmCCQ5iutfXz6DmuGAFJTt_l5BKFGvyPsxjVqjmdJU94OsiQ=h900",
        "Patchy sleet possible":
          "https://s17.postimg.org/x2lso57mn/sleet-57145.jpg",
        "Patchy freezing drizzle possible":
          "https://i.ytimg.com/vi/0Hn2Ypfa6cU/maxresdefault.jpg",
        "Thundery outbreaks possible":
          "https://s15.postimg.org/7wv3g26rv/image.jpg",
        "Blowing snow":
          "https://s23.postimg.org/o8wrthyq3/snowfall-800x500_c.jpg",
        Blizzard: "https://s3.postimg.org/gim798hfn/83_Lm_HEO.jpg",
        Fog: "https://s3.postimg.org/enefl15sj/fog_8.jpg",
        "Freezing fog": "https://s3.postimg.org/enefl15sj/fog_8.jpg",
        "Patchy light drizzle":
          "https://images4.alphacoders.com/831/thumb-1920-83196.jpg",
        "Light drizzle":
          "https://images4.alphacoders.com/831/thumb-1920-83196.jpg",
        "Heavy freezing drizzle":
          "https://images4.alphacoders.com/831/thumb-1920-83196.jpg",
        "Light rain":
          "https://s16.postimg.org/68u28pkr9/lights-rain-bokeh-water-droplets-wallpaper-1.jpg",
        "Patchy light rain":
          "https://s16.postimg.org/68u28pkr9/lights-rain-bokeh-water-droplets-wallpaper-1.jpg",
        "Moderate rain at times":
          "https://s16.postimg.org/68u28pkr9/lights-rain-bokeh-water-droplets-wallpaper-1.jpg",
        "Moderate rain":
          "https://s16.postimg.org/68u28pkr9/lights-rain-bokeh-water-droplets-wallpaper-1.jpg",
        "Heavy rain at times":
          "https://s16.postimg.org/68u28pkr9/lights-rain-bokeh-water-droplets-wallpaper-1.jpg",
        "Heavy rain":
          "https://s16.postimg.org/68u28pkr9/lights-rain-bokeh-water-droplets-wallpaper-1.jpg",
        "Light freezing rain":
          "https://s16.postimg.org/68u28pkr9/lights-rain-bokeh-water-droplets-wallpaper-1.jpg",
        "Moderate or heavy freezing rain":
          "https://s16.postimg.org/68u28pkr9/lights-rain-bokeh-water-droplets-wallpaper-1.jpg",
        "Light sleet": "https://images4.alphacoders.com/235/235564.jpg",
        "Moderate or heavy sleet":
          "https://images4.alphacoders.com/235/235564.jpg",
        "Patchy light snow": "https://s14.postimg.org/5fhjqpdup/cf_VSSZx.jpg",
        "Light snow": "https://s14.postimg.org/5fhjqpdup/cf_VSSZx.jpg",
        "Patchy moderate snow": "https://s14.postimg.org/5fhjqpdup/cf_VSSZx.jpg",
        "Moderate snow": "https://s14.postimg.org/5fhjqpdup/cf_VSSZx.jpg",
        "Patchy heavy snow": "https://s14.postimg.org/5fhjqpdup/cf_VSSZx.jpg",
        "Heavy snow": "https://s14.postimg.org/5fhjqpdup/cf_VSSZx.jpg",
        /*snow*/
        "Ice pellets": "https://upload.wikimedia.org/wikipedia/commons/6/6d/2013-01-24_Ice_pellets_and_glaze_from_freezing_rain_on_a_car_at_night_in_Elko%2C_Nevada.jpg",
        "Light rain shower": "https://cmeimg-a.akamaihd.net/640/photos.demandstudios.com/getty/article/161/235/80406500.jpg",
        "Moderate or heavy rain shower": "https://cmeimg-a.akamaihd.net/640/photos.demandstudios.com/getty/article/161/235/80406500.jpg",
        "Torrential rain shower": "https://cmeimg-a.akamaihd.net/640/photos.demandstudios.com/getty/article/161/235/80406500.jpg",
        /*rain*/
        "Light sleet showers": "https://valria.files.wordpress.com/2010/12/img00254-20101230-0808.jpg",
        "Moderate or heavy sleet showers": "https://valria.files.wordpress.com/2010/12/img00254-20101230-0808.jpg",
        /*sleet*/
        "Light snow showers": "https://s13.postimg.org/6xmt7d4jr/snow.jpg",
        "Moderate or heavy snow showers": "https://s13.postimg.org/6xmt7d4jr/snow.jpg",
        "Light showers of ice pellets": "https://upload.wikimedia.org/wikipedia/commons/6/6d/2013-01-24_Ice_pellets_and_glaze_from_freezing_rain_on_a_car_at_night_in_Elko%2C_Nevada.jpg",
        "Moderate or heavy showers of ice pellets": "https://upload.wikimedia.org/wikipedia/commons/6/6d/2013-01-24_Ice_pellets_and_glaze_from_freezing_rain_on_a_car_at_night_in_Elko%2C_Nevada.jpg",
        /*...*/
        "Patchy light rain with thunder": "https://s18.postimg.org/r1dcxihvd/636000076698153744-318535480_maxresdefault.jpg",
        "Moderate or heavy rain with thunder": "https://s18.postimg.org/r1dcxihvd/636000076698153744-318535480_maxresdefault.jpg",
        /*...*/
        "Patchy light snow with thunder": "https://www.sott.net/image/s19/380116/header/548b1b458d675_THUNDERSNOW.jpg",
        "Moderate or heavy snow with thunder": "https://www.sott.net/image/s19/380116/header/548b1b458d675_THUNDERSNOW.jpg"
      };
     
      var tempC = json.current.temp_c  +' ˚C';
      var minMaxTemp = json.forecast.forecastday["0"].day.mintemp_c +'˚C ' + ' / ' + json.forecast.forecastday["0"].day.maxtemp_c +'˚C';
      var feelsLike ='It feels like ' + json.current.feelslike_c;
      var date =  json.forecast.forecastday["0"].date;
      var wind = "Wind: " + json.current.wind_kph + " kmh ";
      var humidity = " Humidity: " + json.current.humidity + "% ";
      var precipitation = " Precipitation: " + json.current.precip_in + "%";
      var time1 = "<p class='castInfos'>" + json.forecast.forecastday["0"].hour[6].temp_c +'˚'+"</p>";
      var time2 = "<p class='castInfos'>" + json.forecast.forecastday["0"].hour[12].temp_c +'˚'+"</p>";
      var time3 = "<p class='castInfos'>" + json.forecast.forecastday["0"].hour[18].temp_c +'˚'+"</p>";
      var time4 = "<p class='castInfos'>" + json.forecast.forecastday["0"].hour[0].temp_c +'˚'+"</p>";
      console.log(json);
      $(".location").html(name + ", " + region + "<p>" + date);
      $(".weather-icon").html("<p>" + "<img alt='icon' src=" + icon + ">");
      $(".feelsLike").html(feelsLike +' ˚C');
      // Fetchng temperature and icons for different hours
     
      $(".time1").html("<div>06.00 AM</div>" + "<img class='weatherIcons' alt='icon1' src=" + icon1 + ">" + time1);
      $(".time2").html("<div>12.00 PM</div>" + "<img class='weatherIcons' alt='icon1' src=" + icon2 + ">" + time2);
      $(".time3").html("<div>18.00 PM</div>" + "<img class='weatherIcons' alt='icon1' src=" + icon3 + ">" + time3);
       $(".time4").html("<div>12.00 AM</div>" + "<img class='weatherIcons' alt='icon1' src=" + icon4 + ">" + time4);
      // Fetching data for Min & MAx temperature
      $(".min-max-Temp").html(minMaxTemp)
      var status_tempC = tempC;
      $(".temp").html(status_tempC);
      $(".temp").on("click", function() {
        if ($(".temp").html() == status_tempC) {
          $(".temp").html(status_tempC);
        } else {
          $(".temp").html(status_tempF);
        }
      });
      $(".status").html(wind +'\xa0\xa0'+ humidity +'\xa0\xa0'+ precipitation);
      //
      
      $("xbox").css(
        "background-image",
        "url(" + iconObjects[weatherStatus] + ")"
      ); /* if weatherStatus==="Clear" and will select an object's property from iconObjects*/
    });
  });
});


