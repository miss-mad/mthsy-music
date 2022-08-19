// places everything in a function so that when the page is loaded, all of this executes
document.addEventListener("DOMContentLoaded", function () {
  // Materialize related resizing transformation
  $("#textarea1").val("New Text");
  M.textareaAutoResize($("#textarea1"));

  // attribute selectors to find the matching html classes for which we later add event listeners for when the user clicks these buttons
  var artistButton = $(".artistbutton");
  var titleButton = $(".titlebutton");

  // this dropdown handles and displays the user search history
  var dropdown = $(".dropdown-trigger");
  dropdown.on("click", handleDropdown);

  // this function executes the dropdown menu to display the user clickable search history
  function handleDropdown() {
    // materialize dropdown setup
    var options = {
      dropdownOptions: {
        alignment: "center",
        hover: true,
      },
    };

    var elems = document.querySelectorAll(".dropdown-trigger");
    var instance = M.Dropdown.init(elems, options);

    instance[0].open();
  }

  // function to save past artists and song titles that user has searched for by storing data to local storage
  function saveSearchHistory(userInput, searchType) {
    var searchHistoryArray = [];

    if (searchType === "artist") {
      // gets the search input item from local storage
      var localStorageUserInput = localStorage.getItem(
        "searchHistoryArtistArray"
      );
    }

    if (searchType === "songTitle") {
      // gets the search input item from local storage
      var localStorageUserInput = localStorage.getItem(
        "searchHistorySongTitleArray"
      );
    }

    // if there's nothing in local storage, set localStorageUserInput equal to an empty array; otherwise, parse the input to turn it from strings to objects
    localStorageUserInput =
      localStorageUserInput === null ? [] : JSON.parse(localStorageUserInput);

    // this if statement adds the user input in local storage to an array called searchHistoryArray
    if (
      typeof localStorageUserInput === "object" &&
      localStorageUserInput.length >= 1
    ) {
      searchHistoryArray = [...localStorageUserInput];
    }

    // this array method adds the userInput to the end of the searchHistoryArray array
    searchHistoryArray.push(userInput);

    if (searchType === "artist") {
      // sets the searchHistoryArray in local storage and turns array into string
      localStorage.setItem(
        "searchHistoryArtistArray",
        JSON.stringify(searchHistoryArray)
      );
    }

    if (searchType === "songTitle") {
      // sets the searchHistoryArray in local storage and turns array into string
      localStorage.setItem(
        "searchHistorySongTitleArray",
        JSON.stringify(searchHistoryArray)
      );
    }

    // calls this function to then display the search history after storing it
    displaySearchHistory();
  }

  // function to display the search history on the webpage
  function displaySearchHistory() {
    // clears the search history text
    document.getElementById("dropdown1").innerHTML = "";

    // selects the html attribute with the matching ID and adds css - this is the search history display card
    var searchHistoryDropdown = $("#dropdown1");

    // retrieves the array from local storage that shows the cities in search history
    var localStorageArtistHistory = localStorage.getItem(
      "searchHistoryArtistArray"
    );

    // gets the search input item from local storage
    var localStorageSongTitleHistory = localStorage.getItem(
      "searchHistorySongTitleArray"
    );

    // if there's nothing in local storage, set localStorageUserInput equal to an empty array; otherwise, parse the input to turn it from strings to objects
    localStorageArtistHistory =
      localStorageArtistHistory === null
        ? []
        : JSON.parse(localStorageArtistHistory);

    localStorageSongTitleHistory =
      localStorageSongTitleHistory === null
        ? []
        : JSON.parse(localStorageSongTitleHistory);

    // JS forEach() method to loop through each input in the searchHistoryArray in local storage, add css, and add it to the search history dropdown
    localStorageArtistHistory.forEach(function (input) {

      console.log(input)




      var searchHistoryUserInputListItem = $("<li>");
      searchHistoryUserInputListItem.attr("value", input);
      searchHistoryUserInputListItem.text(input);
      // makes each search history list item clickable and listen for when the user clicks on any of them
      searchHistoryUserInputListItem.on("click", artistFunction);
      searchHistoryDropdown.append(searchHistoryUserInputListItem);
    });

    // Append divider
    var searchHistoryDropdown = $("#dropdown1");
    var divider = $("<li>");
    divider.css("class", "divider");
    divider.attr("tabindex", "-1");
    searchHistoryDropdown.append(divider);

    // JS forEach() method to loop through each input in the searchHistoryArray in local storage, add css, and add it to the search history dropdown
    localStorageSongTitleHistory.forEach(function (input) {
      console.log(input)



      var searchHistoryUserInputListItem = $("<li>");
      searchHistoryUserInputListItem.attr("value", input);
      searchHistoryUserInputListItem.text(input);
      // makes each search history list item clickable and listen for when the user clicks on any of them
      searchHistoryUserInputListItem.on("click", songTitleFunction);

      searchHistoryDropdown.append(searchHistoryUserInputListItem);
    });
  }

  function songTitleFunction(event) {
    console.log("Song title function")
    console.log(event.target.innerHTML)
    var songTitle = event.target.innerHTML

    displayPastSearchedInput(songTitle, "songTitle")

  }

  function artistFunction(event) {
    console.log("artistFunction function");
    console.log(event.target.innerHTML);

    var artist = event.target.innerHTML;

    displayPastSearchedInput(artist, "artist");
  }

  // function to display the previously searched input in the dropdown list
  function displayPastSearchedInput(input, searchType) {
    console.log("displayPastSearchedInput", input, searchType);
    document.getElementById("lastFMInfo").innerHTML = "";

    // tells the computer which function to call in accordance to which search bar was used. if no input was given in one of the search bars, then don't display anything (return keyword tells it to stop doing stuff)
    if (searchType === "artist") {
      console.log("ARTIST IS RUNNING");
      lastfmAPICallArtistTopSongs(input);
    } else if (searchType === "songTitle") {
      console.log("TITLE IS RUNNING");
      lastfmAPICallSongTitleSearch(input);
    } else {
      return;
    }
  }

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

    // calls the saveSearchHistory() function, which places user input in local storage for displaying later
    saveSearchHistory(userInputArtistName, "artist");
    console.log(userInputArtistName);
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
        // lastfmAPIToYoutubeAPI(data);
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
    $("#artistinput").val("");

    var artistTopSongsDiv = $("#lastFMInfo");

    var artistTopSongsList = $("#lastFMInfo");
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
    saveSearchHistory(userInputSongTitleSearch, "songTitle")
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

    var songTitleSearchDiv = $("#lastFMInfo");

    var songTitleSearchList = $("#lastFMInfo");
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

  displaySearchHistory();

  // // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // // merge all APIs on one js file here

  // // function to give youtube API the lastfm artistTopSongs data (just the first song to retrieve a video)
  // function lastfmAPIToYoutubeAPI(firstSong) {
  //   console.log(firstSong);
  //   // single variable for implementing into the youtube API
  //   // insert plus signs into the spaces
  //   var firstArtistSongForYoutubeAPI = firstSong.toptracks.track[0].name
  //     .split(" ")
  //     .join("+");
  //   console.log(firstArtistSongForYoutubeAPI);
  //   YouTubeSearchByArtist(firstArtistSongForYoutubeAPI);

  //   console.log(YouTubeSearchByArtist);
  // }

  // // function to give ticketmaster API the lastfm songTitleSearch data (just the first result's artst name to retrieve info about upcoming concerts)
  // function lastfmAPIToTicketmasterAPI(firstArtist) {
  //   console.log(firstArtist);
  //   // single variable for implementing into the ticketmaster API
  //   // insert plus signs into the spaces
  //   var firstArtistResultForTicketmasterAPI =
  //     firstArtist.results.trackmatches.track[0].artist.split(" ").join("+");
  //   console.log(firstArtistResultForTicketmasterAPI);
  //   Ticketmastersongtitle(firstArtistResultForTicketmasterAPI);
  // }

  // //Hunter's API delete this comment later
  // var searchButtonTitle = document.querySelector("#titlebuttons");
  // var searchButtonArtist = document.querySelector("#artistbuttons");

  // function YouTubeSearchByArtist(data) {
  //   console.log(data);
  //   const ytURL =
  //     "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&videoSyndicated=true&videoEmbeddable=true&q=";
  //   var ytAPIKey = "&key=AIzaSyCWnH7bNyWEB88X6WFI9tLPCGqPa9ueJBA";

  //   var VideoDisplay = document.querySelector("#YouTubeVideo");
  //   var firstArtistSongForYoutubeAPI = data;

  //   console.log(firstArtistSongForYoutubeAPI);

  //   if ((VideoDisplay.style.display = "none")) {
  //     VideoDisplay.style.display = "block";
  //   }

  //   var fullYTURLPathArtist = ytURL + firstArtistSongForYoutubeAPI + ytAPIKey;

  //   console.log(fullYTURLPathArtist);

  //   fetch(fullYTURLPathArtist)
  //     .then(function (response) {
  //       console.log(response);
  //       if (response.status === 200) {
  //         return response.json();
  //       }
  //       throw new Error(response.statusText);
  //     })
  //     .then(function (data) {
  //       console.log(data.items[0].id.videoId);

  //       var UniqueVidId = data.items[0].id.videoId;
  //       document.getElementById("YouTubeVideo").src =
  //         "https://www.youtube.com/embed/" + UniqueVidId;
  //     })
  //     .catch(function (error) {
  //       console.log("Error from API: ", error);
  //     });
  // }

  // searchButtonArtist.addEventListener("click", YouTubeSearchByArtist);

  // searchButtonTitle.addEventListener("click", function YouTubeSearchByTitle() {
  //   const ytURL =
  //     "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&videoSyndicated=true&videoEmbeddable=true&q=";
  //   var ytAPIKey = "&key=AIzaSyCWnH7bNyWEB88X6WFI9tLPCGqPa9ueJBA";

  //   var artistName = document.getElementById("artistinput").value;
  //   var songName = document.getElementById("titleinput").value;
  //   var VideoDisplay = document.querySelector("#YouTubeVideo");

  //   if ((VideoDisplay.style.display = "none")) {
  //     VideoDisplay.style.display = "block";
  //   }

  //   urlFriendlyArtist = artistName.replace(/\s/g, "+");
  //   urlFriendlySong = songName.replace(/\s/g, "+");

  //   var fullYTURLPathTitle = ytURL + songName + ytAPIKey;

  //   console.log(fullYTURLPathTitle);

  //   fetch(fullYTURLPathTitle)
  //     .then(function (response) {
  //       console.log(response);
  //       if (response.status === 200) {
  //         return response.json();
  //       }
  //       throw new Error(response.statusText);
  //     })
  //     .then(function (data) {
  //       console.log(data.items[0].id.videoId);

  //       var UniqueVidId = data.items[0].id.videoId;
  //       document.getElementById("YouTubeVideo").src =
  //         "https://www.youtube.com/embed/" + UniqueVidId;
  //     })
  //     .catch(function (error) {
  //       console.log("Error from API: ", error);
  //     });
  // });

  // //Ticketmaster API
  // var artistsearch = document.getElementById("artistbuttons");
  // var titlesearch = document.getElementById("titlebuttons");
  // var concertdisplay = document.getElementById("concertevent");
  // var concertdate = document.getElementById("concertdate");
  // var concertname = document.getElementById("concertname");
  // var venuename = document.getElementById("venuename");
  // var concerturl = document.getElementById("concerturl");

  // function Ticketmaster() {
  //   var TicketUrlSearch =
  //     "https://app.ticketmaster.com/discovery/v2/events.json?keyword=";
  //   var TicketUrlAPI = "&countryCode=US&apikey=";
  //   var TicketAPIKey = "fa4oEMRMib4vxQg2FPdmxH9JKdFeSeaC";
  //   var UserInput = document.getElementById("artistinput").value;

  //   var url = TicketUrlSearch + UserInput + TicketUrlAPI + TicketAPIKey;

  //   fetch(url)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw new Error(response.statusText);
  //     })
  //     .then(function (data) {
  //       console.log(data._embedded.events[0]);
  //       console.log(data._embedded.events[0].name);
  //       console.log(data._embedded.events[0].dates.start.localDate);
  //       console.log(data._embedded.events[0].products[0].name);
  //       console.log(data._embedded.events[0]._embedded.venues[0].name);
  //       console.log(data._embedded.events[0].url);

  //       var eventname = data._embedded.events[0].name;
  //       var eventdate = data._embedded.events[0].dates.start.localDate;
  //       var eventconcertname = data._embedded.events[0].products[0].name;
  //       var placename = data._embedded.events[0]._embedded.venues[0].name;
  //       var eventurl = data._embedded.events[0].url;

  //       concertdisplay.textContent += eventname;
  //       concertdate.textContent += eventdate;
  //       concertname.textContent += eventconcertname;
  //       venuename.textContent += placename;
  //       concerturl.textContent += eventurl;
  //     })
  //     .catch(function (error) {
  //       console.log("Error: ", error);
  //     });
  // }

  // artistsearch.addEventListener("click", Ticketmaster);

  // function Ticketmastersongtitle(data) {
  //   var TicketUrlSearch =
  //     "https://app.ticketmaster.com/discovery/v2/events.json?keyword=";
  //   var TicketUrlAPI = "&countryCode=US&apikey=";
  //   var TicketAPIKey = "fa4oEMRMib4vxQg2FPdmxH9JKdFeSeaC";
  //   var UserInput = data;

  //   var url = TicketUrlSearch + UserInput + TicketUrlAPI + TicketAPIKey;
  //   console.log(UserInput);
  //   fetch(url)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw new Error(response.statusText);
  //     })
  //     .then(function (data) {
  //       console.log(data._embedded.events[0]);
  //       console.log(data._embedded.events[0].name);
  //       console.log(data._embedded.events[0].dates.start.localDate);
  //       console.log(data._embedded.events[0].products[0].name);
  //       console.log(data._embedded.events[0]._embedded.venues[0].name);
  //       console.log(data._embedded.events[0].url);

  //       var eventname = data._embedded.events[0].name;
  //       var eventdate = data._embedded.events[0].dates.start.localDate;
  //       var eventconcertname = data._embedded.events[0].products[0].name;
  //       var placename = data._embedded.events[0]._embedded.venues[0].name;
  //       var eventurl = data._embedded.events[0].url;

  //       concertdisplay.textContent += eventname;
  //       concertdate.textContent += eventdate;
  //       concertname.textContent += eventconcertname;
  //       venuename.textContent += placename;
  //       concerturl.textContent += eventurl;
  //     })
  //     .catch(function (error) {
  //       console.log("Error: ", error);
  //     });
  // }

  // titlesearch.addEventListener("click", Ticketmastersongtitle);
});
