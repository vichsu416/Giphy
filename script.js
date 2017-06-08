$(document).ready(function(){
    var emotions = ['Happy', 'Frightened', 'Laughing', 'Scared', 'Confused'];

  //  create emotions array buttons
    function buttons(){
        $('#buttons').empty();
        
        for ( var i=0; i < emotions.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('expression');
            a.attr('data-name', emotions[i]);
            a.text(emotions[i]);
            $('#buttons').append(a);
        }
    }    
    buttons();
   

  $(document).on('click', '.expression', function() {

    var express = $(this).html(); 
    console.log(express);
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + express + "&api_key=dc6zaTOxFJmzC";
        console.log(queryURL);
        $.ajax({url: queryURL, method: 'GET'})
        .done(function(response) {
            // grabs the data
            var results = response.data;
           console.log(results);
            //empties the div before adding more gifs
            $('#expressView').empty();
                //loops through the data
                for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                        console.log(imageView);  
                    var expressImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    expressImage.attr('data-state', 'still');
                    $('#expressView').prepend(expressImage);
                    expressImage.on('click', playGif);
                    
                     var rating = results[j].rating;
                            // console.log(rating);
                        var displayRated= $('<p>').text("Rating: " + rating);
                        $('#expressView').prepend(displayRated);
            
                } //for loop
        }); 

        function playGif() { 
                    var state = $(this).attr('data-state');
                    console.log(state);
                 if ( state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } //on click express
                
    }) // document on click

       


//adding new button
$(document).on('click', '#addEmotion', function(){
    if ($('#emotion-input').val().trim() == ''){
      alert('Input can not be left blank');
   }
   else {
    var express = $('#emotion-input').val().trim();
    emotions.push(express);
    $('#emotion-input').val('');
    buttons();
    return false;

    }

});



});  
  
