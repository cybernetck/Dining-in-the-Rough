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

                var resultOutput = '<p class="title">' + restaurantCounter + '. ' +
                                    yelpObj.businesses[i].name + '</p>' + 
                                    '<p class="address">' + yelpObj.businesses[i].location.display_address[0] + ', ' + yelpObj.businesses[i].location.display_address[1] + '</p>' + 
                                    '<p class="rating">' + '</p>' +
                                    '<p class="reviews"><a target="_blank" href=' + yelpObj.businesses[i].url + '>' + 'Based on ' + yelpObj.businesses[i].review_count + ' Reviews' + '</a></p>';
                                    
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

                                            //Need to find the correct query selector here!
                                            if (yelpObj.businesses[i].rating === 5){
                                                $('.rating').html(imageLinks[0]);
                                            }
                                            else if (yelpObj.businesses[i].rating === 4.5){
                                                $('.rating').html(imageLinks[1]); 
                                            }
                                            else if (yelpObj.businesses[i].rating === 4){
                                                $('.rating').html(imageLinks[2]); 
                                            }
                                            else if (yelpObj.businesses[i].rating === 3.5){
                                                $('.rating').html(imageLinks[3]); 
                                            }
                                            else if (yelpObj.businesses[i].rating === 3){
                                                $('.rating').html(imageLinks[4]); 
                                            }
                                            else if (yelpObj.businesses[i].rating === 2.5){
                                                $('.rating').html(imageLinks[5]); 
                                            }
                                            else if (yelpObj.businesses[i].rating === 2){
                                                $('.rating').html(imageLinks[6]); 
                                            }
                                            else if (yelpObj.businesses[i].rating === 1.5){
                                                $('.rating').html(imageLinks[7]); 
                                            }
                                            else if (yelpObj.businesses[i].rating === 1){
                                                $('.rating').html(imageLinks[8]); 
                                            }
                                            else {
                                            }

                newResult.html(resultOutput);
        }
    });
}
