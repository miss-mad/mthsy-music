function lastfmAPICallArtistTopSongs(searchBarInput, urlType) {
  var baseURL = "";
  var lastfmAPIKey = "807f87e7dcc6c31a458c4ab1feb542c2";

  if (urlType === "artisttopsongs") {
    baseURL =
      "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&format=json";

    var artist = searchBarInput;
    var parametersTopSongs = `&api_key=${lastfmAPIKey}&artist=${artist}`;

    baseURL = baseURL + parametersTopSongs;
  }

  fetch(baseURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(function (data) {
      console.log("artist top songs: ", data);
    });
}

function lastfmAPICallSongTitleSearch(searchBarInput) {
  if (urlType === "songTitleSearch") {
    baseURL =
      "http://ws.audioscrobbler.com/2.0/?method=track.search&format=json&";

    var songTitle = searchBarInput;
    var parametersSongTitleSearch = `&api_key=${lastfmAPIKey}&track=${songTitle}`;

    baseURL = baseURL + parametersSongTitleSearch;
  }

  fetch(baseURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(function (data) {
      console.log("artist top songs: ", data);
    });
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
