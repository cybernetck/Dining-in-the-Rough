var latLong = '';

//This is the initial map view upon loading
function initMap() {
    var userLocation = {lat: 41.89633, lng: -87.61871};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: userLocation,
      gestureHandling: 'cooperative'
    });
}

// Update Google Map with a view of the location requested by user
function updateMap() {
    var mapSplit = latLong.split("/");
    var userLocation = {lat: parseFloat(mapSplit[0]), lng: parseFloat(mapSplit[1])};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: userLocation,
      gestureHandling: 'cooperative'
    });
    /* Turning this off - may use this as a custom marker for user position
    var marker = new google.maps.Marker({
      position: userLocation,
      map: map,
      title: 'User'
    });*/
}

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

        for (var i = 0; i < 10; i++){
            restaurantCounter++;

            var newResult = $('<div>');
                newResult.addClass('result');
                newResult.attr('id', 'restaurant-' + restaurantCounter);
                
                $('.search-results').append(newResult);


                var resultOutput =  '<p class="title">' + restaurantCounter + '. ' + yelpObj.businesses[i].name + '</p>' + 
                                    '<p class="address">' + yelpObj.businesses[i].location.display_address[0] + ', ' + yelpObj.businesses[i].location.display_address[1] + '</p>' + 
                                    `<p class=rating${i}>` + '</p>' +
                                    '<p class="reviews"><a target="_blank" href=' + yelpObj.businesses[i].url + '>' + 'Based on ' + yelpObj.businesses[i].review_count + ' Reviews' + '</a></p>';

                var favButton = $('<button>');
                                            favButton.attr('id', restaurantCounter);
                                            favButton.attr('class', 'favBox btn btn-default');
                                            favButton.attr("data-name", yelpObj.businesses[i].name);
                                            favButton.attr("data-url", yelpObj.businesses[i].url);
                                            favButton.append("add to favs");

                newResult.html(resultOutput);

                                    var imageLinks = [
                                        '<img src="../images/regular/regular_5.png" alt="5 stars">',
                                        '<img src="../images/regular/regular_4_half.png" alt="4.5 stars">',
                                        '<img src="../images/regular/regular_4.png" alt="4 stars">',
                                        '<img src="../images/regular/regular_3_half.png" alt="3.5 stars">',
                                        '<img src="../images/regular/regular_3.png" alt="3 stars">',
                                        '<img src="../images/regular/regular_2_half.png" alt="2.5 stars">',
                                        '<img src="../images/regular/regular_2.png" alt="2 stars">',
                                        '<img src="../images/regular/regular_1_half.png" alt="1.5 stars">',
                                        '<img src="../images/regular/regular_1.png" alt="1 star">'
                                    ];

                                            if (yelpObj.businesses[i].rating === 5){
                                                $('.rating' + i).html(imageLinks[0]);
                                            }
                                            else if (yelpObj.businesses[i].rating === 4.5){
                                                $('.rating' + i).html(imageLinks[1]); 
                                            }
                                            else if (yelpObj.businesses[i].rating === 4){
                                                $('.rating' + i).html(imageLinks[2]); 
                                            }
                                            else if (yelpObj.businesses[i].rating === 3.5){
                                                $('.rating' + i).html(imageLinks[3]); 
                                            }
                                            else if (yelpObj.businesses[i].rating === 3){
                                                $('.rating' + i).html(imageLinks[4]); 
                                            }
                                            else if (yelpObj.businesses[i].rating === 2.5){
                                                $('.rating' + i).html(imageLinks[5]); 
                                            }
                                            else if (yelpObj.businesses[i].rating === 2){
                                                $('.rating' + i).html(imageLinks[6]); 
                                            }
                                            else if (yelpObj.businesses[i].rating === 1.5){
                                                $('.rating' + i).html(imageLinks[7]); 
                                            }
                                            else if (yelpObj.businesses[i].rating === 1){
                                                $('.rating' + i).html(imageLinks[8]); 
                                            }
                newResult.prepend(favButton);

        }

     /* Update Map with location after location is entered */
        updateMap();
    });
}

