// var searchButtonTitle = document.querySelector("#titlebuttons");
// var searchButtonArtist = document.querySelector("artistbuttons")

// searchButtonArtist.addEventListener("click", function () {
//   const ytURL =
//     "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=";
//   var ytAPIKey = "&key=AIzaSyCWnH7bNyWEB88X6WFI9tLPCGqPa9ueJBA";

//   var artistName = document.getElementById("artistinput").value;
//   var songName = document.getElementById("titleinput").value;
//   var VideoDisplay = document.querySelector("#YouTubeVideo")
//   var VideoSyndication = "&type=video&videoSyndicated=true"

//   if(VideoDisplay.style.display = "none") {
//     VideoDisplay.style.display = "block"
//   }

//   urlFriendlyArtist = artistName.replace(/\s/g, "+");
//   urlFriendlySong = songName.replace(/\s/g, "+");

//   fullYTURLPathArtist = ytURL + firstArtistSongForYoutubeAPI + ytAPIKey + VideoSyndication;

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
//         document.getElementById("YouTubeVideo").src = "https://www.youtube.com/embed/" + UniqueVidId 
//     })
//     .catch(function(error){
//         console.log("Error from API: ", error)
//     });
// });

// searchButtonTitle.addEventListener("click", function () {
//     const ytURL =
//       "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=";
//     var ytAPIKey = "&key=AIzaSyCWnH7bNyWEB88X6WFI9tLPCGqPa9ueJBA";
  
//     var artistName = document.getElementById("artistinput").value;
//     var songName = document.getElementById("titleinput").value;
//     var VideoDisplay = document.querySelector("#YouTubeVideo")
//     var VideoSyndication = "&type=video&videoSyndicated=true"
  
//     if(VideoDisplay.style.display = "none") {
//       VideoDisplay.style.display = "block"
//     }
  
//     urlFriendlyArtist = artistName.replace(/\s/g, "+");
//     urlFriendlySong = songName.replace(/\s/g, "+");
  
//     fullYTURLPathArtist = ytURL + songName + ytAPIKey + VideoSyndication;
  
//     console.log(fullYTURLPath);
  
  

  
//     fetch(fullYTURLPath)
//       .then(function (response) {
//         console.log(response);
//         if(response.status === 200) {
//           return response.json()
//         }
//         throw new Error(response.statusText)
//       })
//       .then(function (data) {
//           console.log(data.items[0].id.videoId);
  
//           var UniqueVidId = data.items[0].id.videoId
//           document.getElementById("YouTubeVideo").src = "https://www.youtube.com/embed/" + UniqueVidId 
//       })
//       .catch(function(error){
//           console.log("Error from API: ", error)
//       });
//   });