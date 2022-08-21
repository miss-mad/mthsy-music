$(document).ready(function(){
    $('.sidebar').sidenav();
});

// places everything in a function so that when the page is loaded, all of this executes
document.addEventListener("DOMContentLoaded", function () {
  // Materialize-related resizing transformation
  $("#textarea1").val("New Text");
  M.textareaAutoResize($("#textarea1"));

  // attribute selectors to find the matching html classes for which we later add event listeners for when the user clicks these buttons
  var artistButton = $(".artistbutton");
  var titleButton = $(".titlebutton");
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // section for search history and local storage

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

    // if statements to help local storage differentiate between which item we're retrieving
    if (searchType === "artist") {
      // gets the search input artist from local storage
      var localStorageUserInput = localStorage.getItem(
        "searchHistoryArtistArray"
      );
    }

    if (searchType === "songTitle") {
      // gets the search input song title from local storage
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

  // function to build the search history on the webpage and display it
  function displaySearchHistory() {
    // clears the search history text
    document.getElementById("dropdown1").innerHTML = "";

    // selects the html attribute with the matching ID and adds css - this is the search history display card
    var searchHistoryDropdown = $("#dropdown1");

    // retrieves the array from local storage that shows the artists in search history
    var localStorageArtistHistory = localStorage.getItem(
      "searchHistoryArtistArray"
    );

    // retrieves the array from local storage that shows the song titles in search history
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

    // create and append a title for the artist to the dropdown
      var dividerArtist = $("<li>");
      dividerArtist.css("class", "divider");
      dividerArtist.css("font-weight", "bold")
      dividerArtist.css("text-align", "center")
      dividerArtist.attr("tabindex", "-1");
      dividerArtist.text("Artist");
      searchHistoryDropdown.append(dividerArtist);

    // forEach() method to loop through each input in the searchHistoryArray in local storage, add css, and add it to the search history dropdown
    localStorageArtistHistory.forEach(function (input) {
    //   console.log(input);

      var searchHistoryUserInputListItem = $("<li>");
      searchHistoryUserInputListItem.attr("value", input);
      searchHistoryUserInputListItem.text(input);

      // makes each search history list item clickable and listen for when the user clicks on any of them
      searchHistoryUserInputListItem.on("click", artistFunction);
      searchHistoryDropdown.append(searchHistoryUserInputListItem);
    });

    // create and append a divider to the dropdown
    var dividerMiddle = $("<li>");
    dividerMiddle.css("class", "divider");
    dividerMiddle.attr("tabindex", "1");
    dividerMiddle.text("___________________");
    searchHistoryDropdown.append(dividerMiddle);

    // create and append a title for song title to the dropdown
    var dividerSongTitle = $("<li>");
    dividerSongTitle.css("class", "divider");
    dividerSongTitle.css("font-weight", "bold")
    dividerSongTitle.css("text-align", "center")
    dividerSongTitle.attr("tabindex", "-1");
    dividerSongTitle.text("Song Title");
    searchHistoryDropdown.append(dividerSongTitle);

    // JS forEach() method to loop through each input in the searchHistoryArray in local storage, add css, and add it to the search history dropdown
    localStorageSongTitleHistory.forEach(function (input) {
    //   console.log(input);

      var searchHistoryUserInputListItem = $("<li>");
      searchHistoryUserInputListItem.attr("value", input);
      searchHistoryUserInputListItem.text(input);
      // makes each search history list item clickable and listen for when the user clicks on any of them
      searchHistoryUserInputListItem.on("click", songTitleFunction);

      searchHistoryDropdown.append(searchHistoryUserInputListItem);
    });
  }

  // both artistFunction() and songTitleFunction() retrieve the innerHTML of their respective data (either artist or song title) so that it knows what to display. then, it calls the function below it to display the search history artist or song title results again.
  function artistFunction(event) {
    // console.log("artistFunction function");
    // console.log(event.target.innerHTML);

    var artist = event.target.innerHTML;

    displayPastSearchedInput(artist, "artist");
  }

  // see above about artistFunction()
  function songTitleFunction(event) {
    console.log("Song title function");
    console.log(event.target.innerHTML);
    var songTitle = event.target.innerHTML;

    displayPastSearchedInput(songTitle, "songTitle");
  }

  // function to display the previously searched input in the dropdown list
  function displayPastSearchedInput(input, searchType) {
    // console.log("displayPastSearchedInput", input, searchType);

    // clear out previous results from the last time user clicked an item in the search history
    document.getElementById("lastFMInfo").innerHTML = "";

    // tells the computer which function to call in accordance to which search bar was used. if no input was given in one of the search bars, then don't display anything (return keyword tells it to stop doing stuff)
    if (searchType === "artist") {
    //   console.log("ARTIST IS WORKING");
      lastfmAPICallArtistTopSongs(input);
      // ARTIST ONLY
      // goal is to display the same artist results as initial search, but this time we're displaying them when user clicks an artist in search history
      // call the appropriate Youtube API function here and pass it the correct data
      // call the appropriate Ticketmaster API function and pass it the correct data
    } else if (searchType === "songTitle") {
      console.log("SONG TITLE IS RUNNING");
      lastfmAPICallSongTitleSearch(input);
      // SONG TITLE ONLY
      // goal is to display the same sont title results as initial search, but this time we're displaying them when user clicks an artist in search history
      // call the appropriate Youtube API function here and pass it the correct data
      // call the appropriate Ticketmaster API function and pass it the correct data
    } else {
      return;
    }
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // Madeleine's lastfm API

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
    // console.log(userInputArtistName);
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

        // searchresults += data;
        // console.log("artist top songs: ", data);

        displayArtistTopSongs(data);
        lastfmAPIToYoutubeAPI(data);
      })

      // catches any errors the user might input and displays an error message
      .catch(function (error) {
        console.log("error from API: ", error);
      });
  }

  // function to display the top five songs of any given artist the user searched for
  function displayArtistTopSongs(data) {
    $("#artistinput").val("");
    document.getElementById("lastFMInfo").innerHTML = "";

    var artistTopSongsDiv = $("#lastFMInfo");
    var artistTopSongsList = $("#lastFMInfo");

    // for loop to loop through the first 5 songs in the given lastfm data and display them in a dynamically created div
    for (var i = 0; i < 5; i++) {

      if (i===0) {
    var topFiveTracks = "<li>" + "Top 5 Songs: <br> <br>" + data.toptracks.track[i].name + "</li>";
    //   console.log(topFiveTracks);
      artistTopSongsList.append(topFiveTracks);
      artistTopSongsDiv.append(artistTopSongsList);
      } 
      else {
    var topFiveTracks = "<li>" + data.toptracks.track[i].name + "</li>";
    //   console.log(topFiveTracks);
      artistTopSongsList.append(topFiveTracks);
      artistTopSongsDiv.append(artistTopSongsList);
      }


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
    saveSearchHistory(userInputSongTitleSearch, "songTitle");
  }

  // function that uses the lastFM API via their track.search method
  function lastfmAPICallSongTitleSearch(songTitle) {
    // creates the queryURL, which is the baseURL appended to the query terms, to be used in the fetch API
    var baseURL =
      "https://ws.audioscrobbler.com/2.0/?method=track.search&format=json";

    var lastfmAPIKey = "807f87e7dcc6c31a458c4ab1feb542c2";
    var parametersSongTitleSearch = `&api_key=${lastfmAPIKey}&track=${songTitle}`;

    baseURL = baseURL + parametersSongTitleSearch;
    // console.log(baseURL);

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
    // console.log(userInputSongTitleSearch);
    document.getElementById("lastFMInfo").innerHTML = "";

    var songTitleSearchDiv = $("#lastFMInfo");

    var songTitleSearchList = $("#lastFMInfo");

    // for loop to loop through the first 5 results in the given lastfm data and display them in a dynamically created div
    for (var i = 0; i < 5; i++) {
      var songTitleNameTopFive = data.results.trackmatches.track[i].name;
      var songTitleArtistTopFive = data.results.trackmatches.track[i].artist;
      if(i===0){
      var resultsSongAndArtist = "<li>" + "Top 5 Songs: <br>" + songTitleNameTopFive + " " + "by " + songTitleArtistTopFive + "</li>";
      console.log(resultsSongAndArtist);
      songTitleSearchList.append(resultsSongAndArtist);
      songTitleSearchDiv.append(songTitleSearchList);
    }
    else{
      var resultsSongAndArtist = "<li>" + songTitleNameTopFive + " " + "by " + songTitleArtistTopFive + "</li>";
      console.log(resultsSongAndArtist);
      songTitleSearchList.append(resultsSongAndArtist);
      songTitleSearchDiv.append(songTitleSearchList);
      }
    }
  }

  // click listeners added to these two buttons so that all above functions execute when the user clicks "search"
  artistButton.on("click", getUserInputArtistName);
  titleButton.on("click", getUserInputSongTitleSearch);

  displaySearchHistory();

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  
  // section to connect APIs
  // merge Youtube and Ticketmaster APIs on one js file here

  // function to give youtube API the lastfm artistTopSongs data (just the first song to retrieve a video)
  function lastfmAPIToYoutubeAPI(firstSong) {
    // console.log(firstSong);
    // single variable for implementing into the youtube API
    // insert plus signs into the spaces
    var firstArtistSongForYoutubeAPI = firstSong.toptracks.track[0].name
      .split(" ")
      .join("+");
    // console.log(firstArtistSongForYoutubeAPI);
    YouTubeSearchByArtist(firstArtistSongForYoutubeAPI);

    // console.log(YouTubeSearchByArtist);
  }

  // function to give ticketmaster API the lastfm songTitleSearch data (just the first result's artst name to retrieve info about upcoming concerts)
  function lastfmAPIToTicketmasterAPI(firstArtist) {
    console.log(firstArtist);
    // single variable for implementing into the ticketmaster API
    // insert plus signs into the spaces
    var firstArtistResultForTicketmasterAPI =
      firstArtist.results.trackmatches.track[0].artist.split(" ").join("+");
    // console.log(firstArtistResultForTicketmasterAPI);
    Ticketmastersongtitle(firstArtistResultForTicketmasterAPI);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // Hunter's Youtube API
  var searchButtonTitle = document.querySelector("#titlebuttons");

  function YouTubeSearchByArtist(data) {
    // console.log(data);
    const ytURL =
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&videoSyndicated=true&videoEmbeddable=true&q=";
    var ytAPIKey = "&key=AIzaSyCWnH7bNyWEB88X6WFI9tLPCGqPa9ueJBA";

    var VideoDisplay = document.querySelector("#YouTubeVideo");
    var firstArtistSongForYoutubeAPI = data;

    // console.log(firstArtistSongForYoutubeAPI);

    if ((VideoDisplay.style.display = "none")) {
      VideoDisplay.style.display = "block";
    }

    var fullYTURLPathArtist = ytURL + firstArtistSongForYoutubeAPI + ytAPIKey;

    // console.log(fullYTURLPathArtist);

    fetch(fullYTURLPathArtist)
      .then(function (response) {
        // console.log(response);
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(function (data) {
        // console.log(data.items[0].id.videoId);

        var UniqueVidId = data.items[0].id.videoId;
        document.getElementById("YouTubeVideo").src =
          "https://www.youtube.com/embed/" + UniqueVidId;
      })
      .catch(function (error) {
        console.log("Error from API: ", error);
      });
  }

//   searchButtonArtist.addEventListener("click", YouTubeSearchByArtist);

  searchButtonTitle.addEventListener("click", function YouTubeSearchByTitle() {
    const ytURL =
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&videoSyndicated=true&videoEmbeddable=true&q=";
    var ytAPIKey = "&key=AIzaSyCWnH7bNyWEB88X6WFI9tLPCGqPa9ueJBA";

    var artistName = document.getElementById("artistinput").value;
    var songName = document.getElementById("titleinput").value;
    var VideoDisplay = document.querySelector("#YouTubeVideo");

    if ((VideoDisplay.style.display = "none")) {
      VideoDisplay.style.display = "block";
    }

    urlFriendlyArtist = artistName.replace(/\s/g, "+");
    urlFriendlySong = songName.replace(/\s/g, "+");

    var fullYTURLPathTitle = ytURL + songName + ytAPIKey;

    console.log(fullYTURLPathTitle);

    fetch(fullYTURLPathTitle)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(function (data) {
        console.log(data.items[0].id.videoId);

        var UniqueVidId = data.items[0].id.videoId;
        document.getElementById("YouTubeVideo").src =
          "https://www.youtube.com/embed/" + UniqueVidId;
      })
      .catch(function (error) {
        console.log("Error from API: ", error);
      });
  });

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // Terry's Ticketmaster API
  //Adding variables for all ticketmaster related elements from HTML
  var artistsearch = document.getElementById("artistbuttons");
  var concertdisplay = document.getElementById("concertevent");
  var concertdate = document.getElementById("concertdate");
  var concertname = document.getElementById("concertname");
  var venuename = document.getElementById("venuename");
  var concerturl = document.getElementById("concerturl");

  //Artist search function which is independent from lastFM API
  function Ticketmaster() {
    //function to clear whenever another search happens
    clearinterval();
    var TicketUrlSearch =
      "https://app.ticketmaster.com/discovery/v2/events.json?keyword=";
    var TicketUrlAPI = "&countryCode=US&apikey=";
    var TicketAPIKey = "fa4oEMRMib4vxQg2FPdmxH9JKdFeSeaC";
    var UserInput = document.getElementById("artistinput").value;
    var url = TicketUrlSearch + UserInput + TicketUrlAPI + TicketAPIKey;
    //fetching ticketmaster API
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(function (data) {
        // console.log(data);
        // console.log(data._embedded.events[0]);
        // console.log(data._embedded.events[0].name);
        // console.log(data._embedded.events[0].dates.start.localDate);
        // console.log(data._embedded.events[0].products[0].name);
        // console.log(data._embedded.events[0]._embedded.venues[0].name);
        // console.log(data._embedded.events[0].url);
        //setting variables for all necessary values for event, names, etc.
        var eventname = data._embedded.events[0].name;
        var eventdate = data._embedded.events[0].dates.start.localDate;
        var eventconcertname = data._embedded.events[0].products[0].name;
        var placename = data._embedded.events[0]._embedded.venues[0].name;
        var eventurl = data._embedded.events[0].url;
        //adds text based on the value received from api
        concertdisplay.textContent += eventname;
        concertdate.textContent += eventdate;
        concertname.textContent += eventconcertname;
        venuename.textContent += placename;
        concerturl.textContent += eventurl;

        //adding href specifically for the event's url
        document.getElementById("concerturl").setAttribute('href',eventurl);

      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  }

  artistsearch.addEventListener("click", Ticketmaster);
  //Song title search function that is dependent on lastFM API to grab the name of the artist 
  function Ticketmastersongtitle(data) {
    //clear function for when another search is happened.
    clearinterval();
    //ticketmaster API key and link
    var TicketUrlSearch =
      "https://app.ticketmaster.com/discovery/v2/events.json?keyword=";
    var TicketUrlAPI = "&countryCode=US&apikey=";
    var TicketAPIKey = "fa4oEMRMib4vxQg2FPdmxH9JKdFeSeaC";
    //The value received from lastFM API 
    var UserInput = data;

    var url = TicketUrlSearch + UserInput + TicketUrlAPI + TicketAPIKey;
    // console.log(UserInput);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(function (data) {
        // console.log(data);
        // console.log(data._embedded.events[0]);
        // console.log(data._embedded.events[0].name);
        // console.log(data._embedded.events[0].dates.start.localDate);
        // console.log(data._embedded.events[0].products[0].name);
        // console.log(data._embedded.events[0]._embedded.venues[0].name);
        // console.log(data._embedded.events[0].url);
        //same as artist search function, setting specific variables for API values
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

        document.getElementById("concerturl").setAttribute('href',eventurl);
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
      //no eventlistener necessary because the song title search is not independent call by click, unlike the artist search
  }
  //a reset function for when user does another search
  function clearinterval()
  {
    concertdisplay.textContent = "";
    concertdate.textContent = "";
    concertname.textContent = "";
    venuename.textContent = "";
    concerturl.textContent = "";

  };
});

//button trigger upon pressing enter
var enter = document.getElementById("artistinput");

enter.addEventListener("keypress", function(event){
  if(event.key === "Enter")
  {
    event.preventDefault();
    document.getElementById("artistbuttons").click();
  }
})

var enter = document.getElementById("titleinput");

enter.addEventListener("keypress", function(event){
  if(event.key === "Enter")
  {
    event.preventDefault();
    document.getElementById("titlebuttons").click();
  }
})