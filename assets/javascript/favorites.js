var latLong = '';

var getLatLng = function() {

    var APIKey = '&key=AIzaSyCRYYladM1Ui9mjSl2TgmWoTwj_tCO4Lxc';
 
    event.preventDefault();
 
    var getZip = $('#location-input').val();
    console.log(getZip);
    var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + getZip;
    
    $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(function(response) {
    
        latLong = response.results[0].geometry.location.lat + '/' + response.results[0].geometry.location.lng;
        console.log(latLong);
        runQuery(latLong);
  
      });
 }
 $('.submit').on('click', getLatLng);

//Put yelp query function here
function runQuery(latLong){

    var queryURL = 'https://cors-anywhere.herokuapp.com/' + 'https://nu-yelp-api.herokuapp.com/api/all/' + latLong + '/1/3219';
    var restaurantCounter = 0;
    console.log(queryURL);  
  
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(yelpData){

        //make the yelpData into an object
        var yelpObj = JSON.parse(yelpData);
        console.log(yelpObj);

        for (var i = 0; i < 10; i++){
            restaurantCounter++;
            console.log(yelpObj.businesses[i].name);

            var newResult = $('<div>');
                newResult.addClass('result');
                newResult.attr('id', 'restaurant-' + restaurantCounter);
                
                $('.search-results').append(newResult);
                newResult.text(restaurantCounter + '. ' + yelpObj.businesses[i].name);
                //favorites button addition to main.js
                newResult.append("<button class='favorites>").text("+ favorites").attr("data-index", i);
                newResult.append(yelpObj.businesses[i].location.display_address);
                newResult.append(yelpObj.businesses[i].rating);
                newResult.append(yelpObj.businesses[i].link);
                    if (yelpObj.businesses[i].is_closed === false){
                        newResult.append('Open Now');
                    }
                
                
        }
    });
}

// var favorites = JSON.parse(localStorage.getItem("savedplaces"));

// if (!Array.isArray(favorites)) {
//     favorites = [];
// }

// function putOnPage () {
//     $(".saved-places").empty();

//     var insideFavorites = JSON.parse(localStorage.getItem("savedplaces"));

//     if (!Array.isArray(insideFavorites)){
//         insideFavorites = [];
//     }

    // for (var i =0; i < insideFavorites.length; i++){
    //     var place = $("<p>").text(insideFavorites[i]);
    //     var addButton = $("<button class='add-to-favs'>").text("Add to favs").attr("data-index", i);
    //     place.prepend(addButton);
    //     $(".saved-places").prepend(place);
    
    // }
// }

// putOnPage();

// $()