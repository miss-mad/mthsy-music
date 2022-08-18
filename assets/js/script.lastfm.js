// attribute selectors to find the matching html classes for which we later add event listeners for when the user clicks these buttons
var artistButton = $(".artistbutton");
var titleButton = $(".titlebutton");

// function to retrieve the user input when they type an artist name
function getUserInputArtistName(event) {
  // prevents default behavior of the button refreshing the page
  event.preventDefault();

  // retrieve the user's input using a html id selector, then trims any extra white space
  var userInputArtistName = $("#artistinput").val().trim();
  console.log(userInputArtistName);

  // if (!userInputArtistName) {
  // insert modal here https://www.w3schools.com/howto/howto_css_modals.asp
  // "Please enter an artist's name"
  // }

  // calls this function to execute the lastfm API call, giving it the user's input of artist name
  lastfmAPICallArtistTopSongs(userInputArtistName);

  // calls ticketmaster's function to execute that API call, giving it the user's input as well
  // ticketmasterArtistInputFunctionName(userInputArtistName);
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

  // if (!userInputArtistName) {
  // insert modal here https://www.w3schools.com/howto/howto_css_modals.asp
  // "Please enter a song title"
  // }

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
function lastfmAPIToYoutubeAPI (firstSong) {
  console.log(firstSong);
  // single variable for implementing into the youtube API
  // insert plus signs into the spaces
  var firstArtistSongForYoutubeAPI = firstSong.toptracks.track[0].name.split(" ").join("+");
  console.log(firstArtistSongForYoutubeAPI);
}

// function to give ticketmaster API the lastfm songTitleSearch data (just the first result's artst name to retrieve info about upcoming concerts)
function lastfmAPIToTicketmasterAPI (firstArtist) {
  console.log(firstArtist);
  // single variable for implementing into the ticketmaster API
  // insert plus signs into the spaces
  var firstArtistResultForTicketmasterAPI = firstArtist.results.trackmatches.track[13].artist.split(" ").join("+");
  console.log(firstArtistResultForTicketmasterAPI);
}