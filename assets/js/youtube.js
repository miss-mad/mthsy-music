// // const ytURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="

// // var ytQuery = "adele"

// // var ytAPIKey="&key=AIzaSyCWnH7bNyWEB88X6WFI9tLPCGqPa9ueJBA"

// // var searchButton = document.querySelector("#generate")
// // var artistName = document.getElementById("#artistinput")
// // var songName = document.getElementById("#titleinput")
// // var InputResults = document.getElementById("songsuggestion1")

// // var InputArtistValue = searchButton.addEventListener("click")

// // fullYTURLPath = ytURL + artistName.value + ytAPIKey

// // function YouTubeResults(fullYTURLPath) {

// //     fetch(fullYTURLPath)
// //         .then(function (response) {
// //             console.log(response)
// //             if(response.status === 200) {

// //             }
// //         })

// // }
// var searchButton = document.querySelector("#artistbuttons");

// searchButton.addEventListener("click", function () {
//   const ytURL =
//     "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=";
//   var ytAPIKey = "&key=AIzaSyCWnH7bNyWEB88X6WFI9tLPCGqPa9ueJBA";

//   var artistName = document.getElementById("artistinput").value;
//   var songName = document.getElementById("titleinput").value;

//   urlFriendlyArtist = artistName.replace(/\s/g, "+");
//   urlFriendlySong = songName.replace(/\s/g, "+");

//   fullYTURLPath = ytURL + urlFriendlyArtist + "+" + urlFriendlySong + ytAPIKey;

//   console.log(fullYTURLPath);

//   fetch(fullYTURLPath)
//     .then(function (response) {
//       console.log(response);
//       if(response.status === 200) {
//         return response.json()
//       }
//       throw new Error(response.statusText)
//     })
//     .then(function (data) {
//         console.log(data.items[0].id.videoId);

//         var UniqueVidId = data.items[0].id.videoId
//         document.getElementById("YouTubeVideo").src = "https://www.youtube.com/watch?v=" + UniqueVidId 
//     })
//     .catch(function(error){
//         console.log("Error from API: ", error)
//     });
// });