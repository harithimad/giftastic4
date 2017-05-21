
//Array to hold the values of the buttons that would be displayed 
var topics = ["smile","arsenal","bird"];
//function that displays the Gyphis to the HTML
function displaygifs() {

	// Empty the body Html everytime you click on a button
  $("#showgiphys").empty();
  // creating a variable to hold the data attribute of the buttons in order to use it for the GYPhy calls
  var giphy = $(this).attr("data-name");
  // Gyphy's API URL that we make the call to 
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Ajax call inorder to get the gyphis from the API
  $.ajax({
    url: queryURL,
    method: "GET"
    // wehenever the data is recieved we call this function to append it to the HTML
  }).done(function(response) {
    var results = response.data;
    console.log(response);
    for (var i = 0; i < results.length; i++) {
    	// creating a new DIV for to append the images and the rating to it to get displayed on HTML
      var giphyholder = $("<div>");
      giphyholder.addClass("holder");
      // Grabing the rating value and appending it to a paragraph
      var giphyRating = $("<p>").text("Rating: " + results[i].rating);
      giphyRating.addClass("ratings");
      // creating a new image tag to append the images to
      var giphyImg = $("<img>"); 
      // giving it a class so we can call it later to add the pause and the animate
      giphyImg.addClass("img-rounded"); 
      // getting a static gif from the api & displaying it first
      giphyImg.attr("src", results[i].images.fixed_height_still.url); 
      // giving it a state so we can compare it later 
      giphyImg.attr("data-state", "still"); 
      // giving the still state a URL so we can change URL's upon the conditions
      giphyImg.attr("data-still", results[i].images.fixed_height_still.url);
      // giving the animate state a URL so we can change URL's upon the conditions
      giphyImg.attr("data-animate", results[i].images.fixed_height.url);

      //calling the class that we gave to the images so we can change the states when we click on it
      $(".img-rounded").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
      //appending the API img to the (div) holder
      giphyholder.append(giphyImg);
      //appending the API rating to the (div) holder
      giphyholder.append(giphyRating);
      // Displaying the API to the page
      $("#showgiphys").append(giphyholder);
    }
  });
}
// function to create buttons and appending it to the html
function renderButtons() {
  $("#btn-view").empty();
  for (var i = 0; i < topics.length; i++) {
    var newbtn = $("<button>");
    newbtn.addClass("giphy");
    newbtn.attr("data-name", topics[i]);
    newbtn.text(topics[i]);
    $("#btn-view").append(newbtn);
  }
}
$("#add-giphy").on("click", function(event) {
	//preventing the page from refreshing everytime the add btn is clicked
  event.preventDefault();
  var giphy = $("#giphy-input").val().trim();
  // if the input was empyty it will alert the user
  if(giphy==="" )
  {
    alert("please enter a valid string");
  }
  else if( giphy==="sex" || giphy==="porn" || giphy==="fuck" || giphy==="erotic")
  {
    alert ( "Please behave ! ");
  }
  else
  {
  // The Giphy from the textbox is then added to our array
  topics.push(giphy);
  // calling renderButtons which handles the processing of our giphy array
  renderButtons();
  }
});
$(document).on("click", ".giphy", displaygifs);
renderButtons();