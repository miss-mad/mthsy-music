const ytURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="

var ytQuery = "adele"

var ytAPIKey="&key=AIzaSyCWnH7bNyWEB88X6WFI9tLPCGqPa9ueJBA"

var searchButton = document.querySelector("#generate")
var artistName = document.getElementById("#artistinput")
var songName = document.getElementById("#titleinput")

var ytInput = select("#artistinput")



function YouTubeResults() {

    var button = select("#generate")
    button.mousePressed(gatherInput)

    function gatherInput() {
        var url = ytURL + ytInput + ytAPIKey
    }

}

searchButton.addEventListener("click", function() {

})