// var artist = $("#artistinput");
// var songTitle = $("#titleinput");
var artistButton = $(".artistbutton");
var titleButton = $(".titlebutton");

function getUserInputArtistName(event) {
  console.log("user input function is working");
  event.preventDefault();

  var userInputArtistName = $("#artistinput").val().trim();
  console.log(userInputArtistName);

  // if (!userInputArtistName) {
  // insert modal here https://www.w3schools.com/howto/howto_css_modals.asp
  // "Please enter an artist's name"
  // }

  lastfmAPICallArtistTopSongs(userInputArtistName);
}

function lastfmAPICallArtistTopSongs(artist) {
  console.log("artist top songs function is working");

  var baseURL =
    "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&format=json";

  var lastfmAPIKey = "807f87e7dcc6c31a458c4ab1feb542c2";
  var parametersTopSongs = `&api_key=${lastfmAPIKey}&artist=${artist}`;

  baseURL = baseURL + parametersTopSongs;
  // "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&format=json&api_key=807f87e7dcc6c31a458c4ab1feb542c2&artist=coldplay"
  // https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&format=json&api_key=807f87e7dcc6c31a458c4ab1feb542c2&artist=coldplay
  console.log(baseURL);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(baseURL, requestOptions)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })

    .then(function (data) {
      console.log("artist top songs: ", data);
      displayArtistTopSongs(data);
    })

    .catch(function (error) {
      console.log("error from API: ", error);
      // insert another modal here that says
      // "ERROR - please make sure you have spelled the artist's name correctly"
    });
}

function displayArtistTopSongs(data) {
  console.log("displayArtistTopSongs function is working");
  var userInputArtistName = $("#artistinput").val().trim();
  $("#artistinput").val("");
  console.log(userInputArtistName);

  var artistTopSongsDiv = $("#displayinfo");

  var artistTopSongsList = $("#songsuggestion1");
  // artistTopSongsList.css("display", "flex");

  for (var i = 0; i < 5; i++) {
    var topFiveTracks = data.toptracks.track[i].name;
    console.log(topFiveTracks);
    artistTopSongsList.append(topFiveTracks);
    artistTopSongsDiv.append(artistTopSongsList);
  }
}

function getUserInputSongTitleSearch(event) {
  console.log("user input function is working");
  event.preventDefault();

  var userInputSongTitleSearch = $("#titleinput").val().trim();
  console.log(userInputSongTitleSearch);

  // if (!userInputArtistName) {
  // insert modal here https://www.w3schools.com/howto/howto_css_modals.asp
  // "Please enter an artist's name"
  // }

  lastfmAPICallSongTitleSearch(userInputSongTitleSearch);
}

function lastfmAPICallSongTitleSearch(songTitle) {
  console.log("song title search function is working");

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

  fetch(baseURL, requestOptions)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })

    .then(function (data) {
      console.log("song title search: ", data);
      displaySongTitleSearch(data);
    })

    .catch(function (error) {
      console.log("error from API: ", error);
      // insert another modal here that says
      // "ERROR - please make sure you have spelled the artist's name correctly"
    });
}

function displaySongTitleSearch(data) {
  console.log("displaySongTitleSearch function is working");
  var userInputSongTitleSearch = $("#titleinput").val().trim();
  $("#titleinput").val("");
  console.log(userInputSongTitleSearch);

  var songTitleSearchDiv = $("#displayinfo");

  var songTitleSearchList = $("#songsuggestion1");
  // songTitleSearchList.css("display", "flex");

  for (var i = 0; i < 5; i++) {
    var songTitleNameTopFive = data.results.trackmatches.track[i].name;
    var songTitleArtistTopFive = data.results.trackmatches.track[i].artist;
    var resultsSongAndArtist = songTitleNameTopFive + " " + "by " + songTitleArtistTopFive;
    // console.log("artists matching top five song titles for searched song: ", songTitleArtistTopFive);
    songTitleSearchList.append(resultsSongAndArtist);
    songTitleSearchDiv.append(songTitleSearchList);
  }
}

// artist top songs
// https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&format=json&api_key=807f87e7dcc6c31a458c4ab1feb542c2&artist=coldplay
// method
// format
// api key
// artist

// song title search
// http://ws.audioscrobbler.com/2.0/?method=track.search&format=json&api_key=807f87e7dcc6c31a458c4ab1feb542c2&track=yellow
// method
// format
// api key
// track

artistButton.on("click", getUserInputArtistName);

titleButton.on("click", getUserInputSongTitleSearch);
