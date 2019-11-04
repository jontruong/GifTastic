var topics = ["Thor", "Captain America", "Hulk"];

// create buttons
function createButtons (){
    $('#buttons-view').empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");

        a.addClass("char");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $('#buttons-view').append(a);
        
    }
}
// display gif
function displayCharGif(){
    var charGif=$(this).attr("data-name");

    var queryurl = "https://api.giphy.com/v1/gifs/search?q=" + charGif + "&api_key=Kw3ijJuj9J4C0qG5U0V6afS4VhqpF3Id&limit=10"
    console.log(queryurl)
    $.ajax({
        url:queryurl,
        method: 'GET'
    }).then(function(response){
        var results = response.data;
        //loops through the results array
        for (var i = 0; i < results.length; i++) {
            if(results[i].rating !== "r" && results[i].rating !== "pg-13"){
            
            var gifDiv = $('<div>');
        
            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            //creates the character gif image
            var charImage = $("<img>");
            charImage.addClass("gif");
            
            charImage.attr("src", results[i].images.fixed_height.url);
            gifDiv.append(p);
            gifDiv.append(charImage)
            $("#char-view").prepend(gifDiv);
            }   
        }
    })

};

// takes the input and adds it to the array and it makes a button for the character
$("#add-char").on("click", function(event){
    event.preventDefault();

    var char = $('#marvel-input').val().trim();

    topics.push(char);

    createButtons();
});


$('#char-view').on('click','.gif',  function(){
    var state = $(this).attr("data-state");
    if(state === "animate"){
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    else{
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
})

$(document).on("click", ".char", displayCharGif);
createButtons();