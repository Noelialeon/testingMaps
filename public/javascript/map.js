$(document).ready(function(){
  
  var map;
  var geocoder = new google.maps.Geocoder();

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