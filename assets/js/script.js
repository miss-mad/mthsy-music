//Materialize related resizing transformation
$('#textarea1').val('New Text');
M.textareaAutoResize($('#textarea1'));

// attribute selectors to find the matching html classes for which we later add event listeners for when the user clicks these buttons
var artistButton = $(".artistbutton");
var titleButton = $(".titlebutton");
var artistModal = $(".artist-modal");
var songTitleModal = $(".song-title-modal");
var modalClose = $(".close");

// function to retrieve the user input when they type an artist name
function getUserInputArtistName(event) {
  // prevents default behavior of the button refreshing the page
  event.preventDefault();

  // retrieve the user's input using a html id selector, then trims any extra white space
  var userInputArtistName = $("#artistinput").val().trim();
  console.log(userInputArtistName);

  if (!userInputArtistName) {
    var modal = document.getElementById("modal");
    console.log(modal);
    var instance = M.Modal.init(modal);
    console.log(instance);
    instance.open();
    return;
  }

  // calls this function to execute the lastfm API call, giving it the user's input of artist name
  lastfmAPICallArtistTopSongs(userInputArtistName);

  // calls ticketmaster's function to execute that API call, giving it the user's input as well
  Ticketmaster(userInputArtistName);
}

// function that uses the lastFM API via their artist.gettoptracks method
function lastfmAPICallArtistTopSongs(artist) {
  // creates the queryURL, which is the baseURL appended to the query terms, to be used in the fetch API
  var baseURL =
    "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&format=json";

  var lastfmAPIKey = "807f87e7dcc6c31a458c4ab1feb542c2";
  var parametersTopSongs = `&api_key=${lastfmAPIKey}&artist=${artist}`;

  baseURL = baseURL + parametersTopSongs;

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  // fetch API fetches the lastfm data to find the artist's top tracks
  fetch(baseURL, requestOptions)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })

    // calls the displayArtistTopSongs() function so that that function will be able to use the lastfm data
    .then(function (data) {
      console.log("artist top songs: ", data);
      displayArtistTopSongs(data);
      lastfmAPIToYoutubeAPI(data);
    })

    // catches any errors the user might input and displays an error message
    .catch(function (error) {
      console.log("error from API: ", error);
      // insert another modal here that says
      // "ERROR - please make sure you have spelled the artist's name correctly"
    });
}

// function to display the top five songs of any given artist the user searched for
function displayArtistTopSongs(data) {
  var userInputArtistName = $("#artistinput").val().trim();
  $("#artistinput").val("");

  var artistTopSongsDiv = $("#displayinfo");

  var artistTopSongsList = $("#songsuggestion1");
  // artistTopSongsList.css("display", "flex");

  // for loop to loop through the first 5 songs in the given lastfm data and display them in a dynamically created div
  for (var i = 0; i < 5; i++) {
    var topFiveTracks = data.toptracks.track[i].name;
    console.log(topFiveTracks);
    artistTopSongsList.append(topFiveTracks);
    artistTopSongsDiv.append(artistTopSongsList);
  }
}

// function to retrieve the user input when they type a song title
function getUserInputSongTitleSearch(event) {
  // prevents default behavior of the button refreshing the page
  event.preventDefault();

  // retrieve the user's input using a html id selector, then trims any extra white space
  var userInputSongTitleSearch = $("#titleinput").val().trim();
  console.log(userInputSongTitleSearch);

  if (!userInputSongTitleSearch) {
    var modal = document.getElementById("modal");
    console.log(modal);
    var instance = M.Modal.init(modal);
    console.log(instance);
    instance.open();
    return;
  }

  // calls this function to execute the lastfm API call, giving it the user's input of song title
  lastfmAPICallSongTitleSearch(userInputSongTitleSearch);
}

// function that uses the lastFM API via their track.search method
function lastfmAPICallSongTitleSearch(songTitle) {
  // creates the queryURL, which is the baseURL appended to the query terms, to be used in the fetch API
  var baseURL =
    "http://ws.audioscrobbler.com/2.0/?method=track.search&format=json";

  var lastfmAPIKey = "807f87e7dcc6c31a458c4ab1feb542c2";
  var parametersSongTitleSearch = `&api_key=${lastfmAPIKey}&track=${songTitle}`;

  baseURL = baseURL + parametersSongTitleSearch;
  console.log(baseURL);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  // fetch API fetches the lastfm data to find the song titles and artists
  fetch(baseURL, requestOptions)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })

    // calls the displaySongTitleSearch() function so that that function will be able to use the lastfm data
    .then(function (data) {
      console.log("song title search: ", data);
      displaySongTitleSearch(data);
      lastfmAPIToTicketmasterAPI(data);
    })

    // catches any errors the user might input and displays an error message
    .catch(function (error) {
      console.log("error from API: ", error);
      // insert another modal here that says
      // "ERROR - please make sure you have spelled the song title correctly"
    });
}

// function to display the top five matching song + artist results of any given song title the user searched for
function displaySongTitleSearch(data) {
  var userInputSongTitleSearch = $("#titleinput").val().trim();
  $("#titleinput").val("");
  console.log(userInputSongTitleSearch);

  var songTitleSearchDiv = $("#displayinfo");

  var songTitleSearchList = $("#songsuggestion1");
  // songTitleSearchList.css("display", "flex");

  // for loop to loop through the first 5 results in the given lastfm data and display them in a dynamically created div
  for (var i = 0; i < 5; i++) {
    var songTitleNameTopFive = data.results.trackmatches.track[i].name;
    var songTitleArtistTopFive = data.results.trackmatches.track[i].artist;
    var resultsSongAndArtist =
      songTitleNameTopFive + " " + "by " + songTitleArtistTopFive;
    console.log(resultsSongAndArtist);
    songTitleSearchList.append(resultsSongAndArtist);
    songTitleSearchDiv.append(songTitleSearchList);
  }
}

// click listeners added to these two buttons so that all above functions execute when the user clicks "search"
artistButton.on("click", getUserInputArtistName);
titleButton.on("click", getUserInputSongTitleSearch);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// merge all APIs on one js file here

// function to give youtube API the lastfm artistTopSongs data (just the first song to retrieve a video)
function lastfmAPIToYoutubeAPI(firstSong) {
  console.log(firstSong);
  // single variable for implementing into the youtube API
  // insert plus signs into the spaces
  var firstArtistSongForYoutubeAPI = firstSong.toptracks.track[0].name
    .split(" ")
    .join("+");
  console.log(firstArtistSongForYoutubeAPI);
}

// function to give ticketmaster API the lastfm songTitleSearch data (just the first result's artst name to retrieve info about upcoming concerts)
function lastfmAPIToTicketmasterAPI(firstArtist) {
  console.log(firstArtist);
  // single variable for implementing into the ticketmaster API
  // insert plus signs into the spaces
  var firstArtistResultForTicketmasterAPI =
    firstArtist.results.trackmatches.track[13].artist.split(" ").join("+");
  console.log(firstArtistResultForTicketmasterAPI);
}


//Hunter's API delete this comment later
var searchButtonTitle = document.querySelector("#titlebuttons");
var searchButtonArtist = document.querySelector("#artistbuttons")

searchButtonArtist.addEventListener("click", function () {
  const ytURL =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&videoSyndicated=true&videoEmbeddable=true&q=";
  var ytAPIKey = "&key=AIzaSyCWnH7bNyWEB88X6WFI9tLPCGqPa9ueJBA";

  var artistName = document.getElementById("artistinput").value;
  var songName = document.getElementById("titleinput").value;
  var VideoDisplay = document.querySelector("#YouTubeVideo")

  if(VideoDisplay.style.display = "none") {
    VideoDisplay.style.display = "block"
  }

  urlFriendlyArtist = artistName.replace(/\s/g, "+");
  urlFriendlySong = songName.replace(/\s/g, "+");

  
  var fullYTURLPathArtist = ytURL + firstArtistSongForYoutubeAPI + ytAPIKey;

  console.log(fullYTURLPathArtist);



  fetch(fullYTURLPathArtist)
    .then(function (response) {
      console.log(response);
      if(response.status === 200) {
        return response.json()
      }
      throw new Error(response.statusText)
    })
    .then(function (data) {
        console.log(data.items[0].id.videoId);

        var UniqueVidId = data.items[0].id.videoId
        document.getElementById("YouTubeVideo").src = "https://www.youtube.com/embed/" + UniqueVidId 
    })
    .catch(function(error){
        console.log("Error from API: ", error)
    });
});

searchButtonTitle.addEventListener("click", function () {
    const ytURL =
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&videoSyndicated=true&videoEmbeddable=true&q=";
    var ytAPIKey = "&key=AIzaSyCWnH7bNyWEB88X6WFI9tLPCGqPa9ueJBA";
  
    var artistName = document.getElementById("artistinput").value;
    var songName = document.getElementById("titleinput").value;
    var VideoDisplay = document.querySelector("#YouTubeVideo")
  
    if(VideoDisplay.style.display = "none") {
      VideoDisplay.style.display = "block"
    }
  
    urlFriendlyArtist = artistName.replace(/\s/g, "+");
    urlFriendlySong = songName.replace(/\s/g, "+");
  
    var fullYTURLPathTitle = ytURL + songName + ytAPIKey;
  
    console.log(fullYTURLPathTitle);
  
  
  
    fetch(fullYTURLPathTitle)
      .then(function (response) {
        console.log(response);
        if(response.status === 200) {
          return response.json()
        }
        throw new Error(response.statusText)
      })
      .then(function (data) {
          console.log(data.items[0].id.videoId);
  
          var UniqueVidId = data.items[0].id.videoId
          document.getElementById("YouTubeVideo").src = "https://www.youtube.com/embed/" + UniqueVidId 
      })
      .catch(function(error){
          console.log("Error from API: ", error)
      });
  });


//Ticketmaster API 
var artistsearch = document.getElementById("artistbuttons");
var concertdisplay = document.getElementById("concertevent");
var concertdate = document.getElementById("concertdate");
var concertname = document.getElementById("concertname");
var venuename = document.getElementById("venuename");
var concerturl = document.getElementById("concerturl");


var Ticketmaster = function ()
{
var TicketUrlSearch = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=";
var TicketUrlAPI = "&countryCode=US&apikey=";
var TicketAPIKey = "fa4oEMRMib4vxQg2FPdmxH9JKdFeSeaC";
var UserInput = document.getElementById('artistinput').value;

var url = TicketUrlSearch + UserInput + TicketUrlAPI + TicketAPIKey;

    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(function(data)
    {
        console.log(data._embedded.events[0]);
        console.log(data._embedded.events[0].name);
        console.log(data._embedded.events[0].dates.start.localDate);
        console.log(data._embedded.events[0].products[0].name);
        console.log(data._embedded.events[0]._embedded.venues[0].name);
        console.log(data._embedded.events[0].url);


        var eventname = data._embedded.events[0].name;
        var eventdate = data._embedded.events[0].dates.start.localDate;
        var eventconcertname = data._embedded.events[0].products[0].name;
        var placename = data._embedded.events[0]._embedded.venues[0].name;
        var eventurl = data._embedded.events[0].url;

        concertdisplay.textContent += eventname;
        concertdate.textContent += eventdate;
        concertname.textContent += eventconcertname;
        venuename.textContent += placename;
        concerturl.textContent += eventurl;
   

    })
    .catch(function(error)
    {
        console.log("Error: ",error);
    })

    
}

artistsearch.addEventListener("click",Ticketmaster);


