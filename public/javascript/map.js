$(document).ready(function(){
  
  var map;
  var geocoder = new google.maps.Geocoder();
  var pos;
  
  function geocodeAddress() {
    var address = document.getElementById('address').value;
    
    geocoder.geocode({'address': address}, function(results, status) {
      
      if (status === 'OK') {
        var latit = results[0].geometry.location.lat();
        var long = results[0].geometry.location.lng();
        document.getElementById('latitude').setAttribute('value', latit);
        document.getElementById('longitude').setAttribute('value', long);
        var actualMark = new google.maps.Marker({
          position: {
            lat: latit, 
            lng: long, 
          },
          map: map,
          title: results[0].geometry.name,           
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  
  
  function startMap() {
    var ironhackBCN = {
      lat: 41.3977381, 
      lng: 2.190471916};
      map = new google.maps.Map(
        document.getElementById('map'), 
        {
          zoom: 15,
          center: ironhackBCN
        }
      );
      chargeRestaurants();
      var infoWindow = new google.maps.InfoWindow({map: map});
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
  
          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    };
    
    function chargeRestaurants(){
      $.ajax({
        url: "http://localhost:3000/api",
        method: "GET",
        success: function (response) {
          
          response.forEach(function(restaurant){
            console.log(restaurant);
            restaurant = new google.maps.Marker({
              position: {
                lat: restaurant.location.coordinates[1], 
                lng: restaurant.location.coordinates[0], 
              },
            map: map,
            title: restaurant.name            
          });
        });
       },
      error: function (err) {
        console.log(err);
      },
    })
  }

//   function searchAround(){
//     $.ajax({
//       url: "http://localhost:3000/api/search",
//       method: "GET",
//       success: function (response) {
//         // console.log(response)
//         // response.forEach(function(restaurant){
//         //   console.log(restaurant);
//         //   restaurant = new google.maps.Marker({
//         //     position: {
//         //       lat: pos.lat, 
//         //       lng: pos.lng, 
//         //     },
//         //   map: map,
//         //   title: restaurant.name            
//         // });
//       });
//      },
//     error: function (err) {
//       console.log(err);
//     },
//   })
// }
  
  

  startMap();

  $("#geocode").submit(function(){
    geocodeAddress();
    event.preventDefault();
  });

  $("#search").submit(function(){
    searchAround();
    event.preventDefault();
  });

});